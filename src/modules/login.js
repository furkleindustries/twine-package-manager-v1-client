// redux
import store from '../store';
import { setCSRFToken, } from '../appActions';
import { setLoginMessage, } from '../panes/login/loginActions';

//  modules
import * as post from './database/post';
import loginRender from './loginRender';

export default async function login(username, password) {
	let result;
	try {
		result = await post.login(username, password);
	} catch (e) {
		console.log(e);
	}

	let successful = false;

	if (result && result.antiCSRFToken) {
		localStorage.twinepmCSRFToken = result.antiCSRFToken;
		store.dispatch(setCSRFToken(result.antiCSRFToken));
		loginRender(result.antiCSRFToken, 'gotoProfile');
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