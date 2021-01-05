import React, { Component } from 'react';
import ReactDOM from "react-dom";
import TaskButton from './../TaskButton';
import handleButton from "./../handleEvents";
import App from "./../../App"

test("Identifies which button is clicked", ()=>{
   ReactDOM.render(<App />)
})