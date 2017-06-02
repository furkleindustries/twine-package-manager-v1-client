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
import { PackageDeleteModal, } from './PackageDeleteModal';
import Profile from '../../../pages/profile';

/* modules */
jest.mock('../../modules/packageDelete');
import packageDelete from '../../modules/packageDelete';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('PackageDeleteModal unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();
        packageDelete.mockClear();
        modalClose.mockClear();
    });

    it('produces the PackageDeleteModal modal', () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        modalFactories.packageDelete(app.props().dispatch);
        const find = wrapper.find('PackageDeleteModal');
        expect(find.length).toEqual(1);
    });

    it('renders PackageDeleteModal', () => {
        const wrapper = shallow(<PackageDeleteModal />);
        expect(wrapper.length).toEqual(1);
    });

    it('handles deletePackage with success', async () => {
        jest.useFakeTimers();

        packageDelete.mockImplementationOnce(() => true);

        const component = <PackageDeleteModal
            id={213}
            csrfToken="abcdef"
            store={store} />

        const wrapper = shallow(component);
        await wrapper.instance().deletePackage();

        expect(packageDelete.mock.calls.length).toEqual(1);
        const args = [ store, 213, 'abcdef', ];
        expect(packageDelete.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles deletePackage with failure', async () => {
        jest.useFakeTimers();

        packageDelete.mockImplementationOnce(() => false);

        const component = <PackageDeleteModal
            id={245}
            csrfToken="testing"
            store={store} />

        const wrapper = shallow(component);
        await wrapper.instance().deletePackage();

        expect(packageDelete.mock.calls.length).toEqual(1);
        const args = [ store, 245, 'testing', ];
        expect(packageDelete.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});