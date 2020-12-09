import handleButton from "./handleEvents";

function TaskButton(props) {
	let x1 = props.rect.x;
	let y1 = props.rect.y;
	let x2 = x1 + props.rect.w;	
	let y2 = y1 + props.rect.h;
	let name = props.id;
	
	return (
		<button onClick={(e) => {handleButton(e, props.session, name, props.endGoal, props.onGoal)}} className="styled-box task-button" style={{gridColumnStart: x1, gridRowStart: y1, gridColumnEnd: x2, gridRowEnd: y2 }}>
			{props.children}
		</button>
	)
}

export default TaskButton;