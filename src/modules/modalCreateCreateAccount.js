// react
import React from 'react';

// modals
import AccountCreateModal from '../modals/AccountCreateModal/AccountCreateModal';

// modules
import modalCreate from './modalCreate';

export default function modalCreateCreateAccount() {
    location.hash = 'createAccount';

    modalCreate(<AccountCreateModal />);
}