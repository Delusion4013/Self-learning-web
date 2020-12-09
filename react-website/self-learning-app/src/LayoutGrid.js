
import React, { Component } from 'react';
import { render } from 'react-dom';
import TaskButton from './TaskButton';


class LayoutGrid extends Component {
	constructor(props) {
		super();
		this.state = {};
		this.state.elements = props.layout.elements;
		let gridParams = props.layout.gridParams;
		this.state.repeatColumns = `repeat(${gridParams.w}, 1fr)`;
		this.state.repeatRows = `repeat(${gridParams.h}, 1fr)`;
		this.state.session = {	sessionId : 0,
			startTime : Date.now(),
			endTime : 0,
			events: [
	
			]
		}
	}
	render() {
		let onGoal = (buttonId) => {
			let session = this.state.session;
			session.endTime = Date.now();
			console.log(session);
			
			const element = document.createElement("a");
			const file = new Blob([JSON.stringify(session)], {type: 'text/plain'});
			element.href = URL.createObjectURL(file);
			element.download = "myFile.txt";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		}
		
		return (
			<div className="layout-grid" style={{gridTemplateColumns: this.state.repeatColumns, gridTemplateRows: this.state.repeatRows}}>
				{this.state.elements.map(e => {
					return (<TaskButton session={this.state.session} onGoal={onGoal} endGoal={e.endGoal} key={e.id} id={e.id} rect={e.rect}> 
						{e.content}
					</TaskButton>)
				})}
	
			</div>
		);
	}

		//Function returns a <div> element
		//Inside the div element, some javascript containing the button array
		//React takes the array and uses that to create the actual html button elements
}

export default LayoutGrid;