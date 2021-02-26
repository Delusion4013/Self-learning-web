
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import React, { useState, useEffect } from 'react';
import {fetchLayouts, exportLayout, exportSession} from './js/awsAPI';





function App() {
	
	const [layout, setLayout] = useState({}); //React State and Effect Hooks

	useEffect(() => {
		//Basically runs when the component loads, you can also return a function here that would run then the component is being cleaned up
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
			<button className="styledButton" onClick={() => {exportLayout(layout)}}>
				Send Layout
			</button>
			</header>
			<LayoutGrid layout={layout} onGoal={exportSession}>
			</LayoutGrid>
		</div>
	);

}

export default App;
