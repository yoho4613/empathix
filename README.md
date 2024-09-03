Serverless AWS Application (TypeScript Next.js)
This project implements a serverless application on AWS using API Gateway, Lambda, and DynamoDB to perform CRUD operations. The Lambda function is written in Next.js with TypeScript.

Setup Instructions
`npm i`
`npm run dev`

UI simply send request to API Gateway but user also can send request with API libraries such as POSTMAN.

## API ENDPOINT URI is in `constants/config.ts`

DynamoDB Setup:
Connected with Empathix table (lamda function code hard coded as table name)

TypeScript Lambda Function:
Lamda function coded uploaded on AWS.
To check the code go to `utils/lamda.ts`

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
