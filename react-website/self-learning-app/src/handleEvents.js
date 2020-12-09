function handleButton(e, session, id) {
	console.log(session);
	let events = session.events;
	let event = {
		buttonId: id,
		time: Date.now()
	}
	events.push(event);

	
    return;
}
export default handleButton;