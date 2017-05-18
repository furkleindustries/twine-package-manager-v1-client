/* react */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { browserHistory, } from 'react-router';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* redux */
import store from '../../../../store';
const dispatch = store.dispatch;

import {
    setAppSelectedPane,
    setSideBarPanes,
    setSideBarSelectedPane,
} from '../../../../appActions';

/* modules */
import panesSourceProfile from '../../../../panesSourceProfile';

/* components */
import { ProfilePackagesPane, } from './ProfilePackagesPane';
import rootComponent from '../../../../rootComponent';
import {
    PackageOwned,
} from '../../../../components/PackageOwned/PackageOwned';

describe('ProfilePackagesPane tests', () => {
    it('produces the connected ProfilePackagesPane', () => {
        window.localStorage = { twinepmCSRFToken: 'test', };

        const baseUrl = process.env.PUBLIC_URL;
        
        store.dispatch = dispatch;
  
        const component = ReactTestUtils.renderIntoDocument(rootComponent);

        browserHistory.push(`${baseUrl}/profile`);

        store.dispatch(setAppSelectedPane('profile'));
        store.dispatch(setSideBarPanes(panesSourceProfile));
        store.dispatch(setSideBarSelectedPane('packages'));
        
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            ProfilePackagesPane);
        
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