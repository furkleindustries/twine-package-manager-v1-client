/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* modules */
import panesSourceProfile from '../../../../panesSourceProfile';

jest.mock('../../../../modules/modals/factories');
import * as modalFactories from '../../../../modules/modals/factories';

jest.mock('../../../../modules/logout');
import logout from '../../../../modules/logout';

/* components */
import { ProfileAccountPane, } from './ProfileAccountPane';
import Profile from '../../../../../pages/profile';

describe('ProfileAccountPane tests', () => {
    beforeEach(() => {
        window.localStorage = {};        
    });

    it('produces the connected ProfileAccountPane', () => {
        const wrapper = mount(<Profile />);
        const app = wrapper.find('App');
        app.props().dispatch({
            selectedPane: 'account',
            type: 'setSideBarSelectedPane',
        });

        const find = wrapper.find(ProfileAccountPane);
        expect(find.length).toEqual(1);
    });

    it('renders ProfileAccountPane', () => {
        const wrapper = shallow(<ProfileAccountPane />);
        expect(wrapper.length).toEqual(1);
    });

    it('calls modalFactories.accountDelete when spawnAccountDeleteModal is called', () => {
        const store = { dispatch: jest.fn(), };
        const component = <ProfileAccountPane dispatch={store.dispatch} />;
        const wrapper = shallow(component);

        wrapper.instance().spawnAccountDeleteModal();
        
        expect(modalFactories.accountDelete.mock.calls.length).toBe(1);
        expect(modalFactories.accountDelete.mock.calls[0]).toEqual([
            store.dispatch,
        ]);
    });

    it('calls logout when doLogout is called', () => {
        const store = { dispatch: jest.fn(), };
        const component = <ProfileAccountPane store={store} />;
        const wrapper = shallow(component);

        wrapper.instance().doLogout();
        expect(logout.mock.calls.length).toBe(1);
        expect(logout.mock.calls[0]).toEqual([ store, ]);
    });
});