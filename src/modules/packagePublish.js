/* redux */
import store from '../store';
import {
    setProfilePackages,
} from '../panes/profile/profileActions';
import {
    setPackagePublishingMessage,
} from '../components/PackageOwned/PackageOwnedActions';

/* modules */
import * as post from './database/post';

export default async function packagePublish(id, published, csrfToken) {
    let responseObj;
    try {
        responseObj = await post.packagePublish(id, published, csrfToken);
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
        message = 'Package publish state changed successfully.';
    }

    store.dispatch(setPackagePublishingMessage(message));

    setTimeout(() => {
        if (store.getState().packagePublishingMessage === message) {
            store.dispatch(setPackagePublishingMessage(''));
        }
    }, 6000);

    return succeeded;
}