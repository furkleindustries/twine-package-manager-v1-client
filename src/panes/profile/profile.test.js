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
    setSideBarPanes,
    setSideBarSelectedPane,
} from '../../appActions';

const actionMocks = {
    setAppSelectedPane,
    setSideBarVisible,
    setSideBarPanes,
    setSideBarSelectedPane,
};

Object.keys(actionMocks).forEach((key) => {
    actionMocks[key].mockImplementation(() => ( { type: key, } ));
});

/* modules */
jest.mock('../../modules/modals/factories');
import * as modalFactories from '../../modules/modals/factories';

import panesSourceProfile from '../../panesSourceProfile';

/* components */
import ConnectedProfile, {
    ProfilePage,
    getInitialProps,
} from '../../../pages/profile';

describe('profile unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();
        Router.push.mockClear();

        Object.keys(actionMocks).forEach((key) => {
            actionMocks[key].mockClear();
        });

        Object.keys(modalFactories).forEach((key) => {
            if (typeof modalFactories[key] === 'function') {
                modalFactories[key].mockClear();
            }
        });
    });

    it('renders the connected Profile component', () => {
        const wrapper = shallow(<ConnectedProfile />);
        expect(wrapper.length).toEqual(1);
    });

    it('handles side effects when mounted and localStorage.twinepmCSRFToken exists, passing localStorage.twinepmProfileLocation', () => {
        window.localStorage = {
            twinepmCSRFToken: 'test',
            twinepmProfileLocation: 'fake',
        };

        const wrapper = shallow(<ProfilePage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ true, ]);

        expect(setSideBarSelectedPane.mock.calls.length).toBe(1);
        expect(setSideBarSelectedPane.mock.calls[0]).toEqual([ 'fake', ]);

        expect(setSideBarPanes.mock.calls.length).toBe(1);
        expect(setSideBarPanes.mock.calls[0])
            .toEqual([ panesSourceProfile, ]);

        expect(store.dispatch.mock.calls.length).toBe(3);
    });

    it('redirects to login when and returns early when mounting if !localStorage.twinepmCSRFToken', () => {
        const wrapper = shallow(<ProfilePage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(setAppSelectedPane.mock.calls.length).toBe(1);
        expect(setAppSelectedPane.mock.calls[0]).toEqual([ 'login', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);

        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0]).toEqual([
            '/login',
            'login',
        ]);
    });

    it('calls modalFactories.accountDelete when mounting if location.hash is #deleteAccount', () => {
        window.localStorage = { twinepmCSRFToken: 'foo', };

        window.location.hash = '#deleteAccount';

        const wrapper = shallow(<ProfilePage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(modalFactories.accountDelete.mock.calls.length).toBe(1);
    });

    it('calls modalFactories.packageCreate when mounting if location.hash is #createNewPackage', () => {
        window.localStorage = { twinepmCSRFToken: 'foo', };

        window.location.hash = '#createNewPackage';

        const wrapper = shallow(<ProfilePage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(modalFactories.packageCreate.mock.calls.length).toBe(1);
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