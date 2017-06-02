/* next */
import Router from 'next/router';

/* redux */
import {
    setAppPanes,
    setAppSelectedPane,
    setCSRFToken,
} from '../appActions';

import {
    setUsername,
    setPassword,
} from '../panes/login/loginActions';

import {
    setProfile,
    setProfileRollback,
} from '../panes/profile/profileActions'

/* modules */
import deepCopy from './deepCopy';
import * as get from './database/get';

export default async function loginRender(store, antiCSRFToken, gotoProfile) {
    const baseUrl = process.env.PUBLIC_URL;

    let profileObj = {};
    try {
        profileObj = await get.userdata(antiCSRFToken);
    } catch (e) {
        console.log(e);

        if (localStorage.twinepmProfileCache) {
            try {
                /* Fake the response with the cached profile. */
                profileObj.userdata =
                    JSON.parse(localStorage.twinepmProfileCache);
                profileObj.status = 200;
            } catch (e) {
                console.log('Failed deserializing ' +
                    'twinepmProfileCache.');
                return;
            }
        } else {
            return;
        }
    }

    if (profileObj.error || profileObj.status !== 200) {
        if (profileObj.errorCode === 'no_access_cookie' ||
            profileObj.errorCode === 'anti_csrf_mismatch')
        {
            delete localStorage.twinepmCSRFToken;
            store.dispatch(setCSRFToken(null));

            if (store.getState().appSelectedPane === 'profile') {
                store.dispatch(setAppSelectedPane('login'));
                Router.push('/login', 'login');
            }
        }

        console.log('When getting the profile, a JSON object ' +
            'containing an error was received: ' +
            `${profileObj.error || 'Error missing'}`);
        return;
    }
        
    const state = store.getState();

    const panesCopy = deepCopy(state.appPanes);
    panesCopy.login.visible = false;
    panesCopy.profile.visible = true;
    store.dispatch(setAppPanes(panesCopy));

    store.dispatch(setProfile(profileObj.userdata));
    localStorage.twinepmProfileCache =
        JSON.stringify(store.getState().profile);

    const current = deepCopy(store.getState().profile);
    delete current.rollback;
    delete current.packages;
    store.dispatch(setProfileRollback(current));
    
    /* Delete username and password for meaningless security reasons. */
    store.dispatch(setUsername(''));
    store.dispatch(setPassword(''));

    /* Redirect to the profile page. */
    if (gotoProfile === true || gotoProfile === 'gotoProfile') {
        store.dispatch(setAppSelectedPane('profile'));
        Router.push('/profile', 'profile');
    }
}