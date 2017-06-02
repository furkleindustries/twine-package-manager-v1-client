/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* redux */
const store = {};
store.dispatch = jest.fn();

import {
    setAppSelectedPane,
    setSideBarPanes,
    setSideBarSelectedPane,
} from '../../../../appActions';

jest.mock('../../profileActions');
import {
    setProfileRollback,
    setProfileDateCreatedVisible,
    setProfileName,
    setProfileNameVisible,
    setProfileDescription,
    setProfileEmail,
    setProfileEmailVisible,
    setProfileHomepage,
    setProfileDateStyle,
    setProfileTimeStyle,
} from '../../profileActions';

const actionMocks = {
    setProfileRollback,
    setProfileDateCreatedVisible,
    setProfileName,
    setProfileNameVisible,
    setProfileDescription,
    setProfileEmail,
    setProfileEmailVisible,
    setProfileHomepage,
    setProfileDateStyle,
    setProfileTimeStyle,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(value => {
        return { type: key, };
    });
});

/* modules */
jest.mock('../../../../modules/accountUpdate');
import accountUpdate from '../../../../modules/accountUpdate';

import panesSourceProfile from '../../../../panesSourceProfile';

/* components */
import { ProfileInfoPane, } from './ProfileInfoPane';
import Profile from '../../../../../pages/Profile';

