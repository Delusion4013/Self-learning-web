import React from 'react';
import { handleButton } from 'js/handleEvents';
import { exportSession } from 'js/awsAPI';

export default function renderTaskDiv(el, session, rects) {
	/*
		Rects is the positions taken from the layout we've received
		Either the exported layout has a position for this element, 
		or maybe its a new element in which case take the new position
		this would just be from the html
	*/
	let props = { ...el.props };
	let rect = {}
	if (rects && rects[el.props.id]) {
		rect = rects[el.props.id];
		rect = {
			x: Number(rect.x),
			y: Number(rect.y),
			w: Number(rect.w ? rect.w : 1),
			h: Number(rect.h ? rect.h : 1)
		}
		console.log(rect);
	} else {
		rect = {
			x: Number(props.x ? props.x : 1),
			y: Number(props.y ? props.y : 1),
			w: Number(props.w ? props.w : 1),
			h: Number(props.h ? props.h : 1)
		}
	}
	let oldStyle = props.style;
	let x1 = rect.x;
	let y1 = rect.y;
	let x2 = x1 + rect.w;
	let y2 = y1 + rect.h;
	let gridPos = { gridColumnStart: x1, gridRowStart: y1, gridColumnEnd: x2, gridRowEnd: y2 };
	props.style = { ...gridPos, ...oldStyle };
	if (!props.onClick) props.onClick = (e) => {
		handleButton(e, session, el.props.id);
		if (props.end) exportSession(session);
	}
	if (!props.key) props.key = props.id;
	//console.log(props);
	return React.cloneElement(el, props);
}

