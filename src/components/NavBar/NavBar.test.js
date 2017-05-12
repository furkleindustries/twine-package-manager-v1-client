// react
import React from 'react';
import { Link, } from 'react-router';

// enzyme
import { shallow, } from 'enzyme';

// components
import { NavBar, NavBarItem, } from './NavBar';

describe('NavBar and NavBarItem unit tests', () => {
    it('renders NavBar', () => {
        const panes = {
            foo: 'bar',
            baz: 'bux',
        };

        const wrapper = shallow(<NavBar panes={panes} />);
        expect(wrapper.length).toEqual(1);
    });

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
});