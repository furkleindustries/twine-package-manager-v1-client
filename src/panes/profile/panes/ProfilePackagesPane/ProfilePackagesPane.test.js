/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* modules */
import panesSourceProfile from '../../../../panesSourceProfile';

/* components */
import { ProfilePackagesPane, } from './ProfilePackagesPane';
import Profile from '../../../../../pages/profile';
import {
    PackageOwned,
} from '../../../../components/PackageOwned/PackageOwned';

describe('ProfilePackagesPane tests', () => {
    beforeEach(() => {
        window.localStorage = {};
    });

    it('produces the connected ProfilePackagesPane', () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        app.props().dispatch({
            selectedPane: 'packages',
            type: 'setSideBarSelectedPane',
        });

        const find = wrapper.find(ProfilePackagesPane);
        expect(find.length).toEqual(1);
    });

    it('renders ProfilePackagesPane', () => {
        const wrapper = shallow(<ProfilePackagesPane />);
        expect(wrapper.length).toEqual(1);
    });

    it('creates PackageOwned from packages prop', () => {
        const packages = [
            { name: 'foo', },
            { name: 'bar', },
        ];

        const component = <ProfilePackagesPane packages={packages} />;
        const wrapper = shallow(component);

        expect(wrapper.find(PackageOwned).length).toBe(2);
    });
});