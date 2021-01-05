import React, { Component } from 'react';
import ReactDOM from "react-dom";
import TaskButton from './../TaskButton';
import handleButton from "./../handleEvents";
import App from "./../../App"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
let container = null;

function renderTaskButton(element, handleButton) {
   return (
      <TaskButton
         key={element.id}
         id={element.id}
         rect={element.rect}
         onClick={(e) => {
            handleButton(element.id);
         }}>
         {element.content}
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



it("passes the button id correctly", () => {
   const onClick = jest.fn();
   let testElement = {
      id: "test",
      rect: { x: 1, y: 1, w: 1, h: 2 },
   }
   let button = renderTaskButton(testElement, onClick);
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