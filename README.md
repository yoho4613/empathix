Serverless AWS Application (TypeScript)
This project implements a serverless application on AWS using API Gateway, Lambda, and DynamoDB to perform CRUD operations. The Lambda function is written in TypeScript.
Setup Instructions

DynamoDB Setup:

Go to the AWS DynamoDB console.
Create a new table named "Empathix" (or your preferred name).
Set the primary key to "id" (string).

TypeScript Lambda Function:

Install Node.js and npm if not already installed.
Create a new directory for your project and navigate to it.
Run npm init -y to initialize a new Node.js project.
Install necessary dependencies:
Copynpm install aws-sdk @types/aws-lambda
npm install --save-dev typescript @types/node aws-sdk

Create a tsconfig.json file in your project root with the following content:
jsonCopy{
"compilerOptions": {
"target": "ES2018",
"module": "commonjs",
"strict": true,
"esModuleInterop": true,
"outDir": "./dist"
}
}

Create a file named index.ts and copy the provided TypeScript Lambda function code into it.
Compile the TypeScript code: npx tsc
Zip the contents of the dist folder.

Lambda Function Setup:

Go to the AWS Lambda console.
Create a new function, choosing Node.js as the runtime.
Upload the zip file containing your compiled TypeScript code.
Set the handler to "index.handler".

IAM Role:

Create an IAM role for your Lambda function.
Attach the AWSLambdaBasicExecutionRole and AmazonDynamoDBFullAccess policies.

API Gateway:

Go to the API Gateway console and create a new REST API.
Create the following resources and methods:

POST /items
GET /items/{id}
PUT /items/{id}
DELETE /items/{id}

For each method, set the integration type to "Lambda Function" and select your Lambda function.

Deploy the API:

Create a new stage (e.g., "prod") and deploy your API.

Usage
After deployment, you can use the following endpoints:

Create: POST /items
Body: JSON object with item details

Read: GET /items/{id}

Update: PUT /items
Body: JSON object with updated item details include Id

Delete: DELETE /items/{id}
Replace {id} with the actual item ID.
# empathix
