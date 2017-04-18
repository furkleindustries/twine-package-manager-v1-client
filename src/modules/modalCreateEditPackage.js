// react
import React from 'react';

// redux
import store from '../store';
import { setPackageEditing } from '../components/PackageOwned/PackageOwnedActions';

// modals
import PackageEditModal from '../modals/PackageEditModal/PackageEditModal';

// modules
import deepCopy from './deepCopy';
import modalCreate from './modalCreate';

export default function modalCreateEditPackage(id) {
    const state = deepCopy(store.getState());

    const packages = state.profile.packages;
    const pkg = packages.filter(pkg => pkg.id === id)[0];

    if (!pkg) {
        console.log('Could not find package with id ' + id);
        return;
    }

    location.hash = 'editPackage-' + pkg.id;
    
    store.dispatch(setPackageEditing(pkg));
    
    modalCreate(<PackageEditModal />);
}