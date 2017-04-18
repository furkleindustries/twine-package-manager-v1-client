// react
import { browserHistory } from 'react-router';

// redux
import store from '../store';
import {
    setPanes,
    setSelectedPane,
} from '../appActions';
import {
    setUsername,
    setPassword,
} from '../panes/login/loginActions';
import {
    setProfile,
} from '../panes/profile/profileActions'

// modules
import deepCopy from './deepCopy';
import getProfile from './getProfile';

export default function renderLogin(gotoProfile) {
    const baseUrl = process.env.PUBLIC_URL;

    getProfile().catch(xhr => {
        delete localStorage.twinepmCSRFToken;

        // don't allow execution to continue
        return Promise.reject();
    }).then(response => {
        return response.json();
    }).catch(e => {
        console.log('Couldn\'t deserialize profile. ' + e.message);
        return Promise.reject();
    }).then(responseObj => {
        const state = store.getState();

        const panesCopy = deepCopy(state.panes);
        panesCopy.login.visible = false;
        panesCopy.profile.visible = true;
        store.dispatch(setPanes(panesCopy));

        if (responseObj.error || responseObj.status !== 200) {
            console.log('When getting the profile, a JSON object ' +
                'containing an error was received. ' +
                responseObj.error);
            return;
        }

        store.dispatch(setProfile(responseObj.userdata));
        
        // delete username and password for security reasons
        store.dispatch(setUsername(''));
        store.dispatch(setPassword(''));

        // redirect to the profile page
        if (gotoProfile) {
            store.dispatch(setSelectedPane('profile'));
            browserHistory.push(baseUrl + '/profile');
        }
    });
}