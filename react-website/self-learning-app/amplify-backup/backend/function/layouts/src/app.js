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

/*
	Basically this catches all the requests sent to url/layouts, and does different things depending on what type of request it is
	So far it's just if its a GET request or a POST request, but we could modify this further, e.g. requests to url/layouts/current, url/layouts/byid

	The layouts are stored in a DynamoDB database, which is a NoSQL database. 
	Objects are basically stored like maps/dictionaries using key-value pairings
*/

/**
 * Retrieves the {count} latest layouts from the DynamoDB and returns them
 * Unless no value is provided, in which case returns the latest 1
 */
app.get("/layouts", function (request, response) {
	const limit = request.limit ? request.limit : 1
	let params = {
		TableName: tableName,
		limit: limit
	}
	/*
		So the steps here are:
		 - Try to scan the table (retrieve all the entries in it up to limit)
		 - If there's an error with this, return the error
		 - Otherwise return an array of the layouts found

	*/
	dynamodb.scan(params, (error, result) => {
		if (error) {
			response.json({ statusCode: 500, error: error.message });
		} else {
			response.json({
				statusCode: 200, url: request.url, body:
				{
					layouts: JSON.stringify(result.Items)
				}
			})
		}
	});
});

/**
 * Add the recieved layout to the table, with the id "test"
 */
app.post("/layouts", function (request, response) {
	const timestamp = new Date().toISOString();
	let layoutId = request.body.id ? request.body.id : uuidv4();
	let params = {
		TableName: tableName,
		Item: {
			...request.body.layout,
			layoutId,
			createdAt: timestamp,
		}
	}
	dynamodb.put(params, (error, result) => {
		if (error) {
			response.json({ statusCode: 500, error: error.message, url: request.url });
		} else {
			response.json({ statusCode: 200, url: request.url, body: JSON.stringify({ item: params.Item, result }) })
		}
	});
});

module.exports = app;