import React, { Component } from 'react';
import ReactDOM from "react-dom";
import TaskButton from './../TaskButton';
import handleButton from "./../handleEvents";
import App from "./../../App"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
let container = null;

/**
 * This function is used to generate the test task button.
 * @param {*} element 
 * @param {*} handleButton 
 */
function renderTestTaskButton(element, handleButton) {
   return (
      <TaskButton
         key={element.id}
         id={element.id}
         rect={element.rect}
         onClick={(e) => {
            handleButton(element.id);
         }}>
      </TaskButton>
   )
}

beforeEach(() => {
   // setup a DOM element as a render target
   container = document.createElement("div");
   document.body.appendChild(container);
});

afterEach(() => {
   // cleanup on exiting
   unmountComponentAtNode(container);
   container.remove();
   container = null;
});


/**
 * The aim of this test is to check that the taskbutton correctly passes the id when its clicked
 * The onclick function for taskbutton usually calls handleClick and passes the id to there
 * So instead we replace that with a jest dummy function to check it correctly gets the id
 */
test("passes the button id correctly to the button handler", () => {
   const onClick = jest.fn();
   let testElement = {
      id: "test",
      rect: { x: 1, y: 1, w: 1, h: 1 },
   }
   let button = renderTestTaskButton(testElement, onClick);
   act(() => {
      render(button, container);
   });

   // get ahold of the button element, and trigger some clicks on it
   const newbutton = document.querySelector("[data-testid=taskButton]");
   act(() => {
      newbutton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
   });
   expect(onClick).lastCalledWith(testElement.id);
   expect(onClick).toHaveBeenCalledTimes(1);

});