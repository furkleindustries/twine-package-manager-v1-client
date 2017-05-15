/* redux */
jest.mock('../store');
import store from '../store';

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
        loginMessage: value,
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

        expect(await login('username', 'password')).toBe(true);
    });

    it('tests that login returns false when unsuccessful', async () => {
        post.login.mockImplementationOnce(() => {
            return {
                status: 400,
            };
        });

        expect(await login('fail_user', 'fail_pass')).toBe(false);
    });

    it('calls relevant methods when login is successful', async () => {
        post.login.mockImplementationOnce(() => {
            return {
                status: 200,
                csrfToken: 'test_token',
            };
        });

        await login('username', 'password');

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
            'test_token',
            'gotoProfile'
        ]);
    });

    it('calls relevant methods when login is unsuccessful', () => {

    });

    it('logs exceptions received from post.login', () => {
        const exception = new Error('oh no!');
        post.login.mockImplementationOnce(() => {
            throw exception;
        });

        console.log = jest.fn();

        login('user', 'pass');

        expect(console.log.mock.calls.length).toEqual(1);
        expect(console.log.mock.calls[0]).toEqual([exception]);
    });
});