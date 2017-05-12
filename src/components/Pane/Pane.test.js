// react
import React from 'react';

// enzyme
import { shallow, } from 'enzyme';

// components
import Pane from './Pane';

describe('Pane unit tests', () => {
    it('renders Pane', () => {
        const wrapper = shallow(<Pane />);
        expect(wrapper.length).toEqual(1);
    });

    it('inserts content into Pane', () => {
        const content = <div className="__test"></div>;
        const wrapper = shallow(<Pane content={content} />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('.__test').length).toEqual(1);
    });

    it('hides Pane when visible is false', () => {
        const wrapper = shallow(<Pane visible={false} />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('.hidden').length).toEqual(1);
    });

    it('does not hide Pane when visible is true', () => {
        const wrapper = shallow(<Pane visible={true} />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('.hidden').length).toEqual(0);
    });
});