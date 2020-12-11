//This function handles the button capture of the user from
//the website, gets timestamp of button click and button ID
//from arguments and pushes both to the events stack, it 
//checks if the button clicked was the last button to be
//clicked to signify end of session and runs onGoal function


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