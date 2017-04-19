// react
import React from 'react';

// modals
import PackageCreateModal from '../modals/PackageCreateModal/PackageCreateModal';

// modules
import modalCreate from './modalCreate';

export default function modalCreateCreatePackage() {
    location.hash = 'createNewPackage';

    modalCreate(<PackageCreateModal />);
}