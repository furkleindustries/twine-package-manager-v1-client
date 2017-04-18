import fetch from 'whatwg-fetch';

// redux
import store from '../store';
import {
    setProfileRollback,
    setProfileEditing,
    setProfileError,
} from '../panes/profile/profileActions';

export default function updateProfile(params) {
    fetch('https://furkleindustries.com/twinepm/userdata/', {
        method: 'POST',
        body: JSON.stringify(params),
        credentials: 'include',
    }).catch(xhr => {
        let error = 'Unknown error updating profile. Please contact ' +
            'webmaster.';
        try {
            const responseObj = JSON.parse(xhr.responseText);
            if (responseObj.error) {
                error = responseObj.error;
            }
        } catch (e) {
            error = 'Unknown error deserializing userdata response ' +
                'object. Please contact webmaster.';
        }

        store.dispatch(setProfileError(error));

        setTimeout(() => {
            if (this.props.error === error) {
                store.dispatch(setProfileError(''));
            }
        }, 6000);

        return Promise.reject();
    }).then(response => {
        return response.json();
    }).catch(e => {
        const error = 'Unknown error deserializing userdata ' +
            'response object. Please contact webmaster.';
        store.dispatch(setProfileError(error));

        setTimeout(() => {
            if (this.props.error === error) {
                store.dispatch(setProfileError(''));
            }
        }, 6000);

        return Promise.reject();
    }).then(responseObj => {
        if (responseObj.error || responseObj.status !== 200) {
            const error = responseObj.error || 'Unknown error ' +
                'updating profile. Please contact webmaster.';
            store.dispatch(setProfileError(error));

            setTimeout(() => {
                if (this.props.error === error) {
                    store.dispatch(setProfileError(''));
                }
            }, 6000);

            return;
        }

        const error = 'Profile updated successfully.';
        store.dispatch(setProfileError(error));

        setTimeout(() => {
            if (this.props.error === error) {
                store.dispatch(setProfileError(''));
            }
        }, 6000);

        store.dispatch(setProfileRollback(null));
        store.dispatch(setProfileEditing(false));
    });
}