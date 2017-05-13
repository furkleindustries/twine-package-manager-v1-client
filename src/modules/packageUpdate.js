// redux
import store from '../store';
import {
    setProfilePackages,
} from '../components/PackageOwned/PackageOwnedActions';
import {
    setPackageEditingDateModified,
    setPackageEditingMessage,
} from '../modals/PackageCreateModal/PackageCreateModalActions';

// modules
import * as post from './database/post';

export default async function packageUpdate(pkg, csrfToken) {
    let responseObj;
    try {
        responseObj = await post.packageUpdate(pkg, csrfToken);
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
        message = 'Package edited successfully.';
    }

    const dateModified = responseObj.dateModified;
    store.dispatch(setPackageEditingDateModified(dateModified));

    const packages = store.getState().profile.packages.map(oldPackage => {
        if (oldPackage.id === pkg.id) {
            return pkg;
        } else {
            return oldPackage;
        }
    });

    store.dispatch(setProfilePackages(packages));

    store.dispatch(setPackageEditingMessage(message));

    setTimeout(() => {
        store.dispatch(setPackageEditingMessage(''));
    }, 6000);

    return succeeded;
}