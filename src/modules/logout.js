// react
import { browserHistory, } from 'react-router';

// redux
import store from '../store';
import {
    setAppPanes,
    setAppSelectedPane,
    setSideBarSelectedPane,
    setCSRFToken,
} from '../appActions';

import { setProfile, } from '../panes/profile/profileActions';

// modules
import deepCopy from './deepCopy';
import * as post from './database/post';

export default function logout(antiCSRFToken) {
    try {
        post.logout(antiCSRFToken);
    } catch (e) {
        console.log(e);
    }

    const state = store.getState();

    const panesCopy = deepCopy(state.appPanes);
    panesCopy.login.visible = true;
    panesCopy.profile.visible = false;
    store.dispatch(setAppPanes(panesCopy));

    store.dispatch(setProfile({}));

    store.dispatch(setCSRFToken(null));
    delete localStorage.twinepmCSRFToken;

    if (state.appSelectedPane === 'profile') {
        store.dispatch(setAppSelectedPane('login'));
        
        store.dispatch(setSideBarSelectedPane(null));
        delete localStorage.twinepmProfileLocation;

        // redirect to the login page
        browserHistory.push(`${process.env.PUBLIC_URL}/login`);
    }
}