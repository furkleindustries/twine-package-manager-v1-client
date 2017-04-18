// react
import React from 'react';

// modals
import CreateAccountModal from '../modals/CreateAccountModal/CreateAccountModal';

// modules
import modalCreate from './modalCreate';

export default function modalCreateCreateAccount() {
    location.hash = 'register';

    modalCreate(<CreateAccountModal />);
}