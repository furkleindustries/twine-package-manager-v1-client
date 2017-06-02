/* react */
import React from 'react';

/* enzyme */
import { shallow, } from 'enzyme';

/* components */
import { NavBar, } from './NavBar';

describe('NavBar and NavBarItem unit tests', () => {
    it('renders NavBar', () => {
        const panes = {
            foo: 'bar',
            baz: 'bux',
        };

        const wrapper = shallow(<NavBar panes={panes} />);
        expect(wrapper.length).toEqual(1);
    });
});