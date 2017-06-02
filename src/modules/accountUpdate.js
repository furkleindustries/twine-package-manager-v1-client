/* redux */
import {
    setProfileMessage,
    setProfileRollback,
} from '../panes/profile/profileActions';

/* modules */
import * as post from './database/post';

export default async function accountUpdate(store, account, csrfToken) {
    let responseObj;
    try {
        responseObj = await post.accountUpdate(account, csrfToken);
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
        message = 'The request did not succeed, but there was no message ' +
            'received.';
    } else {
        message = 'Your account has been updated.';
        succeeded = true;
    }

    store.dispatch(setProfileMessage(message));

    if (succeeded) {
        const rollback = store.getState().profile;
        delete rollback.rollback;
        delete rollback.packages;

        store.dispatch(setProfileRollback(rollback));
    }

    setTimeout(() => {
        if (store.getState().profileMessage === message) {
            store.dispatch(setProfileMessage(''));
        }
    }, 6000);

    return succeeded;
}