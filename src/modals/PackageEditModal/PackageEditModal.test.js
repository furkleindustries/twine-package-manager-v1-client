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
import { PackageEditModal, } from './PackageEditModal';
import Profile from '../../../pages/profile';

/* modules */
jest.mock('../../modules/packageUpdate');
import packageUpdate from '../../modules/packageUpdate';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

jest.mock('../../modules/packageTransferOwnership');
import packageTransferOwnership from '../../modules/packageTransferOwnership';

import * as modalFactories from '../../modules/modals/factories';

describe('PackageEditModal unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();
        packageUpdate.mockClear();
        modalClose.mockClear();
    });

    it('produces the PackageEditModal modal', () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        modalFactories.packageEdit(app.props().dispatch);
        const find = wrapper.find('PackageEditModal');
        expect(find.length).toEqual(1);
    });

    it('renders PackageEditModal', () => {
        const wrapper = shallow(<PackageEditModal type="foo" />);
        expect(wrapper.length).toEqual(1);
    });

    it('renders PackageEditModal with storythemes type', () => {
        const wrapper = shallow(<PackageEditModal type="storythemes" />);
        const select = wrapper.find('#PackageEditModal-type');
        expect(select.length).toEqual(1);
        expect(select.get(0).props.value).toEqual('Story Themes');
    });

    it('renders PackageEditModal with passagethemes type', () => {
        const wrapper = shallow(<PackageEditModal type="passagethemes" />);
        const select = wrapper.find('#PackageEditModal-type');
        expect(select.length).toEqual(1);
        expect(select.get(0).props.value).toEqual('Passage Themes');
    });

    it('handles handleNewOwnerChange', () => {
        const component = <PackageEditModal
            type="bar"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'new_owner',
            },
        };

        wrapper.instance().handleNewOwnerChange(e);

        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                newOwner: 'new_owner',
                type: 'setPackageEditingNewOwner',
            },
        ]);
    });

    it('handles transferOwnership', () => {
        const args = {
            id: 145,
            newOwner: 'hi!',
            csrfToken: 'test_token',
        };

        const component = <PackageEditModal
            type="bar"
            {...args}
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);

        wrapper.instance().transferOwnership();

        expect(packageTransferOwnership.mock.calls.length).toEqual(1);
        expect(packageTransferOwnership.mock.calls[0]).toEqual(
            [ args.id, args.newOwner, args.csrfToken ]);
    });

    it('handles handleNameChange', () => {
        const component = <PackageEditModal
            type="bar"
            dispatch={store.dispatch} />;

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
                type: 'setPackageEditingName',
            },
        ]);
    });

    it('handles handleTypeChange', () => {
        const component = <PackageEditModal
            type="baz"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'bazbar',
            },
        };

        wrapper.instance().handleTypeChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                editingType: 'bazbar',
                type: 'setPackageEditingType',
            },
        ]);
    });

    it('handles handleVersionChange', () => {
        const component = <PackageEditModal
            type="bux"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'buxbuzz',
            },
        };

        wrapper.instance().handleVersionChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                version: 'buxbuzz',
                type: 'setPackageEditingVersion',
            },
        ]);
    });

    it('handles handleDescriptionChange', () => {
        const component = <PackageEditModal
            type="bux"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'foob',
            },
        };

        wrapper.instance().handleDescriptionChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                description: 'foob',
                type: 'setPackageEditingDescription',
            },
        ]);
    });

    it('handles handleHomepageChange', () => {
        const component = <PackageEditModal
            type="dsfds"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'testing',
            },
        };

        wrapper.instance().handleHomepageChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                homepage: 'testing',
                type: 'setPackageEditingHomepage',
            },
        ]);
    });

    it('handles handleJsChange', () => {
        const component = <PackageEditModal
            type="adfsd"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'test js',
            },
        };

        wrapper.instance().handleJsChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                js: 'test js',
                type: 'setPackageEditingJs',
            },
        ]);
    });

    it('handles handleCssChange', () => {
        const component = <PackageEditModal
            type="sdafsaad"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'test css',
            },
        };

        wrapper.instance().handleCssChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                css: 'test css',
                type: 'setPackageEditingCss',
            },
        ]);
    });

    it('handles handleKeywordsChange', () => {
        const component = <PackageEditModal
            type="dfhj"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'test keywords',
            },
        };

        wrapper.instance().handleKeywordsChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                keywords: 'test keywords',
                type: 'setPackageEditingKeywords',
            },
        ]);
    });

    it('handles handleTagChange', () => {
        const component = <PackageEditModal
            type="dfhj"
            dispatch={store.dispatch} />;

        const wrapper = shallow(component);
        const e = {
            target: {
                value: 'test tag',
            },
        };

        wrapper.instance().handleTagChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                tag: 'test tag',
                type: 'setPackageEditingTag',
            },
        ]);
    });

    it('handles editPackage with success', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        packageUpdate.mockImplementationOnce(() => true);

        const pkg = {
            id: 12345,
            name: 'test',
            type: 'scripts',
            version: '1.2.3',
            description: 'test description',
            homepage: 'testerson.com',
            js: 'test js',
            css: 'test css',
            keywords: 'test tester testing',
            tag: 'test tag',
        };

        const component = <PackageEditModal
            {...pkg}
            csrfToken="_token"
            store={store} />

        const wrapper = shallow(component);
        await wrapper.instance().updatePackage();

        expect(packageUpdate.mock.calls.length).toEqual(1);
        const args = [ store, pkg, '_token', ];
        expect(packageUpdate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles editPackage with failure', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        packageUpdate.mockImplementationOnce(() => false);

        const pkg = {
            id: 12346,
            name: 'test',
            type: 'scripts',
            version: '1.2.3',
            description: 'test description',
            homepage: 'testerson.com',
            js: 'test js',
            css: 'test css',
            keywords: 'test tester testing',
            tag: 'test tag',
        };

        const component = <PackageEditModal
            {...pkg}
            csrfToken="_token"
            store={store} />;

        /* must be mounted for refs to exist */
        const wrapper = mount(component);
        await wrapper.instance().updatePackage();

        expect(packageUpdate.mock.calls.length).toEqual(1);
        const args = [ store, pkg, '_token', ];
        expect(packageUpdate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();
        
        expect(modalClose.mock.calls.length).toEqual(0);
    });
});