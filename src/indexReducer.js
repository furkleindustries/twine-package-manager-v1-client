// redux
import { combineReducers } from 'redux';

// reducers
import {
	panesReducer,
	selectedPaneReducer,
	profileReducer,
	csrfTokenReducer,
	modalReducer,
} from './appReducers';

import {
	searchReducer,
} from './panes/search/searchReducers';

import {
	usernameReducer,
	passwordReducer,
	loginErrorReducer,
	createAccountErrorReducer,
} from './panes/login/loginReducers';

import {
    accountCreatingNameReducer,
    accountCreatingPasswordReducer,
    accountCreatingEmailReducer,
    accountCreatingErrorReducer,
} from './modals/AccountCreateModal/AccountCreateModalReducers';

import {
    accountDeletingEnteredIdReducer,
    accountDeletingErrorReducer,
} from './modals/AccountDeleteModal/AccountDeleteModalReducers';

import {
    packagePublishingReducer,
    packageEditingReducer,
    packageRemovingReducer,
    packagePublishingErrorReducer,
    packageEditingErrorReducer,
    packageRemovingErrorReducer,
} from './components/PackageOwned/PackageOwnedReducers';

import {
    packageCreatingReducer,
    packageCreatingErrorReducer,
} from './modals/PackageCreateModal/PackageCreateModalReducers';

const indexReducer = combineReducers({
    panes: panesReducer,
    selectedPane: selectedPaneReducer,
    search: searchReducer,
    username: usernameReducer,
    password: passwordReducer,
    csrfToken: csrfTokenReducer,
    loginError: loginErrorReducer,
    profile: profileReducer,
    accountCreatingName: accountCreatingNameReducer,
    accountCreatingPassword: accountCreatingPasswordReducer,
    accountCreatingEmail: accountCreatingEmailReducer,
    accountCreatingError: accountCreatingErrorReducer,
    accountDeletingEnteredId: accountDeletingEnteredIdReducer,
    accountDeletingError: accountDeletingErrorReducer,
    packagePublishing: packagePublishingReducer,
    packageEditing: packageEditingReducer,
    packageRemoving: packageRemovingReducer,
    packageCreating: packageCreatingReducer,
    createAccountError: createAccountErrorReducer,
    packagePublishingError: packagePublishingErrorReducer,
    packageEditingError: packageEditingErrorReducer,
    packageRemovingError: packageRemovingErrorReducer,
    packageCreatingError: packageCreatingErrorReducer,
    modal: modalReducer,
});

export default indexReducer;