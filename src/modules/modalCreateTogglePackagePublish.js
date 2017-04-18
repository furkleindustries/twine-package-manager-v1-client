// react
import React from 'react';

// redux
import store from '../store';
import { setPackagePublishing } from '../components/PackageOwned/PackageOwnedActions';

// modals
import PackagePublishModal from '../modals/PackagePublishModal/PackagePublishModal';

// modules
import modalCreate from './modalCreate';

export default function modalCreateTogglePackagePublish(id) {
    location.hash = 'togglePackagePublish-' + id;

    const state = store.getState();
    const profile = state.profile;

    const pkg = profile.packages.filter(pkg => {
        return pkg.id === id;
    })[0];

    if (!pkg) {
        console.log('Could not find package with id ' + id
            + '.');
        return;
    }

    const published = pkg.published;

    store.dispatch(setPackagePublishing({
        id,
        published,
    }));

    modalCreate(<PackagePublishModal />);
}