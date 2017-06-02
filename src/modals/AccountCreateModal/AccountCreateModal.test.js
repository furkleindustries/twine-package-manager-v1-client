/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* redux */
const store = {};
store.dispatch = jest.fn();

/* components */
import { AccountCreateModal, } from './AccountCreateModal';
import Login from '../../../pages/login';

/* modules */
jest.mock('../../modules/accountCreate');
import accountCreate from '../../modules/accountCreate';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('AccountCreateModal unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch = jest.fn();
    });

    it('produces the AccountCreateModal modal', () => {
        const wrapper = mount(<Login />);
        const app = wrapper.find('App');
        modalFactories.accountCreate(app.props().dispatch);
        const find = wrapper.find('AccountCreateModal');
        expect(find.length).toEqual(1);
    });

    it('renders AccountCreateModal', () => {
        const wrapper = mount(<AccountCreateModal store={store} />);
        expect(wrapper.length).toEqual(1);
    });

    it('handles handleKeyDown with keyCode of 13', () => {
        const wrapper = shallow(<AccountCreateModal store={store} />);
        wrapper.instance().doAccountCreate = jest.fn();
        wrapper.instance().handleKeyDown({ keyCode: 13, });
        expect(wrapper.instance().doAccountCreate.mock.calls.length)
            .toEqual(1);
    });

    it('rejects handleKeyDown with keyCode !== 13', () => {
        const wrapper = shallow(<AccountCreateModal store={store} />);
        wrapper.instance().doAccountCreate = jest.fn();
        wrapper.instance().handleKeyDown({ keyCode: 14, })
        expect(wrapper.instance().doAccountCreate.mock.calls.length)
            .toEqual(0);
    });

    it('handles handleNameChange', () => {
        const component = <AccountCreateModal
            store={store}
            dispatch={store.dispatch} />

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'foobar',
            },
        };

        wrapper.instance().handleNameChange(e);

        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                name: 'foobar',
                type: 'setAccountCreatingName',
            },
        ]);
    });

    it('handles handlePasswordChange', () => {
        const component = <AccountCreateModal
            store={store}
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'bazbar',
            },
        };

        wrapper.instance().handlePasswordChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                password: 'bazbar',
                type: 'setAccountCreatingPassword',
            },
        ]);
    });

    it('handles handleEmailChange', () => {
        const component = <AccountCreateModal
            store={store}
            dispatch={store.dispatch} />

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'buxbuzz',
            },
        };

        wrapper.instance().handleEmailChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                email: 'buxbuzz',
                type: 'setAccountCreatingEmail',
            },
        ]);
    });

    it('handles doAccountCreate with success', async () => {
        jest.useFakeTimers();

        accountCreate.mockClear();
        accountCreate.mockImplementationOnce(() => true);

        const component = <AccountCreateModal
            store={store}
            name="foo"
            password="bar"
            email="baz" />;

        const wrapper = shallow(component);
        await wrapper.instance().doAccountCreate();

        expect(accountCreate.mock.calls.length).toEqual(1);
        const args = [ store, 'foo', 'bar', 'baz', ];
        expect(accountCreate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles doAccountCreate with failure', async () => {
        jest.useFakeTimers();

        accountCreate.mockClear();
        accountCreate.mockImplementationOnce(() => false);
        modalClose.mockClear();

        const component = <AccountCreateModal
            store={store}
            name="foo"
            password="bar"
            email="baz" />;

        /* must be mounted for refs to exist */
        const wrapper = mount(component);
        await wrapper.instance().doAccountCreate();

        expect(accountCreate.mock.calls.length).toEqual(1);
        const args = [ store, 'foo', 'bar', 'baz', ];
        expect(accountCreate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});