
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import currentLayout from './grid-layouts/test.json'; //Can just omit the file type

import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const apiName = 'MyApiName';


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
	return (
		<div id="container">
			<header className="title styled-box">
				<h1 >
					🏹 Quiver Bank
			</h1>
			</header>
			{
				console.log(currentLayout) //NB: Useful for debugging, you can pretty much just output anything to console and it'll either format it or just convert it to a string
			}
			<LayoutGrid layout={currentLayout} onGoal={exportSession}>
			</LayoutGrid>
		</div>
	);

}

export default App;
