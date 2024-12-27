
/**
 * 
 * @param {*} layoutProps The props used to define the layout.fu
 * @param {*} layoutProps.gridParams
 * @param {*} layoutProps.children 
 * @returns 
 */
export default function saveLayout(layoutProps) {
	let layout = {};
	layout.gridParams = layoutProps.gridParams;
	let saved = {}
	layoutProps.children.map( el => {
		saved[el.props.id] = saveElement(el);
	})
	layout.elements = saved;
	console.log(JSON.stringify(layout));
	return layout;
}

function saveElement(el) {
	const props = el.props;
	let obj = {
		x: props.x,
		y: props.y,
		w: props.w ? props.w : 1,
		h: props.h ? props.h : 1,
	};
	return obj;
}