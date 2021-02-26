
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import React, { useState, useEffect } from 'react';
import {fetchLayouts} from './js/awsAPI';



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
			fetchLayouts().then((receievedLayout) => {
				setLayout(receievedLayout);
			})
		//You'll probably see a flash when you load the website, this is it loading in with a blank layout, and then updating when its finished making the API call and gets back a layout
	}, []);






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
