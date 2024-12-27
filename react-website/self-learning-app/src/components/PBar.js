import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'App.css';
import { fetchCountSessions } from 'js/awsAPI';
import React, { useState, useEffect } from 'react';

function PBar (props) {

    const [msg, setMsg] = useState('Sessions until next iteration: ');
    const [count, setCount] = useState(0);
	useEffect(() => {
	
		fetchCountSessions().then((receivedCount) => {
            setMsg('Sessions until next iteration: ' + (receivedCount%100));
            setCount(receivedCount);
        })
	}, [])



    return (
        <div>
            <ProgressBar animated className="pBar" now={count} label={msg}/>
        </div>
    )
}

export default PBar;