import Amplify, { API } from 'aws-amplify';
import awsconfig from 'aws-exports';

Amplify.configure(awsconfig);

const apiName = 'selflearningapi';

/**
 * Makes a call to the layouts api to retrieve the latest layouts, up to limit
 * @param {*} limit The maxmimum number of layouts to retrieve
 */
async function fetchLayouts(limit) {
	console.log("Fetching layouts");
	//Here we're using the aws amplify library to access the API
	//Underneath it is just making a REST API call using a libary called Axios to an endpoint, but this abstracts away some of the details
	const response = await API.get(apiName, '/layouts', {
		body: {
			limit
		}
	});
	
	let defaultLayout = JSON.parse(response.body.layouts)[0];
	console.log("Layout recevied: " + JSON.stringify(defaultLayout));
	return defaultLayout;
}


/**
 * Retrieves the latest layout from the layouts DynamoDB table.
 * @returns {Object} The latest layout found in the layouts DynamoDB table.
 */
async function fetchLatestLayout() {
	const response = await API.get(apiName, '/layouts/latest', {});
	if (!response.body) return {};
	let layout = response.body.layout;
	console.log("Layout recevied: " + JSON.stringify(layout));
	return layout;
}

/**
 * Retrieves the number of sessions found in the sessions DynamoDB table.
 * @returns The number of sessions found in the sessions DynamoDB table.
 */
async function fetchCountSessions() {
	const response = await  API.get(apiName, '/sessions', {});
	console.log(JSON.parse(response.body.sessions));
	return (JSON.parse(response.body.sessions).length);
}

/**
 * Send a post request to the api with the current session
 * The api calls a lambda function which will add the session to the dynamo db table
 * @param {Object} session 
 */
async function exportSession(session) {
	//Here we're using the aws amplify library to access the API
	//Underneath it is just making a REST API call using a libary called Axios to an endpoint, but this abstracts away some of the details
	session.endTime = Date.now();
	const response = await API.post(apiName, '/sessions', {
		body: {
			session
		}
	});
	console.log(response);
	return response;
}

/**
 * Send a post request to the api with the current layout
 * The api calls a lambda function which will add the layout to the dynamo db table
 * Mainly just for debugging purposes, since in reality it would be the RL model sending layouts to the table
 * @param {*} layout 
 */
async function exportLayout(layout) {
	//Here we're using the aws amplify library to access the API
	//Underneath it is just making a REST API call using a libary called Axios to an endpoint, but this abstracts away some of the details

	const response = await API.post(apiName, '/layouts', {
		body: {
			layout
		}
	});
	console.log(response);
	return response;
}

export {fetchLatestLayout, fetchLayouts, exportSession, exportLayout, fetchCountSessions}