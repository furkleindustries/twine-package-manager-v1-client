/* react */
jest.mock('next/router');
import Router from 'next/router';

/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn().mockImplementation(() => {
    return {
        appPanes: {
            login: {},
            profile: {},
        },
    };
});

jest.mock('../appActions');
import {
    setAppPanes,
    setAppSelectedPane,
    setSideBarSelectedPane,
    setCSRFToken,
} from '../appActions';

jest.mock('../panes/profile/profileActions');
import { setProfile, } from '../panes/profile/profileActions';

const actionMocks = {
    setAppPanes,
    setAppSelectedPane,
    setSideBarSelectedPane,
    setCSRFToken,
    setProfile,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(value => {
        return { type: key, };
    });
});

/* modules */
import logout from './logout';

jest.mock('./database/post');
import * as post from './database/post';

describe('logout unit tests', () => {
    beforeEach(() => {
        window.localStorage = {
            twinepmCRFToken: 'test_token12',
            twinepmProfileLocation: 'info',
        };

        Router.push.mockClear();
        store.dispatch.mockClear();
        Object.keys(actionMocks).forEach(key => {
            actionMocks[key].mockClear();
        });
    });

    it('calls action creators correctly with !skipServer', async () => {
        await logout(store, 'test_token');

        expect(setAppPanes.mock.calls.length).toBe(1);
        expect(setAppPanes.mock.calls[0]).toEqual([
            {
                login: { visible: true, },
                profile: { visible: false, },
            },
        ]);

        expect(setProfile.mock.calls.length).toBe(1);
        expect(setProfile.mock.calls[0]).toEqual([{}]);

        expect(setCSRFToken.mock.calls.length).toBe(1);
        expect(setCSRFToken.mock.calls[0]).toEqual([null]);

        expect(setSideBarSelectedPane.mock.calls.length).toBe(1);
        expect(setSideBarSelectedPane.mock.calls[0]).toEqual([null]);
    });

    it('calls store.dispatch correctly with !skipServer', async () => {
        await logout(store, 'test_token');

        expect(store.dispatch.mock.calls.length).toBe(4);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setAppPanes', },
        ]);

        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setProfile', },
        ]);

        expect(store.dispatch.mock.calls[2]).toEqual([
            { type: 'setCSRFToken', },
        ]);

        expect(store.dispatch.mock.calls[3]).toEqual([
            { type: 'setSideBarSelectedPane', },
        ]);
    });

    it('redirects when appSelectedPane is profile', async () => {
        store.getState.mockImplementationOnce(() => {
            return {
                appPanes: {
                    login: {},
                    profile: {},
                },

                appSelectedPane: 'profile',
            };
        });

        await logout(store, 'test_token');

        expect(store.dispatch.mock.calls.length).toBe(5);
        expect(store.dispatch.mock.calls[4]).toEqual([
            { type: 'setAppSelectedPane', },
        ]);

        expect(Router.push.mock.calls.length).toBe(1);
        expect(/\/login$/.test(Router.push.mock.calls[0][0])).toEqual(true);
    });

    it('logs exceptions received from post.logout and returns early', async () => {
        const log = console.log;
        console.log = jest.fn();

        const exception = new Error('oh gosh!');
        post.logout.mockImplementationOnce(() => {
            throw exception;
        });

        await logout(store, 'test_token', 'skipServer');

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);

        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });
});