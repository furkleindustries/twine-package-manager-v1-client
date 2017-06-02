/* redux */
import {
    setProfilePackages,
} from '../panes/profile/profileActions';

import {
    setPackageEditingDateModified,
    setPackageEditingMessage,
} from '../components/PackageOwned/PackageOwnedActions';

/* modules */
import * as post from './database/post';

export default async function packageUpdate(store, pkg, csrfToken) {
    let responseObj;
    try {
        responseObj = await post.packageUpdate(pkg, csrfToken);
    } catch (e) {
        console.log(e);
    }

    let message = '';
    let succeeded = false;
    if (!responseObj) {
        message = 'There was an error in receiving or deserializing the ' +
            'server response.';
    } else if (responseObj.error) {
        message = responseObj.error;
    } else if (responseObj.status !== 200) {
        message = 'The request did not succeed, but there was no ' +
            'message received.';
    } else {
        succeeded = true;
        message = 'Package updated successfully.';


        let packages = store.getState().profile.packages;
        if (!packages) {
            console.log('Could not find packages in state.');
            return;
        }
        
        const dateModified = responseObj.dateModified;
        store.dispatch(setPackageEditingDateModified(dateModified));
        
        packages = packages.map(oldPackage => {
            if (oldPackage.id === pkg.id) {
                return pkg;
            } else {
                return oldPackage;
            }
        });

        store.dispatch(setProfilePackages(packages));
    }

    store.dispatch(setPackageEditingMessage(message));

    setTimeout(() => {
        if (store.getState().packageEditingMessage === message) {
            store.dispatch(setPackageEditingMessage(''));
        }
    }, 6000);

    return succeeded;
}