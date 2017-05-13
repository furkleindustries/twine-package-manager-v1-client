// react
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

// enzyme
import { shallow, mount, } from 'enzyme';

// redux
import store from '../../store';

// components
import { PackageCreateModal, } from './PackageCreateModal';
import rootComponent from '../../rootComponent';

// modules
jest.mock('../../modules/packageCreate');
import packageCreate from '../../modules/packageCreate';

jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('PackageCreateModal unit tests', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    it('produces the PackageCreateModal modal', () => {
        window.localStorage = {};

        store.dispatch = dispatch;
        const component = ReactTestUtils.renderIntoDocument(rootComponent);
        modalFactories.packageCreate();
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            PackageCreateModal);
        expect(find.length).toEqual(1);
    });

    it('renders PackageCreateModal', () => {
        const wrapper = shallow(<PackageCreateModal type="foo" />);
        expect(wrapper.length).toEqual(1);
    });

    it('renders PackageCreateModal with storythemes type', () => {
        const wrapper = shallow(<PackageCreateModal type="storythemes" />);
        const select = wrapper.find('#PackageEditModal-type');
        expect(select.length).toEqual(1);
        expect(select.get(0).props.value).toEqual('Story Themes');
    });

    it('renders PackageCreateModal with passagethemes type', () => {
        const wrapper = shallow(<PackageCreateModal type="passagethemes" />);
        const select = wrapper.find('#PackageEditModal-type');
        expect(select.length).toEqual(1);
        expect(select.get(0).props.value).toEqual('Passage Themes');
    });

    it('handles handleNameChange', () => {
        const wrapper = shallow(<PackageCreateModal type="bar" />);
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
                type: 'setPackageCreatingName',
            },
        ]);
    });

    it('handles handleTypeChange', () => {
        const wrapper = shallow(<PackageCreateModal type="baz" />);
        const e = {
            target: {
                value: 'bazbar',
            },
        };

        wrapper.instance().handleTypeChange(e);
        
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                creatingType: 'bazbar',
                type: 'setPackageCreatingType',
            },
        ]);
    });

    it('handles handleVersionChange', () => {
        const wrapper = shallow(<PackageCreateModal type="bux" />);
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
                type: 'setPackageCreatingVersion',
            },
        ]);
    });

    it('handles handleDescriptionChange', () => {
        const wrapper = shallow(<PackageCreateModal type="bux" />);
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
                type: 'setPackageCreatingDescription',
            },
        ]);
    });

    it('handles handleHomepageChange', () => {
        const wrapper = shallow(<PackageCreateModal type="dsfds" />);
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
                type: 'setPackageCreatingHomepage',
            },
        ]);
    });

    it('handles handleJsChange', () => {
        const wrapper = shallow(<PackageCreateModal type="adfsd" />);
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
                type: 'setPackageCreatingJs',
            },
        ]);
    });

    it('handles handleCssChange', () => {
        const wrapper = shallow(<PackageCreateModal type="sdafsaad" />);
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
                type: 'setPackageCreatingCss',
            },
        ]);
    });

    it('handles handleKeywordsChange', () => {
        const wrapper = shallow(<PackageCreateModal type="dfhj" />);
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
                type: 'setPackageCreatingKeywords',
            },
        ]);
    });

    it('handles handleTagChange', () => {
        const wrapper = shallow(<PackageCreateModal type="dfhj" />);
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
                type: 'setPackageCreatingTag',
            },
        ]);
    });

    it('handles createPackage with success', async () => {
        jest.useFakeTimers();

        packageCreate.mockClear();
        packageCreate.mockImplementationOnce(() => true);
        modalClose.mockClear();

        const pkg = {
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

        const component = <PackageCreateModal {...pkg} csrfToken="_token" />

        const wrapper = shallow(component);
        await wrapper.instance().createPackage();

        expect(packageCreate.mock.calls.length).toEqual(1);
        const args = [pkg, '_token'];
        expect(packageCreate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();

        expect(modalClose.mock.calls.length).toEqual(1);
    });

    it('handles createPackage with failure', async () => {
        jest.useFakeTimers();

        packageCreate.mockClear();
        packageCreate.mockImplementationOnce(() => false);
        modalClose.mockClear();

        const pkg = {
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

        const component = <PackageCreateModal {...pkg} csrfToken="_token" />

        // must be mounted for refs to exist
        const wrapper = mount(component);
        await wrapper.instance().createPackage();

        expect(packageCreate.mock.calls.length).toEqual(1);
        const args = [pkg, '_token'];
        expect(packageCreate.mock.calls[0]).toEqual(args);

        jest.runAllTimers();
        
        expect(modalClose.mock.calls.length).toEqual(0);
    });
});