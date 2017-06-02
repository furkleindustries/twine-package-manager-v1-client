/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn();

jest.mock('../appActions');
import { setCSRFToken, } from '../appActions';
setCSRFToken.mockImplementation(value => {
    return {
        csrfToken: value,
        type: 'setCSRFToken',
    };
});

jest.mock('../panes/login/loginActions');
import { setLoginMessage, } from '../panes/login/loginActions';
setLoginMessage.mockImplementation(value => {
    return {
        message: value,
        type: 'setLoginMessage',
    };
});

/* modules */
import login from './login';

jest.mock('./database/post');
import * as post from './database/post';

jest.mock('./loginRender');
import loginRender from './loginRender';

describe('login unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();
        store.getState.mockClear();
        setCSRFToken.mockClear();
        setLoginMessage.mockClear();
        loginRender.mockClear();
    });

    it('tests that login returns true when successful', async () => {
        post.login.mockImplementationOnce(() => {
            return {
                status: 200,
                csrfToken: 'test_token',
            };
        });

        expect(await login(store, 'username', 'password')).toBe(true);
    });

    it('tests that login returns false when unsuccessful', async () => {
        post.login.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        expect(await login(store, 'fail_user', 'fail_pass')).toBe(false);
    });

    it('calls relevant methods when login is successful', async () => {
        post.login.mockImplementationOnce(() => {
            return {
                status: 200,
                csrfToken: 'test_token',
            };
        });

        await login(store, 'username', 'password');

        expect(localStorage.twinepmCSRFToken).toBe('test_token');
        
        expect(setCSRFToken.mock.calls.length).toBe(1);
        expect(setCSRFToken.mock.calls[0]).toEqual(['test_token']);
        
        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                csrfToken: 'test_token',
                type: 'setCSRFToken',
            }
        ]);

        expect(loginRender.mock.calls.length).toBe(1);
        expect(loginRender.mock.calls[0]).toEqual([
            store,
            'test_token',
            'gotoProfile'
        ]);
    });

    it('calls relevant methods when login is unsuccessful', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.login.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        await login(store, 'user', 'pass');

        const message = 'Unknown error.';

        expect(setLoginMessage.mock.calls.length).toBe(1);
        expect(setLoginMessage.mock.calls[0]).toEqual([ message, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                message,
                type: 'setLoginMessage',
            },
        ]);

        store.getState.mockImplementationOnce(() => {
            return {
                loginMessage: message,
            };
        });

        jest.runAllTimers();

        expect(setLoginMessage.mock.calls.length).toBe(2);
        expect(setLoginMessage.mock.calls[1]).toEqual([ '', ]);

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[1]).toEqual([
            {
                message: '',
                type: 'setLoginMessage',
            },
        ]);
    });

    it('logs exceptions received from post.login', () => {
        const exception = new Error('oh no!');
        post.login.mockImplementationOnce(() => {
            throw exception;
        });

        console.log = jest.fn();

        login(store, 'user', 'pass');

        expect(console.log.mock.calls.length).toEqual(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);
    });

    it('sets the loginMessage to the error property received in the response', async () => {
        post.login.mockImplementationOnce(() => {
            return {
                status: 400,
                error: 'test error',
            };
        });

        await login(store, 'user', 'pass');

        expect(setLoginMessage.mock.calls[0]).toEqual(['test error']);
    });

    it('does not set loginMessage if the message has changed since the timeout was created', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        post.login.mockImplementationOnce(() => {
            return {
                status: 400,
                error: 'foo',
            };
        });

        await login(store, 'username', 'password');

        store.getState.mockImplementationOnce(() => {
            return {
                loginMessage: 'not foo',
            };
        });

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toBe(1);
    });
});