/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');
import Router from 'next/router';

/* redux */
const store = {};
store.dispatch = jest.fn();

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
import ConnectedLogin, {
    LoginPage,
    getInitialProps,
} from '../../../pages/login';

describe('LoginPage tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();
        Router.push.mockClear();
        login.mockClear();

        Object.keys(actionMocks).forEach((key) => {
            actionMocks[key].mockClear();
        });

        Object.keys(modalFactories).forEach((key) => {
            if (typeof modalFactories[key] === 'function') {
                modalFactories[key].mockClear();
            }
        });
    });

    it('renders the connected LoginPage', () => {
        const wrapper = shallow(<ConnectedLogin />);
        expect(wrapper.length).toEqual(1);
    });

    it('renders LoginPage', () => {
        const wrapper = shallow(<LoginPage />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible when mounted', () => {
        const wrapper = mount(<LoginPage dispatch={store.dispatch} />);

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('redirects to the profile pane if localStorage.twinepmCSRFToken exists', () => {
        window.localStorage = { twinepmCSRFToken: 'test_token', };

        const wrapper = mount(<LoginPage dispatch={store.dispatch} />);

        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0]).toEqual([
            '/profile',
            'profile',
        ]);

        expect(setAppSelectedPane.mock.calls.length).toBe(1);
        expect(setAppSelectedPane.mock.calls[0]).toEqual([ 'profile', ]);

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setAppSelectedPane', },
        ]);
    });

    it('calls modalFactories.accountCreate when location.hash is #createAccount', () => {
        window.location.hash = '#createAccount';

        const wrapper = mount(<LoginPage dispatch={store.dispatch} />);

        expect(modalFactories.accountCreate.mock.calls.length).toBe(1);
    });

    it('handles side effects when handleUsernameChange is called', () => {
        const wrapper = shallow(<LoginPage dispatch={store.dispatch} />);

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
        const wrapper = shallow(<LoginPage dispatch={store.dispatch} />);

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
        const wrapper = shallow(<LoginPage dispatch={store.dispatch} />);
        
        wrapper.instance().doLogin = jest.fn();

        wrapper.instance().handleInputKeydown({ keyCode: 13, });

        expect(wrapper.instance().doLogin.mock.calls.length).toBe(1);
    });

    it('does not call doLogin when handleInputKeydown is called with e.keyCode !== 13', () => {
        const wrapper = shallow(<LoginPage dispatch={store.dispatch} />);
        
        wrapper.instance().doLogin = jest.fn();

        wrapper.instance().handleInputKeydown({ keyCode: 14, });

        expect(wrapper.instance().doLogin.mock.calls.length).toBe(0);
    });

    it('calls login when doLogin is called, passing the username and password props', async () => {
        const component = <LoginPage
            username="1"
            password="2"
            dispatch={store.dispatch}
            store={store} />;

        const wrapper = shallow(component);

        login.mockImplementationOnce(() => true);

        await wrapper.instance().doLogin();

        expect(login.mock.calls.length).toBe(1);
        expect(login.mock.calls[0]).toEqual([ store, '1', '2', ]);
    });

    it('clears password and focuses on the passwordInput when the result of login is falsey', async () => {
        const component = <LoginPage
            username="1"
            password="2"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);

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

        const component = <LoginPage
            username="1"
            password="2"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);

        wrapper.instance().passwordInput = { focus: jest.fn(), };

        const exception = new Error('oh no');
        login.mockImplementationOnce(() => {
            throw exception;
        });

        await wrapper.instance().doLogin();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([ exception, ]);
    });

    it('tests getInitialProps when req exists', async () => {
        await getInitialProps({ req: { url: '/foo', }, store, });

        expect(setAppSelectedPane.mock.calls.length).toBe(1);
        expect(setAppSelectedPane.mock.calls[0]).toEqual([ 'foo', ]);
        
        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setAppSelectedPane', },
        ]);
    });

    it('tests getInitialProps when req does not exist', async () => {
        await getInitialProps({ store, });

        expect(setAppSelectedPane.mock.calls.length).toBe(0);
        expect(store.dispatch.mock.calls.length).toBe(0);
    });
});