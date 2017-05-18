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
import { ProfileTransfersPane, } from './ProfileTransfersPane';
import rootComponent from '../../../../rootComponent';
import {
    PackageOwned,
} from '../../../../components/PackageOwned/PackageOwned';

describe('ProfileTransfersPane tests', () => {
    it('produces the ProfileTransfersPane', () => {
        window.localStorage = { twinepmCSRFToken: 'test', };

        const baseUrl = process.env.PUBLIC_URL;
        
        store.dispatch = dispatch;
  
        const component = ReactTestUtils.renderIntoDocument(rootComponent);

        browserHistory.push(`${baseUrl}/profile`);

        store.dispatch(setAppSelectedPane('profile'));
        store.dispatch(setSideBarPanes(panesSourceProfile));
        store.dispatch(setSideBarSelectedPane('transfers'));
        
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            ProfileTransfersPane);
        
        expect(find.length).toEqual(1);
    });

    it('renders ProfileTransfersPane', () => {
        const wrapper = shallow(<ProfileTransfersPane />);
        expect(wrapper.length).toEqual(1);
    });
});