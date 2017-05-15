/* redux */
jest.mock('../store');
import store from '../store';

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
        _delete.account.mockClear();
        store.dispatch.mockClear();
        setAccountDeletingMessage.mockClear();
        logout.mockClear();
    });

    /* Don't know exactly why, but these tests only pass when placed at the
     * top. It seems to have something to do with the timeout-spawned actions
     * from the action creator/store.dispatch success tests spilling over 
     * into the failure tests, despite calling jest.useFakeTimers and 
     * jest.runAllTimers in every test. Will submit to the Jest github soon. */
    it('tests that action creators are called correctly when accountDelete fails', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => undefined);

        await accountDelete(1, 'a');

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
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountDelete(1, 'a');

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
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { status: 200, };
        });

        const succeeded = await accountDelete(124, 'test_token');
        expect(succeeded).toEqual(true);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('tests that accountDelete fails with error', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { error: 'oh no', };
        });

        const succeeded = await accountDelete(125, 'test_token');
        expect(succeeded).toEqual(false);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('tests that accountDelete fails with status !== 200', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { status: 400, };
        });

        const succeeded = await accountDelete(126, 'test_token');
        expect(succeeded).toEqual(false);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('tests that accountDelete calls _delete.account correctly', async () => {
        jest.useFakeTimers();

        await accountDelete(1, 'a');

        expect(_delete.account.mock.calls.length).toEqual(1);
        expect(_delete.account.mock.calls[0]).toEqual([1, 'a']);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('tests that accountDelete calls logout on success', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await accountDelete(1, 'a');

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();

        expect(logout.mock.calls.length).toEqual(1);
        expect(logout.mock.calls[0]).toEqual([null, 'skipServer']);
    });

    it('tests that action creators are called correctly when accountDelete succeeds', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await accountDelete(1, 'a');

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
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return {
                status: 200,
            };
        });

        await accountDelete(1, 'a');

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
        jest.useFakeTimers();

        console.log = jest.fn();        

        const exception = new Error('test error!');
        _delete.account.mockImplementationOnce(() => {
            throw exception;
        });

        await accountDelete(1, 'a');

        jest.runAllTimers();

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        expect(console.log.mock.calls.length).toEqual(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);
    });

    it('dispatches a generic failure message if _delete.account returns falsey', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => undefined);

        await accountDelete(1, 'a');

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        const message = 'There was an error in receiving or deserializing ' +
            'the server response.';
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([message]);       

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('dispatches the received error message if _delete.account returns an object with an error property', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return {
                error: 'testing error',
            };
        });

        await accountDelete(1, 'a');

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([
            'testing error',
        ]);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });

    it('dispatches a generic error message if _delete.account returns an object with no error property but a status property !== 200', async () => {
        jest.useFakeTimers();

        _delete.account.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountDelete(1, 'a');

        expect(setAccountDeletingMessage.mock.calls.length).toEqual(1);
        expect(setAccountDeletingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        jest.runAllTimers();
    });
});