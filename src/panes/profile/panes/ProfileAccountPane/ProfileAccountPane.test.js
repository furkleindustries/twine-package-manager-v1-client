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
import { ProfileAccountPane, } from './ProfileAccountPane';
import rootComponent from '../../../../rootComponent';

describe('ProfileAccountPane tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        
        store.dispatch = jest.fn();
    });

    it('produces the connected ProfileAccountPane', () => {
        const baseUrl = process.env.PUBLIC_URL;

        window.localStorage = { twinepmCSRFToken: 'test', };
        
        store.dispatch = dispatch;
  
        const component = ReactTestUtils.renderIntoDocument(rootComponent);

        browserHistory.push(`${baseUrl}/profile`);

        store.dispatch(setAppSelectedPane('profile'));
        store.dispatch(setSideBarPanes(panesSourceProfile));
        store.dispatch(setSideBarSelectedPane('account'));
        
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            ProfileAccountPane);
        
        expect(find.length).toEqual(1);
    });

    it('renders ProfileAccountPane', () => {
        const wrapper = shallow(<ProfileAccountPane />);
        expect(wrapper.length).toEqual(1);
    });
});