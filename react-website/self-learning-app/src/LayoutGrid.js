
import React, { Component } from 'react';
import TaskButton from './TaskButton';


function LayoutGrid(props) {
	let elements = props.layout;
	return (
		<div className="layout-grid">
			{elements.map(e => {
				return (<TaskButton id={e.id} rect={e.rect}> 
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