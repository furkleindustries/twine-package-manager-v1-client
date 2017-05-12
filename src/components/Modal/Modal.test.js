// react
import React from 'react';

// enzyme
import { shallow, } from 'enzyme';

// components
import Modal from './Modal';

describe('Modal unit tests', () => {
    it('renders Modal', () => {
        const wrapper = shallow(<Modal />);
        expect(wrapper.length).toEqual(1);
    });

    it('embeds content within Modal', () => {
    	const content = <div className="__test"></div>;
        const wrapper = shallow(<Modal content={content} />);
        expect(wrapper.find('.__test').length).toEqual(1);
    });
});