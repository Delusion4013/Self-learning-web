
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import React, { useState, useEffect } from 'react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const apiName = 'api';

/**
 * Exports the current session as JSON
 * @param {*} session 
 */
let exportSession = (session) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ filename: "dataOut", session })
	};
	//TODO: Set this up running remotely
	fetch("http://localhost:3005/send", requestOptions)
		.then(res => console.log(res));
}



function App() {

	const [layout, setLayout] = useState({}); //React State and Effect Hooks

	useEffect(() => {
		//Basically runs when the component loads, you can also return a function here that would run then the component is being cleaned up
			fetchLayouts();
		//You'll probably see a flash when you load the website, this is it loading in with a blank layout, and then updating when its finished making the API call and gets back a layout
	}, []);

	async function fetchLayouts() {
		console.log("Getting layouts");
		//Here we're using the aws amplify library to access the API
		//Underneath it is just making a REST API call using a libary called Axios to an endpoint, but this abstracts away some of the details
		const response = await API.get(apiName, '/layouts', {});
		let defaultLayout = JSON.parse(response.body.layouts)[0];
		console.log("Layout recevied: " + JSON.stringify(defaultLayout));
		setLayout(defaultLayout);
	}




	return (
		<div id="container">
			<header className="title styled-box">
				<h1 >
					🏹 Quiver Bank
			</h1>
			</header>
			<LayoutGrid layout={layout} onGoal={exportSession}>
			</LayoutGrid>
		</div>
	);

}

export default App;
