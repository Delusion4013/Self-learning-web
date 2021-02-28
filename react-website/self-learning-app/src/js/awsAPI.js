import Amplify, { API } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const apiName = 'selflearningapi';

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

async function exportSession(session) {
	//Here we're using the aws amplify library to access the API
	//Underneath it is just making a REST API call using a libary called Axios to an endpoint, but this abstracts away some of the details
	const response = await API.post(apiName, '/sessions', {
		body: {
			session
		}
	});
	console.log(response);
	return response;
}

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

export {fetchLayouts, exportSession, exportLayout}