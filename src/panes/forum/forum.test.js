/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* redux */
jest.mock('../../store');
import store from '../../store';

jest.mock('../../appActions');
import { setSideBarVisible, } from '../../appActions';
setSideBarVisible.mockImplementation(() => {
    return { type: 'setSideBarVisible', };
});

/* components */
import { ForumPane, } from './forum';

/* modules */
jest.mock('../../modules/modals/create');
import create from '../../modules/modals/create';

describe('ForumPane unit tests', () => {
    window.localStorage = {};

    it('renders ForumPane', () => {
        const wrapper = shallow(<ForumPane />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible', () => {
        const wrapper = mount(<ForumPane />);

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('creates an event listener with type message when mounted', () => {
        window.addEventListener = jest.fn();

        const wrapper = mount(<ForumPane />);

        expect(addEventListener.mock.calls.length).toBe(1);
        expect(addEventListener.mock.calls[0][0]).toBe('message');
    });

    it('creates an interval which posts tpmClientSignOut messages to the iframe when mounted', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const wrapper = mount(<ForumPane />);

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

        const wrapper = mount(<ForumPane />);

        const postMessage = jest.fn();
        wrapper.instance().iframe = {
            contentWindow: { postMessage, },
        };

        jest.runTimersToTime(100);

        expect(postMessage.mock.calls.length).toBe(0);
    });

    it('removes the event listener and clear interval with type message when unmounted', () => {
        window.removeEventListener = jest.fn();
        window.clearInterval = jest.fn();

        const wrapper = mount(<ForumPane />);
        wrapper.unmount();

        expect(removeEventListener.mock.calls.length).toBe(1);
        expect(removeEventListener.mock.calls[0][0]).toBe('message');

        expect(clearInterval.mock.calls.length).toBe(1);
    });

    it('breaks nothing when message data type is tpmForumPath and data.href exists', () => {
        const wrapper = shallow(<ForumPane />);

        const message = {
            data: {
                type: 'tpmForumPath',
                href: 'foo',
            },
        };

        wrapper.instance().receiveMessage(message);
    });

    it('handles receiveMessage by clearing the interval if the data type is tpmForumSignedOut', () => {
        window.clearInterval = jest.fn();

        const wrapper = shallow(<ForumPane />);

        const message = {
            data: { type: 'tpmForumSignedOut', },
        };

        wrapper.instance().receiveMessage(message);

        expect(clearInterval.mock.calls.length).toBe(1);
    });

    it('does nothing when message data exists but type is unrecognized', () => {
        const wrapper = shallow(<ForumPane />);

        const message = {
            data: { type: 'unrecognized', },
        };

        wrapper.instance().receiveMessage(message);
    });

    it('does nothing when message.data does not exist or message.data is not an object', () => {
        const wrapper = shallow(<ForumPane />);

        const message = {};

        wrapper.instance().receiveMessage(message);
    });
});