/* react */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { browserHistory, } from 'react-router';
const push = browserHistory.push;

/* enzyme */
import { shallow, mount } from 'enzyme';

/* redux */
import store from '../../store';
const dispatch = store.dispatch;

jest.mock('../../appActions');
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../../appActions';

jest.mock('./loginActions');
import {
    setUsername,
    setPassword,
} from './loginActions';

const actionMocks = {
    setAppSelectedPane,
    setSideBarVisible,
    setUsername,
    setPassword,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(value => {
        return { type: key, };
    });
});

/* modules */
jest.mock('../../modules/login');
import login from '../../modules/login';

jest.mock('../../modules/modals/factories');
import * as modalFactories from '../../modules/modals/factories';

/* components */
import { LoginPane, } from './login';
import rootComponent from '../../rootComponent';

describe('LoginPane tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        
        browserHistory.push = jest.fn();
        store.dispatch = jest.fn();

        browserHistory.push.mockClear();
        setAppSelectedPane.mockClear();
        setSideBarVisible.mockClear();
        setUsername.mockClear();
        setPassword.mockClear();
        login.mockClear();
        modalFactories.accountCreate.mockClear();
    });

    it('produces the connected LoginPane', () => {
        const baseUrl = process.env.PUBLIC_URL;

        window.localStorage = {};

        store.dispatch = dispatch;

        const component = ReactTestUtils.renderIntoDocument(rootComponent);

        browserHistory.push = push;
        
        browserHistory.push(`${baseUrl}/login`);
        
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            LoginPane);
        
        expect(find.length).toEqual(1);
    });

    it('renders LoginPane', () => {
        const wrapper = shallow(<LoginPane />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible when mounted', () => {
        const wrapper = mount(<LoginPane />);

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('redirects to the profile pane if localStorage.twinepmCSRFToken exists', () => {
        window.localStorage = { twinepmCSRFToken: 'test_token', };

        const wrapper = mount(<LoginPane />);

        expect(browserHistory.push.mock.calls.length).toBe(1);
        expect(/\/profile$/.test(browserHistory.push.mock.calls[0][0]))
            .toBe(true);

        expect(setAppSelectedPane.mock.calls.length).toBe(1);
        expect(setAppSelectedPane.mock.calls[0]).toEqual([ 'profile', ]);

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setAppSelectedPane', },
        ]);
    });

    it('calls modalFactories.accountCreate when location.hash is #createAccount', () => {
        window.location.hash = '#createAccount';

        const wrapper = mount(<LoginPane />);

        expect(modalFactories.accountCreate.mock.calls.length).toBe(1);
    });

    it('handles side effects when handleUsernameChange is called', () => {
        const wrapper = shallow(<LoginPane />);

        wrapper.instance().handleUsernameChange({
            target: { value: 'testing!', },
        });

        expect(setUsername.mock.calls.length).toBe(1);
        expect(setUsername.mock.calls[0]).toEqual([ 'testing!', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setUsername', },
        ]);
    });

    it('handles side effects when handlePasswordChange is called', () => {
        const wrapper = shallow(<LoginPane />);

        wrapper.instance().handlePasswordChange({
            target: { value: 'test', },
        });

        expect(setPassword.mock.calls.length).toBe(1);
        expect(setPassword.mock.calls[0]).toEqual([ 'test', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setPassword', },
        ]);
    });

    it('calls doLogin when handleInputKeydown is called with e.keyCode of 13', () => {
        const wrapper = shallow(<LoginPane />);
        
        wrapper.instance().doLogin = jest.fn();

        wrapper.instance().handleInputKeydown({ keyCode: 13, });

        expect(wrapper.instance().doLogin.mock.calls.length).toBe(1);
    });

    it('does not call doLogin when handleInputKeydown is called with e.keyCode !== 13', () => {
        const wrapper = shallow(<LoginPane />);
        
        wrapper.instance().doLogin = jest.fn();

        wrapper.instance().handleInputKeydown({ keyCode: 14, });

        expect(wrapper.instance().doLogin.mock.calls.length).toBe(0);
    });

    it('calls login when doLogin is called, passing the username and password props', async () => {
        const wrapper = shallow(<LoginPane username="1" password="2" />);

        login.mockImplementationOnce(() => true);

        await wrapper.instance().doLogin();

        expect(login.mock.calls.length).toBe(1);
        expect(login.mock.calls[0]).toEqual([ '1', '2', ]);
    });

    it('clears password and focuses on the passwordInput when the result of login is falsey', async () => {
        const wrapper = shallow(<LoginPane username="1" password="2" />);

        login.mockImplementationOnce(() => false);

        const focus = jest.fn();
        wrapper.instance().passwordInput = { focus, };

        await wrapper.instance().doLogin();

        expect(setPassword.mock.calls.length).toBe(1);
        expect(setPassword.mock.calls[0]).toEqual([ '', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setPassword', },
        ]);

        expect(focus.mock.calls.length).toBe(1);
    });

    it('logs exceptions received from login', async () => {
        const log = console.log;
        console.log = jest.fn();

        const wrapper = shallow(<LoginPane username="1" password="2" />);

        wrapper.instance().passwordInput = { focus: jest.fn(), };

        const exception = new Error('oh no');
        login.mockImplementationOnce(() => {
            throw exception;
        });

        await wrapper.instance().doLogin();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([ exception, ]);
    });
});