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
    profile: profileReducer,
    csrfToken: csrfTokenReducer,
    modal: modalReducer,
    username: usernameReducer,
    password: passwordReducer,
    search: searchReducer,
    packagePublishing: packagePublishingReducer,
    packageEditing: packageEditingReducer,
    packageRemoving: packageRemovingReducer,
    packageCreating: packageCreatingReducer,
    loginError: loginErrorReducer,
    createAccountError: createAccountErrorReducer,
    packagePublishingError: packagePublishingErrorReducer,
    packageEditingError: packageEditingErrorReducer,
    packageRemovingError: packageRemovingErrorReducer,
    packageCreatingError: packageCreatingErrorReducer,
});

export default indexReducer;