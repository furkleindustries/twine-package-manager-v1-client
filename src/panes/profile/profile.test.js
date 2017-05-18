/* react */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { browserHistory, } from 'react-router';
const push = browserHistory.push;

/* redux */
import store from '../../store';
const dispatch = store.dispatch;

import * as actionsUnderTest from '../../appActions';

const actions = {
    setAppSelectedPane: actionsUnderTest.setAppSelectedPane,
    setSideBarVisible: actionsUnderTest.setSideBarVisible,
    setSideBarPanes: actionsUnderTest.setSideBarPanes,
    setSideBarSelectedPane: actionsUnderTest.setSideBarSelectedPane,
};

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* modules */
jest.mock('../../modules/modals/factories');
import * as modalFactories from '../../modules/modals/factories';

import panesSourceProfile from '../../panesSourceProfile';

/* components */
import { ProfilePane, } from './profile';
import rootComponent from '../../rootComponent';

describe('profile unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};

        store.dispatch = jest.fn();
        browserHistory.push = jest.fn();
    });

    it('renders the Profile component', () => {
        const wrapper = shallow(<ProfilePane />);
        expect(wrapper.length).toEqual(1);
    });

    it('produces the Profile component', () => {
        window.localStorage = { twinepmCSRFToken: 'test', };

        const baseUrl = process.env.PUBLIC_URL;
        
        store.dispatch = dispatch;
  
        const component = ReactTestUtils.renderIntoDocument(rootComponent);

        browserHistory.push = push;

        browserHistory.push(`${baseUrl}/profile`);

        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            ProfilePane);
        
        expect(find.length).toEqual(1);
    });

    it('handles side effects when mounted and localStorage.twinepmCSRFToken exists, passing localStorage.twinepmProfileLocation', () => {
        window.localStorage = {
            twinepmCSRFToken: 'test',
            twinepmProfileLocation: 'fake',
        };

        actionsUnderTest.setSideBarVisible = jest.fn();
        actionsUnderTest.setSideBarPanes = jest.fn();
        actionsUnderTest.setSideBarSelectedPane = jest.fn();

        /* can't really mount because it requires a Provider lower down */
        const wrapper = shallow(<ProfilePane />);

        /* fake mounting */
        wrapper.instance().componentDidMount();

        expect(actionsUnderTest.setSideBarVisible.mock.calls.length)
            .toBe(1);
        expect(actionsUnderTest.setSideBarVisible.mock.calls[0])
            .toEqual([ true, ]);

        expect(actionsUnderTest.setSideBarSelectedPane.mock.calls.length)
            .toBe(1);
        expect(actionsUnderTest.setSideBarSelectedPane.mock.calls[0])
            .toEqual([ 'fake', ]);

        expect(actionsUnderTest.setSideBarPanes.mock.calls.length).toBe(1);
        expect(actionsUnderTest.setSideBarPanes.mock.calls[0])
            .toEqual([ panesSourceProfile, ]);

        expect(store.dispatch.mock.calls.length).toBe(3);

        Object.keys(actions).forEach(key => {
            actionsUnderTest[key] = actions[key];
        });
    });

    it('redirects to login when and returns early when mounting if !localStorage.twinepmCSRFToken', () => {
        actionsUnderTest.setAppSelectedPane = jest.fn();

        const wrapper = shallow(<ProfilePane />);

        wrapper.instance().componentDidMount();

        expect(actionsUnderTest.setAppSelectedPane.mock.calls.length).toBe(1);
        expect(actionsUnderTest.setAppSelectedPane.mock.calls[0]).toEqual([
            'login',
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);

        expect(browserHistory.push.mock.calls.length).toBe(1);
        expect(/\/login$/.test(browserHistory.push.mock.calls[0])).toBe(true);
    });

    it('calls modalFactories.accountDelete when mounting if location.hash is #deleteAccount', () => {
        window.localStorage = { twinepmCSRFToken: 'foo', };

        window.location.hash = '#deleteAccount';

        const wrapper = shallow(<ProfilePane />);

        wrapper.instance().componentDidMount();

        expect(modalFactories.accountDelete.mock.calls.length).toBe(1);
    });

    it('calls modalFactories.packageCreate when mounting if location.hash is #createNewPackage', () => {
        window.localStorage = { twinepmCSRFToken: 'foo', };

        window.location.hash = '#createNewPackage';

        const wrapper = shallow(<ProfilePane />);

        wrapper.instance().componentDidMount();

        expect(modalFactories.packageCreate.mock.calls.length).toBe(1);
    });
});