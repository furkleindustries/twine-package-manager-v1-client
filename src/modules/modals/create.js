/* react */
import React from 'react';

/* redux */
import { setModal, } from '../../appActions';

/* modal */
import Modal from '../../components/Modal/Modal';

/* modules */
import closeListener from './closeListener';

export default function create(dispatch, content) {
    const modal = <Modal content={content} />;
    dispatch(setModal(modal));

    /* setTimeout to queue the change rather than firing it immediately.
     * Should probably switch to getComputedStyle at some point. */
    setTimeout(() => {
        const container = document.querySelector('.Modal-container');
        if (container && container.style) {
            container.style.opacity = 1;
        }
    });

    /* Register keydown and click events for closing modal. */
    document.body.addEventListener(
        'keydown',
        (e) => closeListener(e, dispatch),
        false);

    document.body.addEventListener(
        'click',
        (e) => closeListener(e, dispatch),
        false);
}