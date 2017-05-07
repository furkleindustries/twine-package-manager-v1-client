// react
import React from 'react';

// modals
import AccountCreateModal from '../../modals/AccountCreateModal/AccountCreateModal';
import AccountDeleteModal from '../../modals/AccountDeleteModal/AccountDeleteModal';

import PackageCreateModal from '../../modals/PackageCreateModal/PackageCreateModal';
import PackagePublishModal from '../../modals/PackagePublishModal/PackagePublishModal';
import PackageEditModal from '../../modals/PackageEditModal/PackageEditModal';
import PackageDeleteModal from '../../modals/PackageDeleteModal/PackageDeleteModal';

import RulesModal from '../../modals/RulesModal/RulesModal';

// modules
import create from './create';

export function accountCreate() {
    location.hash = 'createAccount';
    create(<AccountCreateModal />);
}

export function accountDelete() {
	location.hash = 'deleteAccount';
	create(<AccountDeleteModal />);
}

export function packageCreate() {
    location.hash = 'createNewPackage';
    create(<PackageCreateModal />);
}

export function togglePackagePublish(id) {
    location.hash = `togglePackagePublish-${id}`;
    create(<PackagePublishModal />);
}

export function packageEdit(id) {
	location.hash = `editPackage-${id}`;
    create(<PackageEditModal />);
}

export function packageDelete(id) {
    location.hash = `deletePackage-${id}`;
    create(<PackageDeleteModal />);
}

export function rules() {
    location.hash = 'rules';
    create(<RulesModal />);
}