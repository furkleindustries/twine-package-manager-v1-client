/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn();

jest.mock('../modals/AccountDeleteModal/AccountDeleteModalActions');
import {
    setAccountDeletingMessage,
} from '../modals/AccountDeleteModal/AccountDeleteModalActions';

setAccountDeletingMessage.mockImplementation(value => {
    return {
        message: value,
        type: 'setAccountDeletingMessage',
    };
});

/* modules */
import accountDelete from './accountDelete';

jest.mock('./logout');
import logout from './logout';

jest.mock('./database/delete');
import * as _delete from './database/delete';

describe('accountDelete unit tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        store.getState.mockClear();
        _delete.account.mockClear();
        setAccountDeletingMessage.mockClear();
        logout.mockClear();
    });

    

    it('tests that action creators are called correctly when accountDelete fails', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => undefined);

        await accountDelete(store, 1, 'a');

        const message = 'There was an error in receiving or deserializing ' +
            'the server response.';

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([message]);

        store.getState.mockImplementationOnce(() => {
            return {
                accountDeletingMessage: message,
            };
        });

        jest.runAllTimers();

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(2);
        expect(setAccountDeletingMessage.mock.calls[1]).toEqual(['']);
    });

    it('tests that store.dispatch is called correctly when accountDelete fails', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountDelete(store, 1, 'a');

        expect(store.dispatch.mock.calls.length).toEqual(1);

        const message = 'The request did not succeed, but there was no ' +
            'message received.';

        const args1 = [
            {
                message,
                type: 'setAccountDeletingMessage',
            },
        ];

        expect(store.dispatch.mock.calls[0]).toEqual(args1);

        store.getState.mockImplementationOnce(() => {
            return {
                accountDeletingMessage: message,
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(2);

        const args2 = [
            {
                message: '',
                type: 'setAccountDeletingMessage',  
            },
        ];
        
        expect(store.dispatch.mock.calls[1]).toEqual(args2);
    });

    it('tests that accountDelete succeeds with status 200', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { status: 200, };
        });

        const succeeded = await accountDelete(store, 124, 'test_token');
        expect(succeeded).toEqual(true);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('tests that accountDelete fails with error', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { error: 'oh no', };
        });

        const succeeded = await accountDelete(store, 125, 'test_token');
        expect(succeeded).toEqual(false);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('tests that accountDelete fails with status !== 200', async () => {
        _delete.account.mockImplementationOnce(() => {
            return { status: 400, };
        });

        const succeeded = await accountDelete(store, 126, 'test_token');
        expect(succeeded).toEqual(false);
    });

    it('tests that accountDelete calls _delete.account correctly', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        await accountDelete(store, 1, 'a');

        expect(_delete.account.mock.calls.length).toEqual(1);
        expect(_delete.account.mock.calls[0]).toEqual([1, 'a']);
    });

    it('tests that accountDelete calls logout on success', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await accountDelete(store, 1, 'a');

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();

        expect(logout.mock.calls.length).toEqual(1);
        expect(logout.mock.calls[0]).toEqual([ store, null, 'skipServer', ]);
    });

    it('tests that action creators are called correctly when accountDelete succeeds', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await accountDelete(store, 1, 'a');

        const message = 'Your account has been deleted.';

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([message]);

        store.getState.mockImplementationOnce(() => {
            return {
                accountDeletingMessage: message,
            };
        });

        jest.runAllTimers();

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(2);
        expect(setAccountDeletingMessage.mock.calls[1]).toEqual(['']);
    });

    it('tests that store.dispatch is called correctly when accountDelete succeeds', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return {
                status: 200,
            };
        });

        await accountDelete(store, 1, 'a');

        expect(store.dispatch.mock.calls.length).toEqual(1);

        const message = 'Your account has been deleted.';

        const args1 = [
            {
                message,
                type: 'setAccountDeletingMessage',
            },
        ];

        expect(store.dispatch.mock.calls[0]).toEqual(args1);

        store.getState.mockImplementationOnce(() => {
            return {
                accountDeletingMessage: message,
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(2);

        const args2 = [
            {
                message: '',
                type: 'setAccountDeletingMessage',  
            },
        ];
        
        expect(store.dispatch.mock.calls[1]).toEqual(args2);
    });

    it('tests that accountDelete logs exceptions received from _delete.account', async () => {
        const log = console.log;
        console.log = jest.fn();        

        const exception = new Error('test error!');
        _delete.account.mockImplementationOnce(() => {
            throw exception;
        });

        await accountDelete(store, 1, 'a');

        expect(console.log.mock.calls.length).toEqual(1);
        expect(console.log.mock.calls[0]).toEqual([ exception, ]);
    });

    it('dispatches a generic failure message if _delete.account returns falsey', async () => {
        _delete.account.mockImplementationOnce(() => null);

        await accountDelete(store, 1, 'a');

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        const message = 'There was an error in receiving or deserializing ' +
            'the server response.';
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([message]);
    });

    it('dispatches the received error message if _delete.account returns an object with an error property', async () => {
        _delete.account.mockImplementationOnce(() => {
            return {
                error: 'testing error',
            };
        });

        await accountDelete(store, 1, 'a');

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([
            'testing error',
        ]);
    });

    it('dispatches a generic error message if _delete.account returns an object with no error property but a status property !== 200', async () => {
        _delete.account.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountDelete(store, 1, 'a');

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });
});