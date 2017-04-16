// redux
import { combineReducers, } from 'redux';
import {
    profileIdReducer,
    profileDateCreatedReducer,
    profileDateCreatedVisibleReducer,
    profileNameReducer,
    profileNameVisibleReducer,
    profileDescriptionReducer,
    profileEmailReducer,
    profileEmailVisibleReducer,
    profileHomepageReducer,
    profileDateStyleReducer,
    profileTimeStyleReducer,
    profilePackagesReducer,
    profileEditingReducer,
    profileErrorReducer,
    profileRollbackReducer,
} from './panes/profile/profileReducers';

// metadata for each pane
import panesSource from './panesSource';

export function panesReducer(previous = panesSource, action) {
    if (action.type === 'setPanes') {
        if (action.panes && typeof(action.panes) === 'object') {
            return action.panes;
        }
    }

    return previous;
}

const startPane =
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1) ||
    'home';

export function selectedPaneReducer(previous = startPane, action) {
    if (action.type === 'setSelectedPane') {
        if (action.selectedPane && typeof(action.selectedPane) === 'string') {
            return action.selectedPane;
        }
    }

    return previous;
}

export const profileReducer = combineReducers({
    id: profileIdReducer,
    dateCreated: profileDateCreatedReducer,
    dateCreatedVisible: profileDateCreatedVisibleReducer,
    name: profileNameReducer,
    nameVisible: profileNameVisibleReducer,
    description: profileDescriptionReducer,
    email: profileEmailReducer,
    emailVisible: profileEmailVisibleReducer,
    homepage: profileHomepageReducer,
    dateStyle: profileDateStyleReducer,
    timeStyle: profileTimeStyleReducer,
    packages: profilePackagesReducer,
    editing: profileEditingReducer,
    error: profileErrorReducer,
    rollback: profileRollbackReducer,
});

export function csrfTokenReducer(previous = null, action) {
    if (action.type === 'setCSRFToken') {
        if (action.csrfToken && typeof(action.csrfToken) === 'string') {
            return action.csrfToken;
        }
    }

    return previous;
}

export function modalReducer(previous = null, action) {
    if (action.type === 'setModal') {
        if (typeof(action.modal) === 'object') {
            return action.modal;
        }
    }

    return previous;
}