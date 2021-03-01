
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import React, { useState, useEffect } from 'react';
import { fetchLayouts, exportLayout, exportSession } from './js/awsAPI';


/**
 * The main app for the site, this is what the page initially loads in
 */
function App() {


	const [layout, setLayout] = useState({}); //React State and Effect Hooks
	//See https://reactjs.org/docs/hooks-state.html
	/*
	 * Basically, adds some state to a functional component
	 * Imagine if in Java we could add members/fields to a function like a class
	 * Usestate takes  an initial value as a parameter (here an empty object)
	 * Returns a variable to store this in, and a setter function for it
	 * The const [layout, setLayout] is pattern matching
	 * 
	*/

	useEffect( () => {
		//Basically runs when the component loads, you can also return a function here that would run then the component is being cleaned up

		
		/* 
		   NB: The function here uses a Promise
		   Basically fetchLayouts will run asynchronously, you don't know when it will finish but you *can* give it a function to run aftewards
		   This is the parameter given to .then fetchlayouts returns the given number of layouts
		   Then aftewards the lambda function we've given it calls the setter for layout with the recieved layout
		*/
		
		fetchLayouts(1).then((receievedLayout) => {
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
				<button className="styledButton" onClick={() => { exportLayout(layout) }}>
					Send Layout
			</button>
			</header>
			<LayoutGrid layout={layout} onGoal={exportSession}>
			</LayoutGrid>
		</div>
	);

}

export default App;
