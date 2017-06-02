/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* redux */
const store = {};
store.dispatch = jest.fn();

jest.mock('../../appActions');
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../../appActions';

const actionMocks = {
    setAppSelectedPane,
    setSideBarVisible,
};

Object.keys(actionMocks).forEach((key) => {
    actionMocks[key].mockImplementation(() => ( { type: key, } ));
});

/* components */
import ConnectedForum, {
    ForumPage,
    getInitialProps,
} from '../../../pages/forum';

/* modules */
jest.mock('../../modules/modals/create');
import create from '../../modules/modals/create';

describe('ForumPage unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        window.clearInterval = jest.fn();
        window.removeEventListener = jest.fn();
        store.dispatch.mockClear();
        create.mockClear();

        Object.keys(actionMocks).forEach((key) => {
            actionMocks[key].mockClear();
        });
    });

    it('renders the connected ForumPage component', () => {
        const wrapper = mount(<ConnectedForum />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible', () => {
        const wrapper = shallow(<ForumPage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('creates an event listener with type message when mounted', () => {
        window.addEventListener = jest.fn();

        const wrapper = shallow(<ForumPage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(addEventListener.mock.calls.length).toBe(1);
        expect(addEventListener.mock.calls[0][0]).toBe('message');
    });

    it('creates an interval which posts tpmClientSignOut messages to the iframe when mounted', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const wrapper = shallow(<ForumPage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        const postMessage = jest.fn();
        wrapper.instance().iframe = {
            contentWindow: { postMessage, },
        };

        jest.runTimersToTime(100);

        expect(postMessage.mock.calls.length).toBe(1);
        expect(postMessage.mock.calls[0])
            .toEqual([
                { type: 'tpmClientSignOut', },
                '*',
            ]);
    });

    it('does not create an interval when mounted if localStorage.twinepmCSRFToken exists', () => {
        window.localStorage = { twinepmCSRFToken: 'foo', };

        jest.clearAllTimers();
        jest.useFakeTimers();

        const wrapper = shallow(<ForumPage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        const postMessage = jest.fn();
        wrapper.instance().iframe = {
            contentWindow: { postMessage, },
        };

        jest.runTimersToTime(100);

        expect(postMessage.mock.calls.length).toBe(0);
    });

    it('removes the event listener and clear interval with type message when unmounted', () => {
        const wrapper = shallow(<ForumPage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();
        wrapper.instance().componentWillUnmount();

        expect(removeEventListener.mock.calls.length).toBe(1);
        expect(removeEventListener.mock.calls[0][0]).toBe('message');

        expect(clearInterval.mock.calls.length).toBe(1);
    });

    it('breaks nothing when message data type is tpmForumPath and data.href exists', () => {
        const wrapper = shallow(<ForumPage />);

        const message = {
            data: {
                type: 'tpmForumPath',
                href: 'foo',
            },
        };

        wrapper.instance().receiveMessage(message);
    });

    it('handles receiveMessage by clearing the interval if the data type is tpmForumSignedOut', () => {
        const wrapper = shallow(<ForumPage />);

        const message = {
            data: { type: 'tpmForumSignedOut', },
        };

        wrapper.instance().receiveMessage(message);

        expect(clearInterval.mock.calls.length).toBe(1);
    });

    it('does nothing when message data exists but type is unrecognized', () => {
        const wrapper = shallow(<ForumPage />);

        const message = {
            data: { type: 'unrecognized', },
        };

        wrapper.instance().receiveMessage(message);
        expect(clearInterval)
    });

    it('does nothing when message.data does not exist or message.data is not an object', () => {
        const wrapper = shallow(<ForumPage />);

        const message = {};

        wrapper.instance().receiveMessage(message);
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