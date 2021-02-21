
const convert = require('color-convert');

function getRandomColour(id) {
	let val = (id.split("").map(char => char.charCodeAt(0)).reduce((acc, curr) => (acc * curr) % 255));
	console.log(`${id} -> ${val}`);
	let baseColour = convert.hex.hsv('d73a49');
	baseColour[0] += val;
	baseColour[0] %= 255;
	return convert.hsv.hex(baseColour);
}

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
	let colour = getRandomColour(props.id);

	if (props.endGoal) console.log("Goal element made");
	return (
		<button buttonid={props.id} data-testid={dataTestId} onClick={props.onClick} className="styled-box task-button" style={{ backgroundColor:'#'+colour, gridColumnStart: x1, gridRowStart: y1, gridColumnEnd: x2, gridRowEnd: y2 }}>
			{props.children}
		</button >
		
	)
}

export default TaskButton;