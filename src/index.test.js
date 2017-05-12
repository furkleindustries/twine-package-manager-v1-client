// react
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

// components
import { App, } from './App';
import rootComponent from './rootComponent';
import { NavBarItem, } from './components/NavBar/NavBar';

describe('end to end tests', () => {
    let rootCopy;

    beforeEach(() => {
        // add a double for localStorage
        window.localStorage = {};

        // reset the root component state
        rootCopy = React.cloneElement(rootComponent);
    });

    afterEach(() => {
        rootCopy = null;
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(rootCopy, div);
    });

    it('starts at the home pane', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const app = ReactTestUtils.findRenderedComponentWithType(
            component,
            App);
        expect(app.props.appSelectedPane).toEqual('home');
    });

    it('has 6 NavBarItems', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const navBarItems = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            NavBarItem);

        expect(navBarItems.length).toEqual(6);
    });

    it('switches to the home pane on correct NavBarItem click', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const navBarItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'NavBarItem');

        const app = ReactTestUtils.findRenderedComponentWithType(component, App);

        navBarItems.forEach(navBarItem => {
            if (navBarItem.textContent === 'Home') {
                ReactTestUtils.Simulate.click(navBarItem);
            }
        });

        expect(app.props.appSelectedPane).toEqual('home');
    });

    it('switches to the search pane on correct NavBarItem click', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const navBarItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'NavBarItem');

        const app = ReactTestUtils.findRenderedComponentWithType(component, App);

        navBarItems.forEach(navBarItem => {
            if (navBarItem.textContent === 'Search') {
                ReactTestUtils.Simulate.click(navBarItem);
            }
        });

        expect(app.props.appSelectedPane).toEqual('search');
    });

    it('switches to the forum pane on correct NavBarItem click', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const navBarItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'NavBarItem');

        const app = ReactTestUtils.findRenderedComponentWithType(component, App);

        navBarItems.forEach(navBarItem => {
            if (navBarItem.textContent === 'Forum') {
                ReactTestUtils.Simulate.click(navBarItem);
            }
        });

        expect(app.props.appSelectedPane).toEqual('forum');
    });

    it('switches to the about pane on correct NavBarItem click', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const navBarItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'NavBarItem');

        const app = ReactTestUtils.findRenderedComponentWithType(component, App);

        navBarItems.forEach(navBarItem => {
            if (navBarItem.textContent === 'About') {
                ReactTestUtils.Simulate.click(navBarItem);
            }
        });

        expect(app.props.appSelectedPane).toEqual('about');
    });

    it('switches to the login pane on correct NavBarItem click', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const navBarItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'NavBarItem');

        const app = ReactTestUtils.findRenderedComponentWithType(component, App);

        navBarItems.forEach(navBarItem => {
            if (navBarItem.textContent === 'Login') {
                ReactTestUtils.Simulate.click(navBarItem);
            }
        });

        expect(app.props.appSelectedPane).toEqual('login');
    });

    it('switches to the profile pane on correct NavBarItem click', () => {
        const component = ReactTestUtils.renderIntoDocument(rootCopy);
        const navBarItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'NavBarItem');

        const app = ReactTestUtils.findRenderedComponentWithType(component, App);

        navBarItems.forEach(navBarItem => {
            if (navBarItem.textContent === 'Profile') {
                ReactTestUtils.Simulate.click(navBarItem);
            }
        });

        expect(app.props.appSelectedPane).toEqual('profile');
    });
});