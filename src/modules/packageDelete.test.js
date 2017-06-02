/* redux */
const store = {};
store.dispatch = jest.fn();

const testPackage = {
    id: 10,
    test: '_testing',
};

store.getState = jest.fn().mockImplementation(() => (
    {
        profile: {
            packages: [ testPackage, ],
        },
    }
));

jest.mock('../panes/profile/profileActions');
import {
    setProfilePackages,
} from '../panes/profile/profileActions';

jest.mock('../components/PackageOwned/PackageOwnedActions');
import {
    setPackageDeletingMessage,
} from '../components/PackageOwned/PackageOwnedActions';

const actionMocks = {
    setProfilePackages,
    setPackageDeletingMessage,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(value => {
        return { type: key, };
    });
});

/* modules */
import packageDelete from './packageDelete';

jest.mock('./database/delete');
import * as _delete from './database/delete';

describe('packageDelete unit tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        setProfilePackages.mockClear();
        setPackageDeletingMessage.mockClear();
        _delete._package.mockClear();
    });

    it('calls action creators correctly', async () => {
        _delete._package.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageDelete(store, 10, 'test_token');

        expect(setProfilePackages.mock.calls.length).toBe(1);
        expect(setProfilePackages.mock.calls[0]).toEqual([[]]);

        expect(setPackageDeletingMessage.mock.calls.length).toBe(1);
        expect(setPackageDeletingMessage.mock.calls[0]).toEqual([
            'Package deleted successfully.',
        ]);
    });

    it('calls store.dispatch correctly', async () => {
        _delete._package.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageDelete(store, 10, 'test_token');

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfilePackages', },
        ]);

        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setPackageDeletingMessage', },
        ]);
    });

    it('clears packageDeletingMessage if the message has not changed between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();

        jest.useFakeTimers();

        _delete._package.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageDelete(store, 10, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {
                packageDeletingMessage: 'Package deleted successfully.',
            };
        });

        jest.runAllTimers();

        expect(setPackageDeletingMessage.mock.calls.length).toBe(2);
        expect(setPackageDeletingMessage.mock.calls[1]).toEqual(['']);
    });

    it('does not clear packageDeletingMessage if the message has changed between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();

        jest.useFakeTimers();

        _delete._package.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageDelete(store, 10, 'test_token');

        jest.runAllTimers();

        expect(setPackageDeletingMessage.mock.calls.length).toBe(1);
    });

    it('creates a generic message when !responseObj', async () => {
        _delete._package.mockImplementationOnce(() => undefined);

        await packageDelete(store, 10, 'test_token');

        expect(setPackageDeletingMessage.mock.calls[0]).toEqual([
            'There was an error in receiving or deserializing the server ' +
                'response.',
        ]);
    });

    it('passes the error received from _delete._package', async () => {
        _delete._package.mockImplementationOnce(() => {
            return { error: 'testing error', };
        });

        await packageDelete(store, 10, 'test_token');

        expect(setPackageDeletingMessage.mock.calls[0]).toEqual([
            'testing error',
        ]);
    });

    it('creates a generic message when !responseObj.error and responseObj.status !== 200', async () => {
        _delete._package.mockImplementationOnce(() => {
            return { status: 400, };
        });

        await packageDelete(store, 10, 'test_token');

        expect(setPackageDeletingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });

    it('logs a message and returns early if packages cannot be found in state', async () => {
        const log = console.log;
        console.log = jest.fn();

        _delete._package.mockImplementationOnce(() => {
            return { status: 200, };
        });

        store.getState.mockImplementationOnce(() => {
            return { profile: {}, };
        });

        await packageDelete(store, 10, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('logs a message and returns early if a package with id property matching the id argument is not found in packages', async () => {
        const log = console.log;
        console.log = jest.fn();

        _delete._package.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageDelete(store, 11, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('logs exceptions received from _delete._package', async () => {
        const log = console.log;
        console.log = jest.fn();

        const exception = new Error('uh oh!');
        _delete._package.mockImplementationOnce(() => {
            throw exception;
        });

        await packageDelete(store, 10, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);

        console.log = log;
    });
});