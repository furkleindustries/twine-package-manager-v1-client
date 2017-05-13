import 'whatwg-fetch';

// redux
import store from '../../store';

import  {
    setAccountCreatingError,
} from '../../modals/AccountCreateModal/AccountCreateModalActions';

import {
    setProfileRollback,
    setProfilePackages,
    setProfileError,
} from '../../panes/profile/profileActions';

import {
    setPackageEditingDateModified,
    setPackageEditingError,
} from '../../components/PackageOwned/PackageOwnedActions';

// modules
import modalClose from '../modals/close';
import deepCopy from '../deepCopy';

export async function accountCreation(name, password, email) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('email', email);

    const url = 'https://furkleindustries.com/twinepm/login/createAccount.php';
    return await fetch(url, {
        method: 'POST',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return await fetch('https://furkleindustries.com/twinepm/login/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    }).then(response => {
        return response.json();
    });
}

export async function logout(csrfToken) {
    const formData = new FormData();
    formData.append('csrfToken', csrfToken);

    return await fetch('https://furkleindustries.com/twinepm/login/logout.php', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packageCreation(pkg, csrfToken) {
    const formData = new FormData();
    Object.keys(pkg).forEach(key => {
        formData.append(key, pkg[key]);
    });

    formData.append('csrfToken', csrfToken);

    return await fetch('https://furkleindustries.com/twinepm/login/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packageOwnershipTransfer(packageId, newOwner, csrfToken) {
    const formData = new FormData();
    formData.append('packageId', packageId);
    formData.append('newOwner', newOwner);
    formData.append('csrfToken', csrfToken);

    return await fetch('https://furkleindustries.com/twinepm/package/transferOwnership.php', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packageUpdate(pkg, csrfToken) {
    const formData = new FormData();
    Object.keys(pkg).forEach(key => {
        formData.append(key, pkg[key]);
    });

    formData.append('csrfToken', csrfToken);

    fetch('https://furkleindustries.com/twinepm/package/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packagePublish(id, published, csrfToken) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('published', published);
    formData.append('csrfToken', csrfToken);

    return await fetch('https://furkleindustries.com/twinepm/package/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export function profileUpdate(newProfile) {
    const formData = new FormData();
    Object.keys(newProfile).forEach(name => {
        formData.append(name, newProfile[name]);
    });

    formData.append('csrfToken', store.getState().csrfToken);

    fetch('https://furkleindustries.com/twinepm/userdata/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    }).then(response => {
        return response.json();
    }).catch(e => {
        const error = 'Unknown error deserializing userdata ' +
            'response object. Please contact webmaster.';
        store.dispatch(setProfileError(error));

        setTimeout(() => {
            if (store.getState().profileError === error) {
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
                if (store.getState().profileError === error) {
                    store.dispatch(setProfileError(''));
                }
            }, 6000);

            return;
        }

        const error = 'Profile updated successfully.';
        store.dispatch(setProfileError(error));

        setTimeout(() => {
            debugger;
            if (store.getState().profileError === error) {
                store.dispatch(setProfileError(''));
            }
        }, 6000);

        const rollback = store.getState().profile;
        delete rollback.rollback;
        delete rollback.packages;

        store.dispatch(setProfileRollback(rollback));
    });
}