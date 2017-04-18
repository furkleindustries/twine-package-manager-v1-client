// react
import React from 'react';

// redux
import store from '../store';
import { setModal } from '../appActions';

// modal
import Modal from '../components/Modal/Modal';

// modules
import modalRemoveListenerAndClose from './modalRemoveListenerAndClose';

export default function modalCreate(content) {
    const modal = <Modal content={content} />;
    store.dispatch(setModal(modal));

    /* setTimeout to queue the change rather than firing it immediately.
     * Should probably switch to getComputedStyle at some point. */
    setTimeout(() => {
        document.querySelector('.Modal-container').style.opacity = 1;
    });

    /* Register keydown and click events for closing modal */
    document.body.addEventListener(
        'keydown',
        modalRemoveListenerAndClose,
        false);

    document.body.addEventListener(
        'click',
        modalRemoveListenerAndClose,
        false);
}