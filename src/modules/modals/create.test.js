/* react */
import React from 'react';

/* redux */
const store = {};
store.dispatch = jest.fn();

jest.mock('../../appActions');
import { setModal, } from '../../appActions';
setModal.mockImplementation(() => ({ type: 'setModal', }));

/* modules */
import create from './create';

jest.mock('./closeListener');
import closeListener from './closeListener';

describe('modal create unit tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        document.querySelector = jest.fn();
    });

    it('tests that the create method calls the setModal action creator and dispatches to the store', () => {
        const obj = {
            type: 'setModal',
        };

        create(store.dispatch);
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([ obj, ]);
    });

    it('tests that the create method calls document.body.addEventListener', () => {
        document.body.addEventListener = jest.fn();

        create(store.dispatch);

        expect(document.body.addEventListener.mock.calls.length).toEqual(2);

        expect(document.body.addEventListener.mock.calls[0][0]).toBe('keydown');
        expect(document.body.addEventListener.mock.calls[0][2]).toBe(false);

        expect(document.body.addEventListener.mock.calls[1][0]).toBe('click');
        expect(document.body.addEventListener.mock.calls[1][2]).toBe(false);
    });

    it('sets the modal container\'s opacity to 1 after a timeout, if the modal container can be found', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const obj = {
            style: {},
        };

        document.querySelector.mockImplementationOnce(() => obj);

        create(store.dispatch);

        jest.runAllTimers();

        expect(document.querySelector.mock.calls.length).toEqual(1);
        expect(document.querySelector.mock.calls[0]).toEqual([
            '.Modal-container',
        ]);
        expect(obj.style.opacity).toEqual(1);
    });

    it('does not set opacity if the modal container cannot be found', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const obj = {};

        document.querySelector.mockImplementationOnce(() => obj);

        create(store.dispatch);

        jest.runAllTimers();

        expect(document.querySelector.mock.calls.length).toEqual(1);
        expect(document.querySelector.mock.calls[0]).toEqual([
            '.Modal-container',
        ]);
        expect(obj.style).toEqual(undefined);
    });

    it('wraps the closeListener call in an anonymous function to pass dispatch as well as e', () => {
        document.body.addEventListener = jest.fn();

        const store = { dispatch: jest.fn(), };
        create(store.dispatch);

        const wrapperFunc = document.body.addEventListener.mock.calls[0][1];
        wrapperFunc();

        expect(closeListener.mock.calls.length).toBe(1);
        expect(closeListener.mock.calls[0]).toEqual([
            undefined,
            store.dispatch,
        ]);

        const wrapperFunc2 = document.body.addEventListener.mock.calls[1][1];
        wrapperFunc2();

        expect(closeListener.mock.calls.length).toBe(2);
        expect(closeListener.mock.calls[1]).toEqual([
            undefined,
            store.dispatch,
        ]);
    });
});