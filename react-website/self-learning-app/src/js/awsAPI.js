import Amplify, { API } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const apiName = 'selflearningapi';

async function fetchLayouts() {
	console.log("Getting layouts");
	//Here we're using the aws amplify library to access the API
	//Underneath it is just making a REST API call using a libary called Axios to an endpoint, but this abstracts away some of the details
	const response = await API.get(apiName, '/layouts', {});
	let defaultLayout = JSON.parse(response.body.layouts)[0];
	console.log("Layout recevied: " + JSON.stringify(defaultLayout));
	return defaultLayout;
}

export {fetchLayouts}