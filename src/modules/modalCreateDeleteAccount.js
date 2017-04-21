// react
import React from 'react';

// modals
import AccountDeleteModal from '../modals/AccountDeleteModal/AccountDeleteModal';

// modules
import modalCreate from './modalCreate';

export default function modalCreateDeleteAccount() {
	location.hash = 'deleteAccount';
	modalCreate(<AccountDeleteModal />);
}