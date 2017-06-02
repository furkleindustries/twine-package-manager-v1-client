/* react */
import React from 'react';

/* next */
jest.mock('next/router');

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* redux */
const store = {};
store.dispatch = jest.fn();

/* components */
import { AccountDeleteModal, } from './AccountDeleteModal';
import Profile from '../../../pages/profile';

/* modules */
jest.mock('../../modules/accountDelete');
import accountDelete from '../../modules/accountDelete';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('AccountDeleteModal unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch = jest.fn();
    });

    it('produces the AccountDeleteModal modal', async () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        modalFactories.accountDelete(app.props().dispatch);
        const find = wrapper.find('AccountDeleteModal');
        expect(find.length).toEqual(1);
    });

    it('renders AccountDeleteModal', () => {
        const component = <AccountDeleteModal dispatch={store.dispatch} />;
        const wrapper = shallow(component);
        expect(wrapper.length).toEqual(1);
    });

    it('handles handleKeyDown', () => {
        const component = <AccountDeleteModal dispatch={store.dispatch} />;
        const wrapper = shallow(component);
        wrapper.instance().handleKeyDown({ target: { value: 'buzzbazz', }, });
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                enteredId: 'buzzbazz',
                type: 'setAccountDeletingEnteredId',
            },
        ]);
    });

    it('handles deleteAccount with success', async () => {
        jest.useFakeTimers();

        accountDelete.mockClear();
        accountDelete.mockImplementationOnce(() => true);
        modalClose.mockClear();

        const component = <AccountDeleteModal
            id={213}
            csrfToken="abcdef"
            dispatch={store.dispatch}
            store={store} />

        const wrapper = shallow(component);
        await wrapper.instance().deleteAccount();

        expect(accountDelete.mock.calls.length).toEqual(1);
        const args = [ store, 213, 'abcdef', ];
        expect(accountDelete.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles deleteAccount with failure', async () => {
        jest.useFakeTimers();

        accountDelete.mockClear();
        accountDelete.mockImplementationOnce(() => false);
        modalClose.mockClear();

        const component = <AccountDeleteModal
            id={245}
            csrfToken="testing"
            dispatch={store.dispatch}
            store={store} />

        const wrapper = shallow(component);
        await wrapper.instance().deleteAccount();

        expect(accountDelete.mock.calls.length).toEqual(1);
        const args = [ store, 245, 'testing', ];
        expect(accountDelete.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});