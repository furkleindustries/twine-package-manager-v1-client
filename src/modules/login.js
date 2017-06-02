/* redux */
import { setCSRFToken, } from '../appActions';
import { setLoginMessage, } from '../panes/login/loginActions';

/* modules */
import * as post from './database/post';
import loginRender from './loginRender';

export default async function login(store, username, password) {
	let result;
	try {
		result = await post.login(username, password);
	} catch (e) {
		console.log(e);
	}

	let successful = false;

	if (result && result.csrfToken) {
		localStorage.twinepmCSRFToken = result.csrfToken;
		store.dispatch(setCSRFToken(result.csrfToken));
		loginRender(store, result.csrfToken, 'gotoProfile');
		successful = true;
	} else {
		let error;
		if (!result || !result.error) {
			error = 'Unknown error.';
		} else {
			error = result.error;
		}

		store.dispatch(setLoginMessage(error));
		setTimeout(() => {
			if (store.getState().loginMessage === error) {
				store.dispatch(setLoginMessage(''));
			}
		}, 6000);
	}

	return successful;
}