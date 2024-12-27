
import React, { useState } from 'react';
import { handleMouseMove } from 'js/handleEvents';
import renderTaskDiv from 'components/renderTaskDiv';
import saveLayout from 'js/saveLayout';
import { exportLayout } from 'js/awsAPI';

// creates layout grid preset from test.json, gets start time
//time stamp, creates events stack

/**
 * A component that stores a grid of buttons and records click events on those buttons as a session.
 * When an element marked as the end goal is clicked, it downloads the current session in JSON format.
 * @param {Object} props Parameters for the FlexGrid
 * @param {Object} props.gridParams The width and height for the grid. This is the number of cells the grid is split into.
 */
export default function FlexGrid(props) {
	/*useEffect(() => {
		exportLayout(saveLayout(props));
	})*/

	
	const [session, setSession] = useState({
		sessionId: 0,
		startTime: Date.now(),
		endTime: 0,
		events: [],
		mouseEvents: [],
	});


	if (props.startTimer === true) {
		session.startTime = Date.now();
	}

	const gridParams = props.gridParams;
	const elements = props.elements;
	const repeatColumns = `repeat(${gridParams.w}, 1fr)`;
	const repeatRows = `repeat(${gridParams.h}, 1fr)`;

	var tempTime = Date.now();

	return (
		<div className="layout-grid" style={{ gridTemplateColumns: repeatColumns, gridTemplateRows: repeatRows }}
			data-testid="layoutGrid" onMouseMove={_onMouseMove.bind()}>
			{renderTaskDiv(<button id="export" x="10" y="3" w="3" h="2" onClick = {(e) => {
				let layout = saveLayout(props, gridParams, elements);
				exportLayout(layout);
			}}>
				Export Layout
			</button>, session, elements)}
			{props.children.map(e => renderTaskDiv(e, session, elements))}

		</div>
	)

	function _onMouseMove(e) {
		var crntTime = Date.now();
		if (crntTime - tempTime > 200) {
			let mousePos = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
			handleMouseMove(mousePos, session);
			tempTime = crntTime;
			//console.log(mousePosition.x + ", " + mousePosition.y + "  :  " + crntTime);
		}
	}
}


