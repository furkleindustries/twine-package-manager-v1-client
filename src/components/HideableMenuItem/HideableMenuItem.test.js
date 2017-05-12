// react
import React from 'react';

// enzyme
import { shallow, } from 'enzyme';

// components
import HideableMenuItem from './HideableMenuItem';

describe('HideableMenuItem unit tests', () => {
    it('renders HideableMenuItem', () => {
        const wrapper = shallow(<HideableMenuItem />);
        expect(wrapper.length).toEqual(1);
    });

    it('assigns value to state from hiddenDefault prop', () => {
        const wrapper = shallow(<HideableMenuItem hiddenDefault={false} />);
        expect(wrapper.instance().state.hidden).toEqual(false);
    });

    it('changes HideableMenuItem state on label click', () => {
        const wrapper = shallow(<HideableMenuItem />);
        wrapper.find('.HideableMenuItem-title').simulate('click');
        expect(wrapper.instance().state.hidden).toEqual(false);
    });

    it('changes HideableMenuItem state on button click', () => {
        const wrapper = shallow(<HideableMenuItem />);
        wrapper.find('.HideableMenuItem-button').simulate('click');
        expect(wrapper.instance().state.hidden).toEqual(false);
    });
});