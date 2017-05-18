// react
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

// enzyme
import { shallow, mount, } from 'enzyme';

// redux
import store from '../../store';

// components
import { PackageEditModal, } from './PackageEditModal';
import rootComponent from '../../rootComponent';

// modules
jest.mock('../../modules/packageUpdate');
import packageUpdate from '../../modules/packageUpdate';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

jest.mock('../../modules/packageTransferOwnership');
import packageTransferOwnership from '../../modules/packageTransferOwnership';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('PackageEditModal unit tests', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    it('produces the PackageEditModal modal', () => {
        window.localStorage = {};

        store.dispatch = dispatch;

        const component = ReactTestUtils.renderIntoDocument(rootComponent);
        
        modalFactories.packageEdit();
        
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            PackageEditModal);
        
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
        const wrapper = shallow(<PackageEditModal type="bar" />);
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

        const wrapper = shallow(<PackageEditModal type="bar" { ...args } />);

        wrapper.instance().transferOwnership();

        expect(packageTransferOwnership.mock.calls.length).toEqual(1);
        expect(packageTransferOwnership.mock.calls[0]).toEqual(
            [args.id, args.newOwner, args.csrfToken]);
    });

    it('handles handleNameChange', () => {
        const wrapper = shallow(<PackageEditModal type="bar" />);
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
        const wrapper = shallow(<PackageEditModal type="baz" />);
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
        const wrapper = shallow(<PackageEditModal type="bux" />);
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
        const wrapper = shallow(<PackageEditModal type="bux" />);
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
        const wrapper = shallow(<PackageEditModal type="dsfds" />);
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
        const wrapper = shallow(<PackageEditModal type="adfsd" />);
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
        const wrapper = shallow(<PackageEditModal type="sdafsaad" />);
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
        const wrapper = shallow(<PackageEditModal type="dfhj" />);
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
        const wrapper = shallow(<PackageEditModal type="dfhj" />);
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
        jest.useFakeTimers();

        packageUpdate.mockClear();
        packageUpdate.mockImplementationOnce(() => true);
        modalClose.mockClear();

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

        const component = <PackageEditModal {...pkg} csrfToken="_token" />

        const wrapper = shallow(component);
        await wrapper.instance().updatePackage();

        expect(packageUpdate.mock.calls.length).toEqual(1);
        const args = [pkg, '_token'];
        expect(packageUpdate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles editPackage with failure', async () => {
        jest.useFakeTimers();

        packageUpdate.mockClear();
        packageUpdate.mockImplementationOnce(() => false);
        modalClose.mockClear();

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

        const component = <PackageEditModal { ...pkg } csrfToken="_token" />

        // must be mounted for refs to exist
        const wrapper = mount(component);
        await wrapper.instance().updatePackage();

        expect(packageUpdate.mock.calls.length).toEqual(1);
        const args = [pkg, '_token'];
        expect(packageUpdate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();
        
        expect(modalClose.mock.calls.length).toEqual(0);
    });
});