import 'whatwg-fetch';

// redux
import store from '../store';
import { setCSRFToken } from '../appActions';
import {
    setLoginError,
} from '../panes/login/loginActions';

// modules
import renderLogin from './renderLogin';

export default function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('https://furkleindustries.com/twinepm/login/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    }).catch(xhr => {
        try {
            const responseObj = JSON.parse(xhr.responseText);
            store.dispatch(setLoginError(responseObj.error || 'Unknown error.'));

            setTimeout(() => {
                const loginError = store.getState().loginError;
                if (loginError === responseObj.error ||
                    loginError === 'Unknown error')
                {
                    store.dispatch(setLoginError(''));
                }
            }, 6000);
        } catch (err) {
            store.dispatch(setLoginError('Unknown error.'));

            setTimeout(() => {
                if (store.getState().loginError === 'Unknown error.') {
                    store.dispatch(setLoginError(''));
                }
            }, 6000);
        }

        // don't allow execution to continue
        return Promise.reject();
    }).then(response => {
        return response.json();
    }).catch(e => {
        const message = 'Error deserializing anti-CSRF token. ' +
            e.message;
        store.dispatch(setLoginError(message));

        setTimeout(() => {
            if (store.getState().loginError === message) {
                store.dispatch(setLoginError(''));
            }
        }, 6000);

        return Promise.reject();
    }).then(responseObj => {
        if (responseObj.error || responseObj.status !== 200) {
            const message = responseObj.error || 'Unknown error logging in.';
            store.dispatch(setLoginError(message));

            setTimeout(() => {
                if (store.getState().loginError === message) {
                    store.dispatch(setLoginError(''));
                }
            }, 6000);

            return Promise.reject();
        }

        store.dispatch(setCSRFToken(responseObj.csrfToken));

        localStorage.twinepmCSRFToken = responseObj.csrfToken;

        renderLogin(true);
    });
}