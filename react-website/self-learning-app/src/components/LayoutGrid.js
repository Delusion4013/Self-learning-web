
import React, { Component } from 'react';
import TaskButton from './TaskButton';
import handleButton from "./handleEvents";
// creates layout grid preset from test.json, gets start time
//time stamp, creates events stack

/**
 * A component that stores a grid of buttons and records click events on those buttons as a session.
 * When an element marked as the end goal is clicked, it downloads the current session in JSON format.
 */
class LayoutGrid extends Component {
	constructor(props) {
		super(props); //We're using inheritance here, super() applies the original constructor for the Component class
		let gridParams = props.layout.gridParams;
		this.state = {
			elements: props.layout.elements,
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

	/**
	 * Renders the TaskButton on the grid. Also handles the logic for downloading the session when a goal button is clicked.
	 * @param {Object} element - The element parameters to create the TaskButton.
	 * @param {String} element.id - The unique id for the element.
	 * @param {Object} element.rect - Stores the elements width, height, x and y as multiples of the cell size.
	 * @param {String} element.content - Whatever text to display for the element
	 */
	renderTaskButton(element) {
		return (
			<TaskButton 
				key={element.id} 
				id={element.id} 
				rect={element.rect}
				onClick={(e) => {
						handleButton(e, this.state.session, element.id);
						//if (element.endGoal) this.downloadUserSession(this.state.session);
					if (element.endGoal) {
						const requestOptions = {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(this.state.session)
						};
						fetch("http://localhost:3005/send", requestOptions)
							.then(res => console.log(res));
					}
					}}> 
				{element.content}
			</TaskButton>
		)
	}

	/**
	 * Adds an end time to the user session and then downloads it to a .json file.
	 * @param {Object} session - The current recording of user events.
	 * @param {Date} session.endTime - The time the user clicked on the goal element.
	 */
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