// react
import React from 'react';

// redux
import store from '../store';
import { setPackageRemoving } from '../components/PackageOwned/PackageOwnedActions';

// modals
import PackageRemoveModal from '../modals/PackageRemoveModal/PackageRemoveModal';

// modules
import modalCreate from './modalCreate';

export default function modalCreateRemovePackage(id, name) {
    location.hash = 'removePackage-' + id;

    store.dispatch(setPackageRemoving({
        id,
        name,
    }));
    
    modalCreate(<PackageRemoveModal />);
}