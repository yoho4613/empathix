import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "empathix";

export const handler = async (event: any, context: any) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /items/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = body.Item;
        break;
      case "GET /items":
        body = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = body.Items;
        break;
      case "POST /items":
        let requestJSON = JSON.parse(event.body);
        const generateId =
          Date.now().toString(36) + Math.random().toString(36).substring(2, 10);

        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              ...requestJSON,
              id: generateId,
            },
          })
        );
        body = `POST item ${generateId}`;
        break;
      case "PUT /items":
        let updateJSON = JSON.parse(event.body);
        const updatedKeys = Object.keys(updateJSON).filter(
          (key) => key !== "id"
        );

        const updateExpression =
          "SET " + updatedKeys.map((key) => `#${key} = :${key}`).join(", ");
        const expressionAttributeNames = updatedKeys.reduce(
          (acc, key) => ({ ...acc, [`#${key}`]: key }),
          {}
        );
        const expressionAttributeValues = updatedKeys.reduce(
          (acc, key) => ({ ...acc, [`:${key}`]: updateJSON[key] }),
          {}
        );

        await dynamo.send(
          new UpdateCommand({
            TableName: tableName,
            Key: {
              id: updateJSON.id,
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
          })
        );
        body = `PUT item ${updateJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
