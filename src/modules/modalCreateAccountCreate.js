/* react */
import React from 'react';

/* modals */
import AccountCreateModal from '../modals/AccountCreateModal/AccountCreateModal';

/* modules */
import modalCreate from './modalCreate';

export default function modalCreateAccountCreate() {
    location.hash = 'createAccount';

    modalCreate(<AccountCreateModal />);
}