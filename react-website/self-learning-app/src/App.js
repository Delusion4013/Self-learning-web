
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import React, { useState, useEffect } from 'react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const apiName = 'api';


let exportSession = (session) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ filename: "dataOut", session })
	};
	fetch("http://localhost:3005/send", requestOptions)
		.then(res => console.log(res));
}



function App() {

	const [layout, setLayout] = useState({});

	useEffect(() => {
		// Update the document title using the browser API
			fetchLayouts();
	}, []);

	async function fetchLayouts() {
		console.log("Getting layouts");
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
