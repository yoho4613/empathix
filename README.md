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

## API Gateway:

Go to the API Gateway console and create a new REST API. <br />
Create the following resources and methods:

POST /items <br />
GET /items <br />
GET /items/{id} <br />
PUT /items/{id}<br />
DELETE /items/{id}<br />

For each method, set the integration type to "Lambda Function" and select your Lambda function.

## Usage

After run the command `npm run dev` locally, you can use the following endpoints:

Create: POST /items <br />
Body: JSON object with item details Key, Value pair <br />
ex) {
"name": "jiho",
"age": 32,
"city": "Auckland"
}

Read: <br />
GET /items <br />
GET /items/{id}

Update: PUT /items <br />
Body: JSON object with updated item details include Id <br />
ex) {
"id": "12ndijH23f",
"name": "Park",
"age": 19,
"city": Wellington
}

Delete: DELETE /items/{id}<br />
Replace {id} with the actual item ID.

# empathix
