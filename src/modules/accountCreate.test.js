/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn();

jest.mock('../modals/AccountCreateModal/AccountCreateModalActions');
import {
    setAccountCreatingName,
    setAccountCreatingPassword,
    setAccountCreatingEmail,
    setAccountCreatingMessage,
} from '../modals/AccountCreateModal/AccountCreateModalActions';

const actionMocks = {
    setAccountCreatingName,
    setAccountCreatingPassword,
    setAccountCreatingEmail,
    setAccountCreatingMessage,
};

Object.keys(actionMocks).forEach((key) => {
    actionMocks[key].mockImplementation(() => {
        return { type: key, };
    });
});

/* modules */
import accountCreate from './accountCreate';

jest.mock('./database/post');
import * as post from './database/post';

describe('accountCreate unit tests', () => {
    beforeEach(() => {
        post.accountCreation.mockClear();
        store.dispatch.mockClear();
        store.getState.mockClear();

        Object.keys(actionMocks).forEach((key) => {
            actionMocks[key].mockClear();
        });
    });

    it('tests that store.dispatch is called correctly when accountCreate succeeds', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountCreation.mockImplementationOnce(() => {
            return {
                status: 200,
            };
        });

        await accountCreate(store, 'a', 'b', 'c');

        expect(store.dispatch.mock.calls.length).toEqual(4);

        const args1 = [ { type: 'setAccountCreatingName', }, ];

        expect(store.dispatch.mock.calls[0]).toEqual(args1);

        const args2 = [ { type: 'setAccountCreatingPassword', }, ];

        expect(store.dispatch.mock.calls[1]).toEqual(args2);

        const args3 = [ { type: 'setAccountCreatingEmail', }, ];

        expect(store.dispatch.mock.calls[2]).toEqual(args3);

        const args4 = [ { type: 'setAccountCreatingMessage', }, ];

        expect(store.dispatch.mock.calls[3]).toEqual(args4);

        store.getState.mockImplementationOnce(() => {
            return {
                accountCreatingMessage: 'Please check your e-mail ' +
                    '(including the spam folder) for the validation e-mail, ' +
                    'then follow the link therein. Your username will be ' +
                    'reserved for 24 hours; if left unvalidated it will ' +
                    'become available to everyone again.',
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(5);

        const args5 = [ { type: 'setAccountCreatingMessage', }, ];
        
        expect(store.dispatch.mock.calls[4]).toEqual(args5);
    });

    it('tests that store.dispatch is called correctly when accountCreate fails', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountCreation.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountCreate(store, 'a', 'b', 'c');

        expect(store.dispatch.mock.calls.length).toEqual(3);

        const args1 = [ { type: 'setAccountCreatingName', }, ];

        expect(store.dispatch.mock.calls[0]).toEqual(args1);

        const args2 = [ { type: 'setAccountCreatingPassword', }, ];

        expect(store.dispatch.mock.calls[1]).toEqual(args2);

        const args3 = [ { type: 'setAccountCreatingMessage', }, ];

        expect(store.dispatch.mock.calls[2]).toEqual(args3);

        store.getState.mockImplementationOnce(() => {
            return {
                accountCreatingMessage: 'The request did not succeed, but ' +
                    'there was no message received.',
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(4);

        const args5 = [ { type: 'setAccountCreatingMessage', }, ];
        
        expect(store.dispatch.mock.calls[3]).toEqual(args5);
    });

    it('tests that accountCreate succeeds with status 200', async () => {
        post.accountCreation.mockImplementationOnce(() => {
            return { status: 200, };
        });

        const succeeded = await accountCreate(
            store,
            'tester',
            'testpassword',
            'tester@test.com');
        expect(succeeded).toEqual(true);
    });

    it('tests that accountCreate fails with error', async () => {
        post.accountCreation.mockImplementationOnce(() => {
            return { error: 'oh no', };
        });

        const succeeded = await accountCreate(
            store,
            'tester',
            'testpassword',
            'tester@test.com');
        expect(succeeded).toEqual(false);
    });

    it('tests that accountCreate fails with status !== 200', async () => {
        post.accountCreation.mockImplementationOnce(() => {
            return { status: 400, };
        });

        const succeeded = await accountCreate(
            store,
            'tester',
            'testpassword',
            'tester@test.com');
        expect(succeeded).toEqual(false);
    });

    it('tests that accountCreate calls post.accountCreation correctly', async () => {
        await accountCreate(store, 'a', 'b', 'c');

        expect(post.accountCreation.mock.calls.length).toEqual(1);
        expect(post.accountCreation.mock.calls[0]).toEqual(['a', 'b', 'c']);
    });

    it('tests that action creators are called correctly when accountCreate succeeds', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountCreation.mockImplementationOnce(() => {
            return { status: 200, };
        });

        await accountCreate(store, 'a', 'b', 'c');

        expect(setAccountCreatingName.mock.calls.length).toEqual(1);
        expect(setAccountCreatingName.mock.calls[0]).toEqual(['']);

        expect(setAccountCreatingPassword.mock.calls.length).toEqual(1);
        expect(setAccountCreatingPassword.mock.calls[0]).toEqual(['']);

        expect(setAccountCreatingEmail.mock.calls.length).toEqual(1);
        expect(setAccountCreatingEmail.mock.calls[0]).toEqual(['']);

        const message = 'Please check your e-mail ' +
            '(including the spam folder) for the validation e-mail, ' +
            'then follow the link therein. Your username will be ' +
            'reserved for 24 hours; if left unvalidated it will ' +
            'become available to everyone again.';

        expect(setAccountCreatingMessage.mock.calls.length).toEqual(1);
        expect(setAccountCreatingMessage.mock.calls[0]).toEqual([message]);

        store.getState.mockImplementationOnce(() => {
            return {
                accountCreatingMessage: message,
            };
        });

        jest.runAllTimers();

        expect(setAccountCreatingMessage.mock.calls.length).toEqual(2);
        expect(setAccountCreatingMessage.mock.calls[1]).toEqual(['']);
    });

    it('tests that action creators are called correctly when accountCreate fails', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountCreation.mockImplementationOnce(() => null);

        await accountCreate(store, 'a', 'b', 'c');

        expect(setAccountCreatingName.mock.calls.length).toEqual(1);
        expect(setAccountCreatingName.mock.calls[0]).toEqual(['']);

        expect(setAccountCreatingPassword.mock.calls.length).toEqual(1);
        expect(setAccountCreatingPassword.mock.calls[0]).toEqual(['']);

        const message = 'There was an error in receiving or deserializing ' +
            'the server response.';

        expect(setAccountCreatingMessage.mock.calls.length).toEqual(1);
        expect(setAccountCreatingMessage.mock.calls[0]).toEqual([message]);

        store.getState.mockImplementationOnce(() => {
            return {
                accountCreatingMessage: message,
            };
        });

        jest.runAllTimers();

        expect(setAccountCreatingMessage.mock.calls.length).toEqual(2);
        expect(setAccountCreatingMessage.mock.calls[1]).toEqual(['']);
    });

    it('tests that the account creating message is not cleared if it does not match the constructed message', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountCreation.mockImplementationOnce(() => ({ status: 200, }));

        await accountCreate(store, 'a', 'b', 'c');

        store.getState.mockImplementationOnce(() => (
            { accountCreatingMessage: 'this is different', }
        ));

        jest.runAllTimers();

        /* does not call store.dispatch in timer */
        expect(store.dispatch.mock.calls.length).toBe(4);
    });

    it('tests that accountCreate logs exceptions received from post.accountCreation', async () => {
        const log = console.log;
        console.log = jest.fn();        

        const exception = new Error('test error!');
        post.accountCreation.mockImplementationOnce(() => {
            throw exception;
        });

        await accountCreate(store, 'foo', 'bar', 'baz');

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        expect(console.log.mock.calls.length).toEqual(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);

        console.log = log;
    });

    it('dispatches a generic failure message if post.accountCreation returns falsey', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountCreation.mockImplementationOnce(() => null);

        await accountCreate(store, 'foo', 'bar', '__testing');

        expect(setAccountCreatingMessage.mock.calls.length).toEqual(1);
        const message = 'There was an error in receiving or deserializing the ' +
            'server response.';
        expect(setAccountCreatingMessage.mock.calls[0]).toEqual([message]);

        store.getState = jest.fn().mockImplementation(() => {
            return {
                accountCreatingMessage: message,
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(4);
        expect(store.dispatch.mock.calls[3]).toEqual([
            {
                type: 'setAccountCreatingMessage',
            },
        ]);
    });

    it('dispatches the received error message if post.accountCreation returns an object with an error property', async () => {
        post.accountCreation.mockImplementationOnce(() => {
            return {
                error: 'testing error',
            };
        });

        await accountCreate(store, 'foo', 'bar', 'baz');

        expect(setAccountCreatingMessage.mock.calls.length).toEqual(1);
        expect(setAccountCreatingMessage.mock.calls[0]).toEqual([
            'testing error',
        ]);
    });

    it('dispatches a generic error message if post.accountCreation returns an object with no error property but a status property !== 200', async () => {
        post.accountCreation.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountCreate(store, 'foo', 'bar', 'baz');

        expect(setAccountCreatingMessage.mock.calls.length).toEqual(1);
        expect(setAccountCreatingMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });
});