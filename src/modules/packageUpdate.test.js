/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn().mockImplementation(() => {
    return {
        profile: {
            packages: [
                { id: 156, },
                { id: 157, },
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
    setPackageEditingDateModified,
    setPackageEditingMessage,
} from '../components/PackageOwned/PackageOwnedActions';

const actionMocks = {
    setProfilePackages,
    setPackageEditingDateModified,
    setPackageEditingMessage,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(value => {
        return { type: key, };
    });
});

/* modules */
import packageUpdate from './packageUpdate';

jest.mock('./database/post');
import * as post from './database/post';

describe('packageUpdate tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        post.packageUpdate.mockClear();

        Object.keys(actionMocks).forEach(key => {
            actionMocks[key].mockClear();
        });
    });

    it('calls action creators correctly', async () => {
        post.packageUpdate.mockImplementationOnce(() => {
            return {
                status: 200,
                dateModified: 12,
            };
        });

        const pkg = {
            id: 157,
            testProp: 'test',
        };

        await packageUpdate(store, pkg, 'test_token');

        expect(setPackageEditingDateModified.mock.calls.length).toBe(1);
        expect(setPackageEditingDateModified.mock.calls[0]).toEqual([ 12, ]);

        expect(setProfilePackages.mock.calls.length).toBe(1);
        expect(setProfilePackages.mock.calls[0]).toEqual([
            [
                { id: 156, },
                {
                    id: 157,
                    testProp: 'test',
                },
            ],
        ]);

        expect(setPackageEditingMessage.mock.calls.length).toBe(1);
        expect(setPackageEditingMessage.mock.calls[0]).toEqual([
            'Package updated successfully.',
        ]);
    });

    it('calls store.dispatch correctly', async () => {
        post.packageUpdate.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageUpdate(store, {}, 'test_token');

        expect(store.dispatch.mock.calls.length).toBe(3);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setPackageEditingDateModified', },
        ]);

        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setProfilePackages', }
        ]);

        expect(store.dispatch.mock.calls[2]).toEqual([
            { type: 'setPackageEditingMessage', },
        ]);
    });

    it('clears packageEditingMessage when the message does not change between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.packageUpdate.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageUpdate(store, {}, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {
                packageEditingMessage: 'Package updated successfully.',
            };
        });

        jest.runAllTimers();

        expect(setPackageEditingMessage.mock.calls.length).toBe(2);
        expect(setPackageEditingMessage.mock.calls[1]).toEqual([ '', ]);
    });

    it('does not clear packageEditingMessage when the message changes between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.packageUpdate.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageUpdate(store, {}, 'test_token');

        jest.runAllTimers();

        expect(setPackageEditingMessage.mock.calls.length).toBe(1);
    });

    it('produces a generic error message when !responseObj', async () => {
        post.packageUpdate.mockImplementationOnce(() => undefined);

        await packageUpdate(store, {}, 'test_token');

        expect(setPackageEditingMessage.mock.calls[0]).toEqual([
            'There was an error in receiving or deserializing the server ' +
                'response.',
        ]);
    });

    it('passes the error created by post.packageUpdate', async () => {
        post.packageUpdate.mockImplementationOnce(() => {
            return { error: 'testing', };
        });

        await packageUpdate(store, {}, 'test_token');

        expect(setPackageEditingMessage.mock.calls[0]).toEqual([ 'testing', ]);
    });

    it('produces a generic message when !responseObj.error and responseObj.status !== 200', async () => {
        post.packageUpdate.mockImplementationOnce(() => {
            return { status: 400, };
        });

        await packageUpdate(store, {}, 'test_token');

        expect(setPackageEditingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });

    it('logs a message and returns early if packages cannot be found in state', async () => {
        const log = console.log;
        console.log = jest.fn();

        post.packageUpdate.mockImplementationOnce(() => {
            return { status: 200, };
        });

        store.getState.mockImplementationOnce(() => {
            return { profile: {}, };
        });

        await packageUpdate(store, {}, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('logs exceptions received from post.packageUpdate', async () => {
        const log = console.log;
        console.log = jest.fn();

        const exception = new Error('oh dear!');
        post.packageUpdate.mockImplementationOnce(() => {
            throw exception;
        });

        await packageUpdate(store, {}, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([ exception, ]);

        console.log = log;
    });
});