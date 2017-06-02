/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn();

jest.mock('../components/PackageOwned/PackageOwnedActions');
import {
    setPackageEditingMessage,
} from '../components/PackageOwned/PackageOwnedActions';

setPackageEditingMessage.mockImplementation(() => {
    return { type: 'setPackageEditingMessage', };
});

/* modules */
import packageTransferOwnership from './packageTransferOwnership';

jest.mock('./database/post');
import * as post from './database/post';

describe('packageTransferOwnership tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        store.getState.mockClear();
        setPackageEditingMessage.mockClear();
        post.packageOwnershipTransfer.mockClear();
    });

    it('calls action creators correctly', async () => {
        post.packageOwnershipTransfer.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        expect(setPackageEditingMessage.mock.calls.length).toBe(1);
        expect(setPackageEditingMessage.mock.calls[0]).toEqual([
            `Package transfer pending new owner's acceptance.`,
        ]);
    });

    it('calls store.dispatch correctly', async () => {
        post.packageOwnershipTransfer.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setPackageEditingMessage', },
        ]);
    });

    it('clears packageEditingMessage when the message does not change between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.packageOwnershipTransfer.mockImplementationOnce(() => {
            return { status: 200, };
        });

        store.getState.mockImplementationOnce(() => {
            return {
                packageEditingMessage: `Package transfer pending new owner's ` +
                    `acceptance.`,
            };
        });

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();

        expect(setPackageEditingMessage.mock.calls.length).toBe(2);
        expect(setPackageEditingMessage.mock.calls[1]).toEqual([ '', ]);
    });

    it('does not clears packageEditingMessage when the message does change between the creation and execution of the timeout', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.packageOwnershipTransfer.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        jest.runAllTimers();

        expect(setPackageEditingMessage.mock.calls.length).toBe(1);
    });

    it('produces a generic message when !responseObj', async () => {
        post.packageOwnershipTransfer.mockImplementationOnce(() => undefined);

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        expect(setPackageEditingMessage.mock.calls[0]).toEqual([
            'There was an error in receiving or deserializing the server ' +
                'response.',
        ]);
    });

    it('passes the error message received from post.packageOwnershipTransfer', async () => {
        post.packageOwnershipTransfer.mockImplementationOnce(() => {
            return { error: 'testing error!', };
        });

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        expect(setPackageEditingMessage.mock.calls[0]).toEqual([
            'testing error!',
        ]);
    });

    it('produces a generic message when !responseObj.error and responseObj.status !== 200', async () => {
        post.packageOwnershipTransfer.mockImplementationOnce(() => {
            return { status: 400, };
        });

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        expect(setPackageEditingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });

    it('logs exceptions thrown by post.packageOwnershipTransfer', async () => {
        const log = console.log;
        console.log = jest.fn();

        const exception = new Error('uh oh');
        post.packageOwnershipTransfer.mockImplementationOnce(() => {
            throw exception;
        });

        await packageTransferOwnership(store, 12, 'test_owner', 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([ exception, ]);

        console.log = log;
    });
});