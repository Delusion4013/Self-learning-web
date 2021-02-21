const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
const { v4: uuidv4 } = require('uuid')
AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = "layouts";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// todosLambda route handler: fetching todos
app.get("/layouts", function (request, response) {
	let params = {
	  TableName: tableName,
	  limit: 10
	}
	dynamodb.scan(params, (error, result) => {
	  if (error) {
		response.json({ statusCode: 500, error: error.message });
	  } else {
		response.json({ statusCode: 200, url: request.url, body: 
			{
				layouts: JSON.stringify(result.Items)
			} 
		})
	  }
	});
  });


  app.post("/layouts", function (request, response) {
	const timestamp = new Date().toISOString();
	let params = {
	  TableName: tableName,
	  Item: {
		...request.body.layout,
		id: "test",               // auto-generate id
		createdAt: timestamp,
	  }
	}
	dynamodb.put(params, (error, result) => {
	  if (error) {
		response.json({ statusCode: 500, error: error.message, url: request.url });
	  } else {
		response.json({ statusCode: 200, url: request.url, body: JSON.stringify({item: params.Item, result}) })
	  }
	});
  });
  
module.exports = app;