function handleButton(e, session, id, end, onGoal) {
	console.log(end);
	let events = session.events;
	let event = {
		buttonId: id,
		time: Date.now()
	}

	events.push(event);
	if (end) {
		//window.alert("Session done");
		onGoal(id);
	}
	
    return;
}
export default handleButton;