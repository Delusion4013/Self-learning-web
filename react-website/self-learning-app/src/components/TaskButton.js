

/**
 * A button in the LayoutGrid
 * @param {Object} props 
 */
function TaskButton(props) {
	let x1 = props.rect.x;
	let y1 = props.rect.y;
	let x2 = x1 + props.rect.w;	
	let y2 = y1 + props.rect.h;	
	let dataTestId = "taskButton" + (props.isGoal ? "-goal" : "");
	if (props.endGoal) console.log("Goal element made");
	return (
		<button buttonid={props.id} data-testid={dataTestId} onClick={props.onClick} className="styled-box task-button" style={{gridColumnStart: x1, gridRowStart: y1, gridColumnEnd: x2, gridRowEnd: y2 }}>
			{props.children}
		</button >
		
	)
}

export default TaskButton;