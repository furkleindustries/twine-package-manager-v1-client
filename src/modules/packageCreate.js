// redux
import store from '../store';

import {
    setProfilePackages,
} from '../panes/profile/profileActions';

import {
    setPackageCreatingMessage,
} from '../modals/PackageCreateModal/PackageCreateModalActions';

// modules
import * as post from './database/post';

export default async function packageCreate(pkg, csrfToken) {
    let responseObj;
    try {
        responseObj = await post.packageCreation(pkg, csrfToken);
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
        message = 'Package created successfully.';

        let packages = store.getState().profile.packages;
        if (!packages) {
            console.log('Could not find packages in store.');
            return;
        }

        packages.push(pkg);

        store.dispatch(setProfilePackages(packages));
    }

    store.dispatch(setPackageCreatingMessage(message));

    setTimeout(() => {
        store.dispatch(setPackageCreatingMessage(''));
    }, 6000);

    return succeeded;
}