// react
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

// enzyme
import { shallow, } from 'enzyme';

// redux
import store from '../../store';

// components
import { AccountDeleteModal, } from './AccountDeleteModal';
import rootComponent from '../../rootComponent';

// modules
jest.mock('../../modules/accountDelete');
import accountDelete from '../../modules/accountDelete';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('AccountDeleteModal unit tests', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    it('produces the AccountDeleteModal modal', () => {
        window.localStorage = {};

        store.dispatch = dispatch;
        const component = ReactTestUtils.renderIntoDocument(rootComponent);
        modalFactories.accountDelete();
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            AccountDeleteModal);
        expect(find.length).toEqual(1);
    });

    it('renders AccountDeleteModal', () => {
        const wrapper = shallow(<AccountDeleteModal />);
        expect(wrapper.length).toEqual(1);
    });

    it('handles handleKeyDown', () => {
        const wrapper = shallow(<AccountDeleteModal />);
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
            csrfToken="abcdef" />

        const wrapper = shallow(component);
        await wrapper.instance().deleteAccount();

        expect(accountDelete.mock.calls.length).toEqual(1);
        const args = [213, 'abcdef'];
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
            csrfToken="testing" />

        const wrapper = shallow(component);
        await wrapper.instance().deleteAccount();

        expect(accountDelete.mock.calls.length).toEqual(1);
        const args = [245, 'testing'];
        expect(accountDelete.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});