
import React, { Component } from 'react';
import { render } from 'react-dom';
import TaskButton from './TaskButton';
import handleButton from "./handleEvents";
// creates layout grid preset from test.json, gets start time
//time stamp, creates events stack
class LayoutGrid extends Component {
	constructor(props) {
		super(props); //We're using inheritance here, super() applies the original constructor for the Component class
		let gridParams = props.layout.gridParams;
		this.state = {
			elements: props.layout.elements,
			taskButtons: [],
			repeatColumns: `repeat(${gridParams.w}, 1fr)`,
			repeatRows: `repeat(${gridParams.h}, 1fr)`,
			session: {
				sessionId : 0,
					startTime: Date.now(),
					endTime: 0,
					events: []
				}
		};

	}
	render() {
		return (
			<div className="layout-grid" style={{gridTemplateColumns: this.state.repeatColumns, gridTemplateRows: this.state.repeatRows}}>
				{this.state.elements.map(e => this.renderTaskButton(e))}
			</div>
		);
	}

	
	renderTaskButton(element) {
		return (
			<TaskButton 
				key={element.id} 
				id={element.id} 
				rect={element.rect}
				onClick={(e) => {
						handleButton(e, this.state.session, element.id);
						if (element.endGoal) this.downloadUserSession(this.state.session);
					}}> 
				{element.content}
			</TaskButton>
		)
	}


	downloadUserSession(session) {
		session.endTime = Date.now(); // gets endtime time stamp
		console.log(session);
		//writes session to file in format of dataOut.json file
		const element = document.createElement("a");
		const file = new Blob([JSON.stringify(session)], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = "dataOut.json";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}
		//Function returns a <div> element
		//Inside the div element, some javascript containing the button array
		//React takes the array and uses that to create the actual html button elements
}

export default LayoutGrid;