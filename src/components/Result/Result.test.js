/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* components */
import Result from './Result';
import Keyword from './Keyword';

describe('Result unit tests', () => {
    it('renders Result', () => {
        const wrapper = shallow(<Result />);
        expect(wrapper.length).toEqual(1);
    });

    it('renders Result with Keyword', () => {
        const wrapper = mount(<Result keywords="foo bar" />);
        expect(wrapper.find('.Keyword').length).toEqual(2);
    });

    it('tests Result\'s openResult method', () => {
        const wrapper = mount(<Result keywords="foo bar" />);
        wrapper.instance().openResult();
    });

    it('renders Keyword', () => {
        const wrapper = shallow(<Keyword />);
        expect(wrapper.length).toEqual(1);
    });

    it('tests Keyword\'s openKeyword method', () => {
        const wrapper = shallow(<Keyword />);
        wrapper.instance().openKeyword();
    });
});