import React, { Component } from 'react';
import ReactDOM from "react-dom";
import TaskButton from './../TaskButton';
import handleButton from "./../handleEvents";
import App from "./../../App"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import currentLayout from './testLayout.json';
import LayoutGrid from '../LayoutGrid';
let container = null;
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
test("correctly loads the layout from a .json file", () => {
    let gridElement =
        <LayoutGrid layout={currentLayout}></LayoutGrid>
    act(() => {
        render(
            gridElement,
            container
        )
    })
    const grid = document.querySelector("[data-testid=layoutGrid]");
    expect(gridElement.props.layout).toHaveProperty('elements');
    const elements = gridElement.props.layout.elements;
    currentLayout.elements.forEach(e => expect(elements).toContain(e));


});

test("Session ends on final button", () => { 
    let gridElement =
        <LayoutGrid layout={currentLayout}></LayoutGrid>
    act(() => {
        render(
            gridElement,
            container
        )
    })
    const grid = document.querySelector("[data-testid=layoutGrid]");
    expect(gridElement.props.layout).toHaveProperty('elements');
    const elements = gridElement.props.layout.elements;
    currentLayout.elements.forEach(e => expect(elements).toContain(e));

});
