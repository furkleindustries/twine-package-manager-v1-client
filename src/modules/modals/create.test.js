/* react */
import React from 'react';

/* redux */
jest.mock('../../store');
import store from '../../store';

jest.mock('../../appActions');
import { setModal, } from '../../appActions';

/* components */
jest.mock('../../components/Modal/Modal');
import Modal from '../../components/Modal/Modal';

/* modules */
import create from './create';
import closeListener from './closeListener';

describe('modal create unit tests', () => {
    it('tests that the create method calls the setModal action creator and dispatches to the store', () => {
        const obj = {
            modal: 'testing',
            type: 'setModal',
        };

        setModal.mockImplementationOnce(() => obj);

        create();
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([obj]);
    });

    it('tests that the create method calls document.body.addEventListener', () => {
        document.body.addEventListener = jest.fn();

        create();

        expect(document.body.addEventListener.mock.calls.length).toEqual(2);

        const args1 = ['keydown', closeListener, false];
        expect(document.body.addEventListener.mock.calls[0]).toEqual(args1);

        const args2 = ['click', closeListener, false];
        expect(document.body.addEventListener.mock.calls[1]).toEqual(args2);
    });

    it('sets the modal container\'s opacity to 1 after a timeout, if the modal container can be found', () => {
        jest.useFakeTimers();

        document.querySelector = jest.fn();
        const obj = {
            style: {},
        };

        document.querySelector.mockImplementationOnce(() => obj);

        create();

        jest.runAllTimers();

        expect(document.querySelector.mock.calls.length).toEqual(1);
        expect(document.querySelector.mock.calls[0]).toEqual([
            '.Modal-container',
        ]);
        expect(obj.style.opacity).toEqual(1);
    });

    it('does not set opacity if the modal container cannot be found', () => {
        jest.useFakeTimers();

        document.querySelector = jest.fn();
        const obj = {};

        document.querySelector.mockImplementationOnce(() => obj);

        create();

        jest.runAllTimers();

        expect(document.querySelector.mock.calls.length).toEqual(1);
        expect(document.querySelector.mock.calls[0]).toEqual([
            '.Modal-container',
        ]);
        expect(obj.style).toEqual(undefined);
    });
});