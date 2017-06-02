/* redux */
import {
    setAccountCreatingName,
    setAccountCreatingPassword,
    setAccountCreatingEmail,
    setAccountCreatingMessage,
} from '../modals/AccountCreateModal/AccountCreateModalActions';

/* modules */
import * as post from './database/post';

export default async function accountCreate(store, name, password, email) {
    let responseObj;
    try {
        responseObj = await post.accountCreation(name, password, email);
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
        message = 'Please check your e-mail ' +
            '(including the spam folder) for the validation e-mail, then ' +
            'follow the link therein. Your username will be reserved for 24 ' +
            'hours; if left unvalidated it will become available to ' +
            'everyone again.';

        store.dispatch(setAccountCreatingName(''));
        store.dispatch(setAccountCreatingPassword(''));
        store.dispatch(setAccountCreatingEmail(''));
    } 

    if (!succeeded) {        
        store.dispatch(setAccountCreatingName(''));
        store.dispatch(setAccountCreatingPassword(''));
    }

    store.dispatch(setAccountCreatingMessage(message));

    setTimeout(() => {
        if (store.getState().accountCreatingMessage === message) {
            store.dispatch(setAccountCreatingMessage(''));
        }
    }, 6000);

    return succeeded;
}