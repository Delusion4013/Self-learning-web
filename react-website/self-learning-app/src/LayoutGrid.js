
import React, { Component } from 'react';
import TaskButton from './TaskButton';


function LayoutGrid(props) {
	let elements = props.layout.elements;
	let gridParams = props.layout.gridParams;
	let repeatColumns = 	`repeat(${gridParams.w}, 1fr)`;
	let repeatRows = 	`repeat(${gridParams.h}, 1fr)`;
	return (
		<div className="layout-grid" style={{gridTemplateColumns: repeatColumns, gridTemplateRows: repeatRows}}>
			{elements.map(e => {
				return (<TaskButton key={e.id} id={e.id} rect={e.rect}> 
					{e.content}
				</TaskButton>)
			})}

		</div>
	);
		//Function returns a <div> element
		//Inside the div element, some javascript containing the button array
		//React takes the array and uses that to create the actual html button elements
}

export default LayoutGrid;