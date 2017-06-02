/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn().mockImplementation(() => {
    return {
        profile: {
            packages: [
                { id: 124, },
            ],
        },
    };
});

jest.mock('../panes/profile/profileActions');
import {
    setProfilePackages,
} from '../panes/profile/profileActions';

jest.mock('../components/PackageOwned/PackageOwnedActions');
import {
    setPackagePublishingMessage,
} from '../components/PackageOwned/PackageOwnedActions';

const actionMocks = {
    setProfilePackages,
    setPackagePublishingMessage,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(value => {
        return { type: key, };
    });
});

/* modules */
import packagePublish from './packagePublish';

jest.mock('./database/post');
import * as post from './database/post';

describe('packagePublish tests', () => {
    beforeEach(() => {
        post.packagePublish.mockClear();
        store.dispatch.mockClear();
        Object.keys(actionMocks).forEach(key => {
            actionMocks[key].mockClear();
        });
    });

    it('calls action creators correctly', async () => {
        post.packagePublish.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packagePublish(store, 124, true, 'test_token');

        expect(setProfilePackages.mock.calls.length).toBe(1);
        expect(setProfilePackages.mock.calls[0]).toEqual([
            [
                {
                    id: 124,
                    published: true,
                },
            ],
        ]);

        expect(setPackagePublishingMessage.mock.calls.length).toBe(1);
        expect(setPackagePublishingMessage.mock.calls[0]).toEqual([
            'Package publish state updated successfully.',
        ]);
    });

    it('calls store.dispatch correctly', async () => {
        post.packagePublish.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packagePublish(store, 124, true, 'test_token');

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfilePackages', },
        ]);

        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setPackagePublishingMessage', },
        ]);
    });

    it('logs an error and returns early when the post.packagePublish succeeds but packages cannot be found in state', async () => {
        const log = console.log;
        console.log = jest.fn();

        post.packagePublish.mockImplementationOnce(() => {
            return { status: 200, };
        });

        store.getState.mockImplementationOnce(() => {
            return { profile: {}, };
        });

        await packagePublish(store, 124, true, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('creates a generic error message when !responseObj', async () => {
        post.packagePublish(() => undefined);

        await packagePublish(store, 124, true, 'test_token');

        expect(setPackagePublishingMessage.mock.calls[0]).toEqual([
            'There was an error in receiving or deserializing the server ' +
                'response.',
        ]);
    });

    it('passes the error message received from post.packagePublish', async () => {
        post.packagePublish.mockImplementationOnce(() => {
            return { error: 'testing error!', };
        });

        await packagePublish(store, 124, true, 'test_token');

        expect(setPackagePublishingMessage.mock.calls[0]).toEqual([
            'testing error!',
        ]);
    });

    it('creates a generic error message when !responseObj.error and responseObj.status !== 200', async () => {
        post.packagePublish.mockImplementationOnce(() => {
            return { status: 400, };
        });

        await packagePublish(store, 124, false, 'test_token');

        expect(setPackagePublishingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });

    it('clears packagePublishingMessage when message has not changed between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.packagePublish.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packagePublish(store, 124, false, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {
                packagePublishingMessage: 'Package publish state updated ' +
                    'successfully.',
            };
        });

        jest.runAllTimers();

        expect(setPackagePublishingMessage.mock.calls.length).toBe(2);
        expect(setPackagePublishingMessage.mock.calls[1]).toEqual([ '', ]);
    });

    it('does not clear packagePublishingMessage when message has changed between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.packagePublish(() => {
            return { status: 200, };
        });

        await packagePublish(store, 124, false, 'test_token');

        jest.runAllTimers();

        expect(setPackagePublishingMessage.mock.calls.length).toBe(1);
    });

    it('logs exceptions thrown by post.packagePublish', async () => {
        const log = console.log;
        console.log = jest.fn();

        const exception = new Error('uh oh!!!');
        post.packagePublish.mockImplementationOnce(() => {
            throw exception;
        });

        await packagePublish(store, 124, true, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([ exception, ]);

        console.log = log;
    });

    it('only changes published on packages with matching id', async () => {
        post.packagePublish.mockImplementationOnce(() => {
            return { status: 200, };
        });

        store.getState.mockImplementationOnce(() => {
            return {
                profile: {
                    packages: [
                        { id: 125, },
                        { id: 126, },
                    ],
                },
            };
        });

        await packagePublish(store, 126, false, 'test_token');

        expect(setProfilePackages.mock.calls[0]).toEqual([
            [
                { id: 125, },
                {
                    id: 126,
                    published: false,
                },
            ],
        ]);
    });
});