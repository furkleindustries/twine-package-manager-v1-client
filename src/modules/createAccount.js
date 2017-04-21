import 'whatwg-fetch';

// redux
import store from '../store';
import  {
	setAccountCreatingError,
} from '../modals/AccountCreateModal/AccountCreateModalActions';

// modules
import modalClose from './modalClose';

export default function createAccount(name, password, email) {
	const formData = new FormData();
	formData.append('name', name);
	formData.append('password', password);
	formData.append('email', email);

	fetch('https://furkleindustries.com/twinepm/login/createAccount.php', {
		method: 'POST',
		body: formData,
	}).then(response => {
		return response.json();
	}).catch(e => {
		const error = 'Unknown error.'
		store.dispatch(setAccountCreatingError(error));

		setTimeout(() => {
			if (store.getState().accountCreatingError === error) {
				store.dispatch(setAccountCreatingError(''));
			}
		}, 6000);

		// don't allow execution to continue
		return Promise.reject();
	}).then(responseObj => {
		if (responseObj.error) {
			store.dispatch(setAccountCreatingError(responseObj.error));

			setTimeout(() => {
				if (store.getState().accountCreatingError === responseObj.error) {
					store.dispatch(setAccountCreatingError(''));
				}
			}, 6000);

			return Promise.reject();
		} else if (responseObj.status !== 200) {
			const error = 'The request did not succeed, but there was ' +
				'error message received.';
			store.dispatch(setAccountCreatingError(error));

			setTimeout(() => {
				if (store.getState().accountCreatingError === error) {
					store.dispatch(setAccountCreatingError(''));
				}
			}, 6000);

			return Promise.reject();
		}

		store.dispatch(setAccountCreatingError('Please check your e-mail ' +
			'(including the spam folder) for the validation e-mail, then ' +
			'follow the link therein. Your username will be reserved for 24 ' +
			'hours; if left unvalidated it will become available to everyone again.'));

		setTimeout(() => {
			modalClose();
			store.dispatch(setAccountCreatingError(''));
		}, 6000)
	});
}