describe('ProfileInfoPane tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        
        store.dispatch.mockClear();

        accountUpdate.mockClear();

        Object.keys(actionMocks).forEach(key => {
            actionMocks[key].mockClear();
        });
    });

    it('produces the connected ProfileInfoPane', () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        app.props().dispatch({
            selectedPane: 'info',
            type: 'setSideBarSelectedPane',
        });

        const find = wrapper.find(ProfileInfoPane);
        expect(find.length).toEqual(1);
    });

    it('renders ProfileInfoPane', () => {
        const wrapper = shallow(<ProfileInfoPane />);
        expect(wrapper.length).toEqual(1);
    });

    it('creates and dispatches a filtered rollback when mounted', () => {
        const component = <ProfileInfoPane
            test="foo"
            changed={false}
            rollback={{}}
            packages={[]}
            csrfToken="test_token"
            dispatch={store.dispatch} />

        const wrapper = mount(component);

        expect(setProfileRollback.mock.calls.length).toBe(1);
        expect(setProfileRollback.mock.calls[0]).toEqual([
            { test: 'foo', },
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileRollback', },
        ]);
    });

    it('creates correct side effects when handleDateCreatedVisibleChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleDateCreatedVisibleChange({
            target: { checked: true, },
        });

        expect(setProfileDateCreatedVisible.mock.calls.length).toBe(1);
        expect(setProfileDateCreatedVisible.mock.calls[0]).toEqual([ true, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileDateCreatedVisible', },
        ]);
    });

    it('creates correct side effects when handleNameChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleNameChange({
            target: { value: 'testing1', },
        });

        expect(setProfileName.mock.calls.length).toBe(1);
        expect(setProfileName.mock.calls[0]).toEqual([
            'testing1',
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileName', },
        ]);
    });

    it('creates correct side effects when handleNameVisibleChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleNameVisibleChange({
            target: { checked: true, },
        });

        expect(setProfileNameVisible.mock.calls.length).toBe(1);
        expect(setProfileNameVisible.mock.calls[0]).toEqual([ true, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileNameVisible', },
        ]);
    });

    it('creates correct side effects when handleDescriptionChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleDescriptionChange({
            target: { value: 'testing2', },
        });

        expect(setProfileDescription.mock.calls.length).toBe(1);
        expect(setProfileDescription.mock.calls[0]).toEqual([
            'testing2',
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileDescription', },
        ]);
    });

    it('creates correct side effects when handleEmailChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleEmailChange({
            target: { value: 'testing3', },
        });

        expect(setProfileEmail.mock.calls.length).toBe(1);
        expect(setProfileEmail.mock.calls[0]).toEqual([
            'testing3',
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileEmail', },
        ]);
    });

    it('creates correct side effects when handleEmailVisibleChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleEmailVisibleChange({
            target: { checked: false, },
        });

        expect(setProfileEmailVisible.mock.calls.length).toBe(1);
        expect(setProfileEmailVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileEmailVisible', },
        ]);
    });

    it('creates correct side effects when handleHomepageChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleHomepageChange({
            target: { value: 'testing4', },
        });

        expect(setProfileHomepage.mock.calls.length).toBe(1);
        expect(setProfileHomepage.mock.calls[0]).toEqual([ 'testing4', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileHomepage', },
        ]);
    });

    it('creates correct side effects when handleDateStyleChange is called with e.target.value of month/day/year', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleDateStyleChange({
            target: { value: 'month/day/year', },
        });

        expect(setProfileDateStyle.mock.calls.length).toBe(1);
        expect(setProfileDateStyle.mock.calls[0]).toEqual([ 'mmdd', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileDateStyle', },
        ]);
    });

    it('creates correct side effects when handleDateStyleChange is called with e.target.value of day/month/year', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleDateStyleChange({
            target: { value: 'day/month/year', },
        });

        expect(setProfileDateStyle.mock.calls.length).toBe(1);
        expect(setProfileDateStyle.mock.calls[0]).toEqual([ 'ddmm', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileDateStyle', },
        ]);
    });

    it('throws exception when handleDateStyleChange is called with e.target.value !== month/day/year and !== day/month/year', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        expect(() => {
            wrapper.instance().handleDateStyleChange({
                target: { value: 'not valid', },
            });
        }).toThrow();

        expect(setProfileDateStyle.mock.calls.length).toBe(0);
        expect(store.dispatch.mock.calls.length).toBe(0);
    });

    it('creates correct side effects when handleHomepageChange is called', () => {
        const wrapper = shallow(<ProfileInfoPane dispatch={store.dispatch} />);
        
        wrapper.instance().handleHomepageChange({
            target: { value: 'testing4', },
        });

        expect(setProfileHomepage.mock.calls.length).toBe(1);
        expect(setProfileHomepage.mock.calls[0]).toEqual([ 'testing4', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setProfileHomepage', },
        ]);
    });

    it('creates correct side effects when handleTimeStyleChange is called', () => {
        const dispatchMock = jest.fn();
        const wrapper = shallow(<ProfileInfoPane dispatch={dispatchMock} />);
        
        wrapper.instance().handleTimeStyleChange({
            target: { value: 'testing5', },
        });

        expect(setProfileTimeStyle.mock.calls.length).toBe(1);
        expect(setProfileTimeStyle.mock.calls[0]).toEqual([ 'testing5', ]);

        expect(dispatchMock.mock.calls.length).toBe(1);
        expect(dispatchMock.mock.calls[0]).toEqual([
            { type: 'setProfileTimeStyle', },
        ]);
    });

    it('creates correct return when getNameVisibleChecked is called when props.nameVisible is truthy', () => {
        const wrapper = shallow(<ProfileInfoPane nameVisible={true} />);
        
        expect(wrapper.instance().getNameVisibleChecked()).toBe('checked');
    });

    it('creates correct return when getNameVisibleChecked is called with props.nameVisible is falsey', () => {
        const wrapper = shallow(<ProfileInfoPane nameVisible={false} />);
        
        expect(wrapper.instance().getNameVisibleChecked()).toBe(null);
    });

    it('creates correct return when getDateCreatedVisibleChecked is called when props.dateCreatedVisible is truthy', () => {
        const wrapper = shallow(<ProfileInfoPane dateCreatedVisible={true} />);
        
        expect(wrapper.instance().getDateCreatedVisibleChecked())
            .toBe('checked');
    });

    it('creates correct return when getDateCreatedVisibleChecked is called with props.dateCreatedVisible is falsey', () => {
        const wrapper = shallow(<ProfileInfoPane dateCreatedVisible={false} />);
        
        expect(wrapper.instance().getDateCreatedVisibleChecked()).toBe(null);
    });

    it('creates correct return when getNameVisibleChecked is called when props.emailVisible is truthy', () => {
        const wrapper = shallow(<ProfileInfoPane emailVisible={true} />);
        
        expect(wrapper.instance().getEmailVisibleChecked()).toBe('checked');
    });

    it('creates correct return when getNameVisibleChecked is called with props.emailVisible is falsey', () => {
        const wrapper = shallow(<ProfileInfoPane emailVisible={false} />);
        
        expect(wrapper.instance().getEmailVisibleChecked()).toBe(null);
    });

    it('creates correct return when getPrettyDateStyle is called with props.dateStyle === ddmm', () => {
        const wrapper = shallow(<ProfileInfoPane dateStyle="ddmm" />);

        expect(wrapper.instance().getPrettyDateStyle()).toBe('day/month/year');
    });

    it('creates correct return when getPrettyDateStyle is called with props.dateStyle !== ddmm', () => {
        const wrapper = shallow(<ProfileInfoPane dateStyle="mmdd" />);

        expect(wrapper.instance().getPrettyDateStyle()).toBe('month/day/year');
    });

    it('creates correct side effects when updateProfile is called', () => {
        const obj = {
            dateCreatedVisible: false,
            name: 'tester',
            nameVisible: true,
            description: 'test description',
            email: 'test@test.com',
            emailVisible: false,
            homepage: 'test.com',
            dateStyle: 'ddmm',
            timeStyle: '24h',
        };

        const component = <ProfileInfoPane
            csrfToken="test_token"
            {...obj} />;

        const wrapper = shallow(component);

        wrapper.instance().updateProfile();

        expect(accountUpdate.mock.calls.length).toBe(1);
        expect(accountUpdate.mock.calls[0]).toEqual([ obj, 'test_token', ]);
    });

    it('uses empty string fallback values for name, description, email, and homepage when calling updateProfile', () => {
        const wrapper = shallow(<ProfileInfoPane />);

        wrapper.instance().updateProfile();
        expect(accountUpdate.mock.calls[0]).toEqual([
            {
                name: '',
                description: '',
                email: '',
                homepage: '',
            },

            undefined,
        ]);
    });
});