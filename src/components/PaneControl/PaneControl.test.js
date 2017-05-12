// react
import React from 'react';

// enzyme
import { shallow, mount, } from 'enzyme';

// components
import PaneControl from './PaneControl';

describe('PaneControl unit tests', () => {
    it('renders PaneControl', () => {
        const wrapper = shallow(<PaneControl />);
        expect(wrapper.length).toEqual(1);
    });

    it('renders PaneControl with panes', () => {
        const panes = {
            foo: {
                content: <div className="__test"></div>,
            },
        };

        const wrapper = mount(<PaneControl panes={panes} />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('.__test').length).toEqual(1);
    });

    it('renders PaneControl with class prop placed in className', () => {
        const wrapper = mount(<PaneControl class="__testing__" />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('.__testing__').length).toEqual(1);
    });
});