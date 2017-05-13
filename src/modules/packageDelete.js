// redux
import store from '../store';
import {
    setProfilePackages,
} from '../panes/profile/profileActions';

import {
    setPackageDeletingMessage,
} from '../modals/PackageCreateModal/PackageCreateModalActions';

// modules
import * as _delete from './database/delete';

export default async function packageDelete(id, csrfToken) {
    let responseObj;
    try {
        responseObj = await _delete.package(id, csrfToken);
    } catch (e) {
        console.log(e);
    }

    let message = '';
    if (!responseObj) {
        message = 'There was an error in receiving or deserializing the ' +
            'server response.';
    } else if (responseObj.error) {
        message = responseObj.error;
    } else if (responseObj.status !== 200) {
        message = 'The request did not succeed, but there was no ' +
            'message received.';
    }

    let succeeded = false;
    if (!message) {
        succeeded = true;
        message = 'Package deleted successfully.';

        let packages = store.getState().profile.packages;
        if (!packages) {
            console.log('Could not find packages in store.');
            return;
        }

        const oldLength = packages.length;

        packages = packages.filter(pkg => pkg.id !== id);

        const newLength = packages.length;

        if (newLength !== oldLength - 1) {
            console.log(`Could not find package with id ${id} ` +
                `in the store's packages.`);
            return;
        }

        store.dispatch(setProfilePackages(packages));
    }

    store.dispatch(setPackageDeletingMessage(message));

    setTimeout(() => {
        store.dispatch(setPackageDeletingMessage(''));
    }, 6000);

    return succeeded;
}