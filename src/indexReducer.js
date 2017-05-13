// redux
import { combineReducers, } from 'redux';

// reducers
import {
	appPanesReducer,
    appSelectedPaneReducer,
    sideBarVisibleReducer,
    sideBarPanesReducer,
    sideBarSelectedPaneReducer,
	csrfTokenReducer,
	modalReducer,
} from './appReducers';

import {
	searchOptionsReducer,
} from './panes/search/searchReducers';

import {
	usernameReducer,
	passwordReducer,
	loginMessageReducer,
} from './panes/login/loginReducers';

import {
    profileReducer,
} from './panes/profile/profileReducers';

import {
    accountCreatingNameReducer,
    accountCreatingPasswordReducer,
    accountCreatingEmailReducer,
    accountCreatingMessageReducer,
} from './modals/AccountCreateModal/AccountCreateModalReducers';

import {
    accountDeletingEnteredIdReducer,
    accountDeletingMessageReducer,
} from './modals/AccountDeleteModal/AccountDeleteModalReducers';

import { profileMessageReducer, } from './panes/profile/profileReducers';

import {
    packagePublishingReducer,
    packagePublishingMessageReducer,
    packageEditingNewOwnerReducer,
    packageEditingReducer,
    packageEditingMessageReducer,
    packageDeletingReducer,
    packageDeletingMessageReducer,
} from './components/PackageOwned/PackageOwnedReducers';

import {
    packageCreatingReducer,
    packageCreatingMessageReducer,
} from './modals/PackageCreateModal/PackageCreateModalReducers';

const indexReducer = combineReducers({
    appPanes: appPanesReducer,
    appSelectedPane: appSelectedPaneReducer,
    sideBarVisible: sideBarVisibleReducer,
    sideBarPanes: sideBarPanesReducer,
    sideBarSelectedPane: sideBarSelectedPaneReducer,
    search: searchOptionsReducer,
    username: usernameReducer,
    password: passwordReducer,
    csrfToken: csrfTokenReducer,
    loginMessage: loginMessageReducer,
    profile: profileReducer,
    profileMessage: profileMessageReducer,
    accountCreatingName: accountCreatingNameReducer,
    accountCreatingPassword: accountCreatingPasswordReducer,
    accountCreatingEmail: accountCreatingEmailReducer,
    accountCreatingMessage: accountCreatingMessageReducer,
    accountDeletingEnteredId: accountDeletingEnteredIdReducer,
    accountDeletingMessage: accountDeletingMessageReducer,
    packagePublishing: packagePublishingReducer,
    packageEditingNewOwner: packageEditingNewOwnerReducer,
    packageEditing: packageEditingReducer,
    packageDeleting: packageDeletingReducer,
    packageCreating: packageCreatingReducer,
    packagePublishingMessage: packagePublishingMessageReducer,
    packageEditingMessage: packageEditingMessageReducer,
    packageDeletingMessage: packageDeletingMessageReducer,
    packageCreatingMessage: packageCreatingMessageReducer,
    modal: modalReducer,
});

export default indexReducer;