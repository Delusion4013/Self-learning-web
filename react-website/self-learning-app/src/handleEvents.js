//This function handles the button capture of the user from
//the website, gets timestamp of button click and button ID
//from arguments and pushes both to the events stack, it 
//checks if the button clicked was the last button to be
//clicked to signify end of session and runs onGoal function

/**
 * Adds the button click event to the given session, storing the button id and when it was clicked.
 * @param {*} e - The original JavaScript event for the click.
 * @param {*} session - The current session of user events.
 * @param {*} id - The unique id for the button to add to the session.
 */
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