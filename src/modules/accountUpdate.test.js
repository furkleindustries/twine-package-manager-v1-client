/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn();

jest.mock('../panes/profile/profileActions');
import {
    setProfileMessage,
    setProfileRollback,
} from '../panes/profile/profileActions';

setProfileMessage.mockImplementation(value => {
    return {
        message: value,
        type: 'setProfileMessage',
    };
});

setProfileRollback.mockImplementation(value => {
    return {
        rollback: value,
        type: 'setProfileRollback',
    };
});

/* modules */
import accountUpdate from './accountUpdate';

jest.mock('./database/post');
import * as post from './database/post';

describe('accountUpdate unit tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        store.getState.mockClear();
        post.accountUpdate.mockClear();
        setProfileMessage.mockClear();
        setProfileRollback.mockClear();
    });

    it('tests that accountUpdate succeeds with status 200', async () => {
        post.accountUpdate.mockImplementationOnce(() => {
            return { status: 200, };
        });

        store.getState.mockImplementationOnce(() => {
            return {
                profile: {},
            };
        });

        const succeeded = await accountUpdate(store, {}, 'test_token');
        expect(succeeded).toEqual(true);
    });

    it('tests that accountUpdate fails with error', async () => {
        post.accountUpdate.mockImplementationOnce(() => {
            return { error: 'oh no', };
        });

        const succeeded = await accountUpdate(store, {}, 'test_token');
        expect(succeeded).toEqual(false);
    });

    it('tests that accountUpdate fails with status !== 200', async () => {
        post.accountUpdate.mockImplementationOnce(() => {
            return { status: 400, };
        });

        const succeeded = await accountUpdate(store, {}, 'test_token');
        expect(succeeded).toEqual(false);
    });

    it('tests that accountUpdate calls post.accountUpdate correctly', async () => {
        await accountUpdate(store, {}, 'test_token');

        expect(post.accountUpdate.mock.calls.length).toEqual(1);
        expect(post.accountUpdate.mock.calls[0]).toEqual([ {}, 'test_token', ]);
    });

    it('tests that action creators are called correctly when accountUpdate succeeds', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountUpdate.mockImplementationOnce(() => {
            return { status: 200, };
        });

        const profile = {
            testing: 'test',
        };

        store.getState.mockImplementationOnce(() => {
            return { profile, };
        });

        await accountUpdate(store, {}, 'test_token');

        const message = 'Your account has been updated.';

        expect(setProfileMessage.mock.calls.length).toEqual(1);
        expect(setProfileMessage.mock.calls[0]).toEqual([message]);

        expect(setProfileRollback.mock.calls.length).toEqual(1);
        expect(setProfileRollback.mock.calls[0]).toEqual([profile]);

        store.getState.mockImplementationOnce(() => {
            return {
                profileMessage: message,
            };
        });

        jest.runAllTimers();

        expect(setProfileMessage.mock.calls.length).toEqual(2);
        expect(setProfileMessage.mock.calls[1]).toEqual(['']);
    });

    it('tests that action creators are called correctly when accountUpdate fails', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.accountUpdate.mockImplementationOnce(() => undefined);

        await accountUpdate(store, {}, 'test_token');

        const message = 'There was an error in receiving or deserializing ' +
            'the server response.';

        expect(setProfileMessage.mock.calls.length).toEqual(1);
        expect(setProfileMessage.mock.calls[0]).toEqual([message]);

        store.getState.mockImplementationOnce(() => {
            return {
                profileMessage: message,
            };
        });

        jest.runAllTimers();

        expect(setProfileMessage.mock.calls.length).toEqual(2);
        expect(setProfileMessage.mock.calls[1]).toEqual(['']);
    });

    it('tests that store.dispatch is called correctly when accountUpdate succeeds', async () => {
        jest.useFakeTimers();

        post.accountUpdate.mockImplementationOnce(() => {
            return {
                status: 200,
            };
        });

        const profile = {
            testing: 'test',
        };

        store.getState.mockImplementationOnce(() => {
            return { 
                profile,
            };
        });

        await accountUpdate(store, 'a', 'b', 'c');

        expect(store.dispatch.mock.calls.length).toEqual(2);

        const message = 'Your account has been updated.';

        const args1 = [
            {
                message,
                type: 'setProfileMessage',
            },
        ];

        expect(store.dispatch.mock.calls[0]).toEqual(args1);

        const args2 = [
            {
                rollback: profile,
                type: 'setProfileRollback',
            },
        ];

        expect(store.dispatch.mock.calls[1]).toEqual(args2);

        store.getState.mockImplementationOnce(() => {
            return {
                profileMessage: message,
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(3);

        const args3 = [
            {
                message: '',
                type: 'setProfileMessage',  
            },
        ];
        
        expect(store.dispatch.mock.calls[2]).toEqual(args3);
    });

    it('tests that store.dispatch is called correctly when accountUpdate fails', async () => {
        jest.useFakeTimers();

        post.accountUpdate.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountUpdate(store, {}, 'test_token');

        expect(store.dispatch.mock.calls.length).toEqual(1);

        const message = 'The request did not succeed, but there was no ' +
            'message received.';

        const args1 = [
            {
                message,
                type: 'setProfileMessage',
            },
        ];

        expect(store.dispatch.mock.calls[0]).toEqual(args1);

        store.getState.mockImplementationOnce(() => {
            return {
                profileMessage: message,
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(2);

        const args2 = [
            {
                message: '',
                type: 'setProfileMessage',  
            },
        ];
        
        expect(store.dispatch.mock.calls[1]).toEqual(args2);
    });

    it('tests that accountUpdate logs exceptions received from post.accountUpdate', async () => {
        const log = console.log;
        console.log = jest.fn();        

        const exception = new Error('test error!');
        post.accountUpdate.mockImplementationOnce(() => {
            throw exception;
        });

        await accountUpdate(store, {}, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {};
        });

        expect(console.log.mock.calls.length).toEqual(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);

        console.log = log;
    });

    it('dispatches a generic failure message if post.accountUpdate returns falsey', async () => {
        post.accountUpdate.mockImplementationOnce(() => undefined);

        await accountUpdate(store, {}, 'test_token');

        expect(setProfileMessage.mock.calls.length).toEqual(1);
        const message = 'There was an error in receiving or deserializing the ' +
            'server response.';
        expect(setProfileMessage.mock.calls[0]).toEqual([message]);
    });

    it('dispatches the received error message if post.accountUpdate returns an object with an error property', async () => {
        post.accountUpdate.mockImplementationOnce(() => {
            return {
                error: 'testing error',
            };
        });

        await accountUpdate(store, {}, 'test_token');

        expect(setProfileMessage.mock.calls.length).toEqual(1);
        expect(setProfileMessage.mock.calls[0]).toEqual([
            'testing error',
        ]);
    });

    it('dispatches a generic error message if post.accountUpdate returns an object with no error property but a status property !== 200', async () => {
        post.accountUpdate.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await accountUpdate(store, {}, 'test_token');

        expect(setProfileMessage.mock.calls.length).toEqual(1);
        expect(setProfileMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no message received.',
        ]);
    });

    it('does not blank the profileMessage if it has changed since timeout was created', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        await accountUpdate(store, {}, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return {
                profileMessage: 'failing',
            };
        });

        jest.runAllTimers();

        expect(setProfileMessage.mock.calls.length).toEqual(1);
    });
});