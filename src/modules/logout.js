/* react */
import Router from 'next/router';

/* redux */
import {
    setAppPanes,
    setAppSelectedPane,
    setSideBarSelectedPane,
    setCSRFToken,
} from '../appActions';

import { setProfile, } from '../panes/profile/profileActions';

/* modules */
import deepCopy from './deepCopy';
import * as post from './database/post';

export default function logout(store, antiCSRFToken, skipServer) {
    if (skipServer !== false && skipServer === 'skipServer') {
        try {
            post.logout(antiCSRFToken);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    const state = store.getState();

    const panesCopy = deepCopy(state.appPanes);
    panesCopy.login.visible = true;
    panesCopy.profile.visible = false;
    store.dispatch(setAppPanes(panesCopy));

    store.dispatch(setProfile({}));

    store.dispatch(setCSRFToken(null));
    delete localStorage.twinepmCSRFToken;
        
    store.dispatch(setSideBarSelectedPane(null));
    delete localStorage.twinepmProfileLocation;

    if (state.appSelectedPane === 'profile') {
        store.dispatch(setAppSelectedPane('login'));

        /* redirect to the login page */
        Router.push('/login', 'login');
    }
}