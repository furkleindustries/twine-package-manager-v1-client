// react
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

// enzyme
import { shallow, } from 'enzyme';

// redux
import store from '../../store';

// components
import { PackageDeleteModal, } from './PackageDeleteModal';
import rootComponent from '../../rootComponent';

// modules
jest.mock('../../modules/packageDelete');
import packageDelete from '../../modules/packageDelete';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('PackageDeleteModal unit tests', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    it('produces the PackageDeleteModal modal', () => {
        window.localStorage = {};

        store.dispatch = dispatch;
        const component = ReactTestUtils.renderIntoDocument(rootComponent);
        modalFactories.packageDelete();
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            PackageDeleteModal);
        expect(find.length).toEqual(1);
    });

    it('renders PackageDeleteModal', () => {
        const wrapper = shallow(<PackageDeleteModal />);
        expect(wrapper.length).toEqual(1);
    });

    it('handles deletePackage with success', async () => {
        jest.useFakeTimers();

        packageDelete.mockClear();
        packageDelete.mockImplementationOnce(() => true);
        modalClose.mockClear();

        const component = <PackageDeleteModal
            id={213}
            csrfToken="abcdef" />

        const wrapper = shallow(component);
        await wrapper.instance().deletePackage();

        expect(packageDelete.mock.calls.length).toEqual(1);
        const args = [213, 'abcdef'];
        expect(packageDelete.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles deletePackage with failure', async () => {
        jest.useFakeTimers();

        packageDelete.mockClear();
        packageDelete.mockImplementationOnce(() => false);
        modalClose.mockClear();

        const component = <PackageDeleteModal
            id={245}
            csrfToken="testing" />

        const wrapper = shallow(component);
        await wrapper.instance().deletePackage();

        expect(packageDelete.mock.calls.length).toEqual(1);
        const args = [245, 'testing'];
        expect(packageDelete.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});