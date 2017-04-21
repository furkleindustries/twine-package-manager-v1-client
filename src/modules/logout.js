// react
import { browserHistory } from 'react-router';

// redux
import store from '../store';
import {
    setPanes,
    setSelectedPane,
    setCSRFToken,
} from '../appActions';
import { setProfile } from '../panes/profile/profileActions';

// modules
import deepCopy from './deepCopy';

export default function appLogout() {
    const baseUrl = process.env.PUBLIC_URL;

    const state = store.getState();

    const panesCopy = deepCopy(state.panes);
    panesCopy.login.visible = true;
    panesCopy.profile.visible = false;

    store.dispatch(setPanes(panesCopy));

    store.dispatch(setProfile({}));
    store.dispatch(setCSRFToken(null));

    delete localStorage.twinepmCSRFToken;

    store.dispatch(setSelectedPane('login'));

    // redirect to the login page
    browserHistory.push(baseUrl + '/login');
}