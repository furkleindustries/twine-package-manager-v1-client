// redux
import store from '../store';
import { setAccountDeletingError, } from '../modals/AccountDeleteModal/AccountDeleteModalActions'; 

// modules
import logout from './logout';
import modalClose from './modalClose';

export default function deleteAccount() {
	const state = store.getState();

	const params = {
		id: state.profile.id,
		csrfToken: state.csrfToken,
	};

	fetch('https://furkleindustries.com/twinepm/userdata/', {
		method: 'DELETE',
		body: JSON.stringify(params),
		credentials: 'include',
	}).then(response => {
		return response.json();
	}).catch(e => {
		const error = 'Unknown error.';
		store.dispatch(setAccountDeletingError(error));

		setTimeout(() => {
			if (store.getState().accountDeletingError === error) {
				store.dispatch(setAccountDeletingError(''))
			}
		}, 6000);

		// don't allow execution to continue
		return Promise.reject();
	}).then(responseObj => {
		if (responseObj.error) {
			store.dispatch(setAccountDeletingError(responseObj.error));

			setTimeout(() => {
				if (store.getState().accountDeletingError === responseObj.error) {
					store.dispatch(setAccountDeletingError(''));
				}
			}, 6000);

			return Promise.reject();
		} else if (responseObj.status !== 200) {
			const error = 'The request did not succeed, but there was ' +
				'error message received.';
			store.dispatch(setAccountDeletingError(error));

			setTimeout(() => {
				if (store.getState().accountDeletingError === error) {
					store.dispatch(setAccountDeletingError(''));
				}
			}, 6000);

			return Promise.reject();
		}

		store.dispatch(setAccountDeletingError('Your account has been deleted.'));

		setTimeout(() => {
			modalClose();
			logout();
			store.dispatch(setAccountDeletingError(''));
		}, 2000)
	});
}