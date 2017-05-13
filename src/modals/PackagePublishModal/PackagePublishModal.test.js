// react
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

// enzyme
import { shallow, } from 'enzyme';

// redux
import store from '../../store';

// components
import { PackagePublishModal, } from './PackagePublishModal';
import rootComponent from '../../rootComponent';

// modules
jest.mock('../../modules/packagePublish');
import packagePublish from '../../modules/packagePublish';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('PackagePublishModal unit tests', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    it('produces the PackagePublishModal modal', () => {
        window.localStorage = {};

        store.dispatch = dispatch;
        const component = ReactTestUtils.renderIntoDocument(rootComponent);
        modalFactories.togglePackagePublish();
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            PackagePublishModal);
        expect(find.length).toEqual(1);
    });

    it('renders PackagePublishModal', () => {
        const wrapper = shallow(<PackagePublishModal />);
        expect(wrapper.length).toEqual(1);
    });

    it('handles publishPackage with success', async () => {
        jest.useFakeTimers();

        packagePublish.mockClear();
        packagePublish.mockImplementationOnce(() => true);
        modalClose.mockClear();

        const component = <PackagePublishModal
            id={213}
            published={true}
            csrfToken="abcdef" />

        const wrapper = shallow(component);
        await wrapper.instance().publishPackage();

        expect(packagePublish.mock.calls.length).toEqual(1);
        const args = [213, false, 'abcdef'];
        expect(packagePublish.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles publishPackage with failure', async () => {
        jest.useFakeTimers();

        packagePublish.mockClear();
        packagePublish.mockImplementationOnce(() => false);
        modalClose.mockClear();

        const component = <PackagePublishModal
            id={245}
            published={false}
            csrfToken="testing" />

        const wrapper = shallow(component);
        await wrapper.instance().publishPackage();

        expect(packagePublish.mock.calls.length).toEqual(1);
        const args = [245, true, 'testing'];
        expect(packagePublish.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});