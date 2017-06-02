/* react */
import React from 'react';

/* modals */
import AccountCreateModal from '../../modals/AccountCreateModal/AccountCreateModal';
import AccountDeleteModal from '../../modals/AccountDeleteModal/AccountDeleteModal';

import PackageCreateModal from '../../modals/PackageCreateModal/PackageCreateModal';
import PackagePublishModal from '../../modals/PackagePublishModal/PackagePublishModal';
import PackageEditModal from '../../modals/PackageEditModal/PackageEditModal';
import PackageDeleteModal from '../../modals/PackageDeleteModal/PackageDeleteModal';

import RulesModal from '../../modals/RulesModal/RulesModal';

/* modules */
import create from './create';

export function accountCreate(dispatch) {
    location.hash = 'createAccount';
    create(dispatch, <AccountCreateModal />);
}

export function accountDelete(dispatch) {
    debugger;
	location.hash = 'deleteAccount';
	create(dispatch, <AccountDeleteModal />);
}

export function packageCreate(dispatch) {
    location.hash = 'createNewPackage';
    create(dispatch, <PackageCreateModal />);
}

export function togglePackagePublish(dispatch, id) {
    location.hash = `togglePackagePublish-${id}`;
    create(dispatch, <PackagePublishModal />);
}

export function packageEdit(dispatch, id) {
	location.hash = `editPackage-${id}`;
    create(dispatch, <PackageEditModal />);
}

export function packageDelete(dispatch, id) {
    location.hash = `deletePackage-${id}`;
    create(dispatch, <PackageDeleteModal />);
}

export function rules(dispatch) {
    location.hash = 'rules';
    create(dispatch, <RulesModal />);
}