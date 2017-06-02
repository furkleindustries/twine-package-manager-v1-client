/* react */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { browserHistory, } from 'react-router';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* modules */
import panesSourceProfile from '../../../../panesSourceProfile';

/* components */
import { ProfileTransfersPane, } from './ProfileTransfersPane';
import Profile from '../../../../../pages/profile';
import {
    PackageOwned,
} from '../../../../components/PackageOwned/PackageOwned';

describe('ProfileTransfersPane tests', () => {
    beforeEach(() => {
        window.localStorage = {};
    });

    it('produces the ProfileTransfersPane', () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        app.props().dispatch({
            selectedPane: 'transfers',
            type: 'setSideBarSelectedPane',
        });

        const find = wrapper.find('ProfileTransfersPane');
        expect(find.length).toEqual(1);
    });

    it('renders ProfileTransfersPane', () => {
        const wrapper = shallow(<ProfileTransfersPane />);
        expect(wrapper.length).toEqual(1);
    });
});