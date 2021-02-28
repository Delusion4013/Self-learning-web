
import React, { useState, useEffect } from 'react';
import TaskButton from './TaskButton';
import handleButton from "../js/handleEvents";

// creates layout grid preset from test.json, gets start time
//time stamp, creates events stack

/**
 * A component that stores a grid of buttons and records click events on those buttons as a session.
 * When an element marked as the end goal is clicked, it downloads the current session in JSON format.
 */
function LayoutGrid(props) {

	console.log("Loading grid:" + JSON.stringify(props.layout));
	const [session, setSession] = useState({
		sessionId: 0,
		startTime: Date.now(),
		endTime: 0,
		events: []
	});
	if (Object.keys(props.layout).length === 0) {
		return (<div></div>);
	}

	const gridParams = props.layout.gridParams;
	const elements = props.layout.elements;
	const repeatColumns = `repeat(${gridParams.w}, 1fr)`;
	const repeatRows = `repeat(${gridParams.h}, 1fr)`;



	return (
		<div className="layout-grid" style={{ gridTemplateColumns: repeatColumns, gridTemplateRows: repeatRows }}
			data-testid="layoutGrid">
			{elements.map(e => renderTaskButton(e))}
		</div>
	)




	/**
	 * Renders the TaskButton on the grid. Also handles the logic for downloading the session when a goal button is clicked.
	 * @param {Object} element - The element parameters to create the TaskButton.
	 * @param {String} element.id - The unique id for the element.
	 * @param {Object} element.rect - Stores the elements width, height, x and y as multiples of the cell size.
	 * @param {String} element.content - Whatever text to display for the element
	 */
	function renderTaskButton(element) {
		return (
			<TaskButton
				key={element.id}
				id={element.id}
				rect={element.rect}
				isGoal={element.endGoal}
				onClick={(e) => {
					handleButton(e, this.state.session, element.id);
					//if (element.endGoal) this.downloadUserSession(this.state.session);
					if (element.endGoal) {
						this.props.onGoal(this.state.session);
					}
				}}>
				{element.content}
			</TaskButton>
		)
	}





}

export default LayoutGrid;