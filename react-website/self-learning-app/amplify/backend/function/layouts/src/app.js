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
	let params = {
		TableName: tableName,
	}
	if (request.query.limit) params.Limit = request.query.limit;
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
 * Retrieves the {count} latest layouts from the DynamoDB and returns them
 * Unless no value is provided, in which case returns the latest 1
 */
app.get("/layouts/id", function (request, response) {
	fetchNextId().then((id) => {
		response.json({ id });
	}).catch((err) => {
		response.json({ error: err });
	});
});

/**
 * Retrieves the latest layout from the DynamoDB and returns it
 */
app.get("/layouts/latest", function (request, response) {
	let params = {
		TableName: tableName,
	}
	dynamodb.scan(params).promise().then((result) => {
		if (result.Count == 0) {
			response.json({ statusCode: 500, error: "No layouts found", url: request.url });
			return;
		}
		result.Items.sort((a, b) => (parseInt(b.layoutId) - parseInt(a.layoutId)))
		const lastLayout = result.Items[0];
		response.json({ statusCode: 200, url: request.url, body: { layout: lastLayout } });

	})
		.catch((error) => {
			response.json({ statusCode: 500, error: error.message, url: request.url });
		});
});

/**
 * Add the recieved layout to the table, with the next incremental id;
 */
app.post("/layouts", function (request, response) {
	const timestamp = new Date().toISOString();
	fetchNextId().then((id) => {
		let layoutId = id;
		let params = {
			TableName: tableName,
			Item: {
				...request.body.layout,
				layoutId,
				createdAt: timestamp,
			}
		}
		return params;
	})
		.then((params) => dynamodb.put(params).promise())
		.then((result) => {
			response.json({ statusCode: 200, url: request.url, body: JSON.stringify({ item: result.Item, result }) });
		})
		.catch((error) => {
			response.json({ statusCode: 500, error: error.message, url: request.url });
		});

});

async function fetchNextId() {
	const limit = 1;
	let params = {
		TableName: tableName,
		ScanIndexForward: true
	}

	/*
		So the steps here are:
		 - Try to scan the table (retrieve all the entries in it up to limit)
		 - If there's an error with this, return the error
		 - Otherwise return an array of the layouts found
	*/
	return dynamodb.scan(params).promise().then((result) => {
		console.log("DEBUG: fetchNextId result:" + JSON.stringify(result));
		if (result.Count == 0) return 1;
		const sorted = result.Items.sort((a, b) => (parseInt(b.layoutId) - parseInt(a.layoutId)))
		const lastId = result.Items[0].layoutId;
		if (isNaN(lastId)) {
			return -1;
		} else {
			return parseInt(lastId) + 1;
		}

	});
}


module.exports = app;