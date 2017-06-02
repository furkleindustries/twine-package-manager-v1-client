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
import { PackagePublishModal, } from './PackagePublishModal';
import Profile from '../../../pages/profile';

/* modules */
jest.mock('../../modules/packagePublish');
import packagePublish from '../../modules/packagePublish';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('PackagePublishModal unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();
        packagePublish.mockClear();
        modalClose.mockClear();
    });

    it('produces the PackagePublishModal modal', () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        modalFactories.togglePackagePublish(app.props().dispatch);
        const find = wrapper.find('PackagePublishModal');
        expect(find.length).toEqual(1);
    });

    it('renders PackagePublishModal', () => {
        const wrapper = shallow(<PackagePublishModal />);
        expect(wrapper.length).toEqual(1);
    });

    it('handles publishPackage with success', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        packagePublish.mockClear();
        packagePublish.mockImplementationOnce(() => true);
        modalClose.mockClear();

        const component = <PackagePublishModal
            id={213}
            published={true}
            csrfToken="abcdef"
            store={store} />

        const wrapper = shallow(component);
        await wrapper.instance().publishPackage();

        expect(packagePublish.mock.calls.length).toEqual(1);
        const args = [ store, 213, false, 'abcdef', ];
        expect(packagePublish.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles publishPackage with failure', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        packagePublish.mockImplementationOnce(() => false);

        const component = <PackagePublishModal
            id={245}
            published={false}
            csrfToken="testing"
            store={store} />

        const wrapper = shallow(component);
        await wrapper.instance().publishPackage();

        expect(packagePublish.mock.calls.length).toEqual(1);
        const args = [ store, 245, true, 'testing', ];
        expect(packagePublish.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});