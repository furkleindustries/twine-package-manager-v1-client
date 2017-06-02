/* react */
import React from 'react';

/* enzyme */
import { shallow, } from 'enzyme';

/* next */
import Link from 'next/link';

/* components */
import { NavBarItem, } from './NavBarItem';

describe('NavBarItem tests', () => {
    it('renders NavBarItem with router link', () => {
        const wrapper = shallow(<NavBarItem useRouterLink={true} />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find(Link).length).toEqual(1);
    });

    it('renders NavBarItem with button', () => {
        const wrapper = shallow(<NavBarItem useRouterLink={false} />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('button').length).toEqual(1);
    });

    it('renders NavBarItem with button and active', () => {
        const component = <NavBarItem active={true} useRouterLink={false} />;
        const wrapper = shallow(component);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('.active').length).toEqual(1);
    });

    it('renders NavBarItem with button and visible', () => {
        const component = <NavBarItem visible={true} useRouterLink={false} />;
        const wrapper = shallow(component);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('.hidden').length).toEqual(0);
    });

    it('calls props.navBarItemClick and passes event and props.dispatch when doNavBarItemClick is called', () => {
        const store = {};
        store.dispatch = jest.fn();

        const navBarItemClick = jest.fn();

        const component = <NavBarItem
            navBarItemClick={navBarItemClick}
            dispatch={store.dispatch} />;
        const wrapper = shallow(component);

        const event = { __testing: '__testing', };

        wrapper.instance().doNavBarItemClick(event, store.dispatch);

        expect(navBarItemClick.mock.calls.length).toBe(1);
        expect(navBarItemClick.mock.calls[0]).toEqual([
            event,
            store.dispatch,
        ]);
    });
});
