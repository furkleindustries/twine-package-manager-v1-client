// redux
import store from '../store';
import {
    setPackageEditingMessage,
} from '../modals/PackageCreateModal/PackageCreateModalActions';

// modules
import * as post from './database/post';

export default async function packageTransferOwnership(id, newOwner, csrfToken) {
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
        message = 'Package transfer pending new owner\'s acceptance.';
    }

    store.dispatch(setPackageEditingMessage(message));

    setTimeout(() => {
        store.dispatch(setPackageEditingMessage(''));
    }, 6000);

    return succeeded;
}