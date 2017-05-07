// redux
import store from '../../store';

import {
	setProfilePackages,
} from '../../panes/profile/profileActions';

import {
	setPackageRemovingError,
} from '../../components/PackageOwned/PackageOwnedActions';

import {
	setAccountDeletingError,
} from '../../modals/AccountDeleteModal/AccountDeleteModalActions'; 

// modules
import deepCopy from '../deepCopy';
import * as modalClose from '../modals/close';
import * as post from './post';

export async function account(id, csrfToken) {
	const params = {
		id,
		csrfToken,
	};

	return await fetch('https://furkleindustries.com/twinepm/userdata/', {
		method: 'DELETE',
		body: JSON.stringify(params),
		credentials: 'include',
	}).then(response => {
		return response.json();
	});
}

export function _package(id) {
	const params = {
		id,
		csrfToken: store.getState().csrfToken,
	};

	fetch('https://furkleindustries.com/twinepm/package/', {
		method: 'DELETE',
		credentials: 'include',
		body: JSON.stringify(params),
	}).then(response => {
		return response.json();
	}).catch(e => {
		const error = 'The request succeeded, but the response could ' +
			'not be deserialized.';
		store.dispatch(setPackageRemovingError(error));

		setTimeout(() => {
			if (store.getState().packageRemovingError === error) {
				store.dispatch(setPackageRemovingError(''));
			}
		}, 6000);

		return Promise.reject();
	}).then(responseObj => {
		if (!responseObj.error && responseObj.status === 200) {
			const packageId = this.props.id;
			if (!packageId) {
				console.log('Could not find package ID.');
				return;
			}

			let packages = deepCopy(store.getState().profile.packages);
			if (!packages) {
				console.log('Could not find packages in store.');
				return;
			}

			const oldLength = packages.length;

			packages = packages.filter(pkg => pkg.id !== packageId);

			const newLength = packages.length;

			if (newLength !== oldLength - 1) {
				console.log('Could not find package with id ' + packageId +
					'in the store\'s packages.');
				return;
			}

			store.dispatch(setProfilePackages(packages));

			modalClose();
		} else {
			const error = responseObj.error ||
				'The request appeared to succeed, but the response had ' +
				'a status other than 200.';

			store.dispatch(setPackageRemovingError(error));

			setTimeout(() => {
				if (this.props.error === error) {
					store.dispatch(setPackageRemovingError(''));
				}
			}, 6000);

			return Promise.reject();
		}
	});
}