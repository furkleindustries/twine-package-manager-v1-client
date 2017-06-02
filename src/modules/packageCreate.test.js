/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn().mockImplementation(() => {
    return {
        profile: {
            packages: [],
        },
    };
});

jest.mock('../panes/profile/profileActions');
import {
    setProfilePackages,
} from '../panes/profile/profileActions';

jest.mock('../modals/PackageCreateModal/PackageCreateModalActions');
import {
    setPackageCreatingMessage,
} from '../modals/PackageCreateModal/PackageCreateModalActions';

const actionMocks = {
    setProfilePackages,
    setPackageCreatingMessage,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(value => {
        return { type: key, };
    });
});

/* modules */
import packageCreate from './packageCreate';

jest.mock('./database/post');
import * as post from './database/post';

describe('packageCreate unit tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        post.packageCreation.mockClear();

        Object.keys(actionMocks).forEach(key => {
            actionMocks[key].mockClear();
        });
    });

    it('calls actions creators correctly', async () => {
        post.packageCreation.mockImplementationOnce(() => {
            return { status: 200, };
        });

        const pkg = { test: 'testing', }; 

        await packageCreate(store, pkg, 'test_token');

        expect(setProfilePackages.mock.calls.length).toBe(1);
        expect(setProfilePackages.mock.calls[0]).toEqual([[pkg]]);

        expect(setPackageCreatingMessage.mock.calls.length).toBe(1);
        expect(setPackageCreatingMessage.mock.calls[0]).toEqual([
            'Package created successfully.',
        ]);
    });

    it('calls store.dispatch correctly', async () => {
        post.packageCreation.mockImplementationOnce(() => {
            return { status: 200, };
        });

        const pkg = { test: 'testing', }; 

        await packageCreate(store, pkg, 'test_token');

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfilePackages', },
        ]);

        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setPackageCreatingMessage', },
        ]);
    });

    it('clears packageCreatingMessage if it does not change between creation and execution of timeout', async () => {
        jest.clearAllTimers();
        
        jest.useFakeTimers();

        post.packageCreation.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageCreate(store, {}, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {
                packageCreatingMessage: 'Package created successfully.',
            };
        });

        jest.runAllTimers();

        expect(setPackageCreatingMessage.mock.calls.length).toBe(2);
        expect(setPackageCreatingMessage.mock.calls[1]).toEqual(['']);
    });

    it('does not clear packageCreatingMessage if it changes between creation and execution of timeout', async () => {
        jest.clearAllTimers();
        
        jest.useFakeTimers();

        post.packageCreation.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageCreate(store, {}, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {
                packageCreatingMessage: 'not the same!!!.',
            };
        });

        jest.runAllTimers();

        expect(setPackageCreatingMessage.mock.calls.length).toBe(1);
    });

    it('produces a generic error message when !responseObj', async () => {
        post.packageCreation.mockImplementationOnce(() => undefined);

        await packageCreate(store, {}, 'test_token');

        expect(setPackageCreatingMessage.mock.calls[0]).toEqual([
            'There was an error in receiving or deserializing the server ' +
                'response.',
        ]);
    });

    it('takes the error message passed by post.packageCreation', async () => {
        post.packageCreation.mockImplementationOnce(() => {
            return { error: 'test_error_1', };
        });

        await packageCreate(store, {}, 'test_token');

        expect(setPackageCreatingMessage.mock.calls[0])
            .toEqual(['test_error_1']);
    });

    it('produces a generic error message when !responseObj.error and responseObj.status !== 200', async () => {
        post.packageCreation.mockImplementationOnce(() => {
            return { status: 400, };
        });

        await packageCreate(store, {}, 'test_token');

        expect(setPackageCreatingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });

    it('logs exceptions received from post.packageCreation', async () => {
        const log = console.log;
        console.log = jest.fn();

        const exception = new Error('oh nooo');
        post.packageCreation.mockImplementationOnce(() => {
            throw exception;
        });

        await packageCreate(store, {}, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);

        console.log = log;
    });

    it('logs an error and returns early if packages cannot be found in store', async () => {
        const log = console.log;
        console.log = jest.fn();

        post.packageCreation.mockImplementationOnce(() => {
            return { status: 200, };
        });

        store.getState.mockImplementationOnce(() => {
            return { profile: {}, };
        });

        await packageCreate(store, {}, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);
    });
});