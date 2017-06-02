/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* redux */
const store = {};
store.dispatch = jest.fn();

/* components */
import PackageOwned from './PackageOwned';

/* modules */
jest.mock('../../modules/modals/factories');
import * as modalFactories from '../../modules/modals/factories';

describe('PackageOwned unit tests', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();

        Object.keys(modalFactories).forEach((key) => {
            if (typeof modalFactories[key] === 'function') {
                modalFactories[key].mockClear();
            }
        });
    });

    it('renders PackageOwned', () => {
        const wrapper = mount(<PackageOwned package={{}} />);
        expect(wrapper.length).toEqual(1);
    });

    it('renders PackageOwned with Unpublish showing when package.published is false', () => {
        const pkg = {
            published: true,
        };

        const wrapper = shallow(<PackageOwned package={pkg} />);
        const button = wrapper.find('.PackageOwned-togglePublish');
        expect(button.length).toEqual(1);
        expect(button.text()).toEqual('Unpublish');
    });

    it('handles makePublishModal', () => {
        const _package = {
            id: 16,
            published: false,
        };

        const component = <PackageOwned
            package={_package}
            store={store} />;

        const wrapper = shallow(component);
        wrapper.instance().makePublishModal();
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                publishing: _package,
                type: 'setPackagePublishing',
            }
        ]);
        expect(modalFactories.togglePackagePublish.mock.calls.length)
            .toEqual(1);
    });

    it('handles makeEditModal', () => {
        const _package = {
            id: 16,
        };

        const component = <PackageOwned
            package={_package}
            store={store} />;

        const wrapper = shallow(component);
        wrapper.instance().makeEditModal();
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                editing: _package,
                type: 'setPackageEditing',
            }
        ]);
        expect(modalFactories.packageEdit.mock.calls.length)
            .toEqual(1);
    });

    it('handles makeDeleteModal', () => {
        const _package = {
            id: 16,
            name: 'foo',
        };

        const component = <PackageOwned
            package={_package}
            store={store} />;

        const wrapper = shallow(component);
        wrapper.instance().makeDeleteModal();
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                deleting: _package,
                type: 'setPackageDeleting',
            }
        ]);
        expect(modalFactories.packageDelete.mock.calls.length)
            .toEqual(1);
    });

    it('handles #togglePackagePublish-\d+', () => {
        window.location.hash = '#togglePackagePublish-16';
        const _package = {
            id: 16,
            published: false,
        };

        const component = <PackageOwned
            package={_package}
            store={store} />;

        const wrapper = mount(component);
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                publishing: _package,
                type: 'setPackagePublishing',
            }
        ]);
        expect(modalFactories.togglePackagePublish.mock.calls.length)
            .toEqual(1);
    });

    it('handles #editPackage-\d+', () => {
        window.location.hash = '#editPackage-17';
        const _package = {
            id: 17,
        };

        const component = <PackageOwned
            package={_package}
            store={store} />;

        const wrapper = mount(component);
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                editing: _package,
                type: 'setPackageEditing',
            }
        ]);
        expect(modalFactories.packageEdit.mock.calls.length)
            .toEqual(1);
    });

    it('handles #deletePackage-\d+', () => {
        window.location.hash = '#deletePackage-18';
        const _package = {
            id: 18,
            name: 'bar',
        };

        const component = <PackageOwned
            package={_package}
            store={store} />

        const wrapper = mount(component);
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                deleting: _package,
                type: 'setPackageDeleting',
            }
        ]);
        expect(modalFactories.packageDelete.mock.calls.length)
            .toEqual(1);
    });
});