/* redux */
import {
    setPackageEditingMessage,
} from '../components/PackageOwned/PackageOwnedActions';

/* modules */
import * as post from './database/post';

export default async function packageTransferOwnership(store, id, newOwner, csrfToken) {
    let responseObj;
    try {
        responseObj = await post.packageOwnershipTransfer(
            id,
            newOwner,
            csrfToken);
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
        message = 'Package transfer pending new owner\'s acceptance.';
    }

    store.dispatch(setPackageEditingMessage(message));

    setTimeout(() => {
        if (store.getState().packageEditingMessage === message) {
            store.dispatch(setPackageEditingMessage(''));
        }
    }, 6000);

    return succeeded;
}