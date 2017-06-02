/* redux */
import {
    setAccountDeletingMessage,
} from '../modals/AccountDeleteModal/AccountDeleteModalActions';

/* modules */
import * as _delete from './database/delete';
import logout from './logout';

export default async function accountDelete(store, id, csrfToken) {
    let responseObj;
    try {
        responseObj = await _delete.account(id, csrfToken);
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
        message = 'Your account has been deleted.';
        succeeded = true;
    }

    store.dispatch(setAccountDeletingMessage(message));

    if (succeeded) {
        setTimeout(() => {
            logout(store, null, 'skipServer');
            store.dispatch(setAccountDeletingMessage(''));
        }, 2000);
    } else {
        setTimeout(() => {
            if (store.getState().accountDeletingMessage === message) {
                store.dispatch(setAccountDeletingMessage(''));
            }
        }, 6000);
    }

    return succeeded;
}