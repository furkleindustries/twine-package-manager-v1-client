// react
import React from 'react';

// redux
import { Provider } from 'react-redux';

// enzyme
import { shallow, } from 'enzyme';

// component
import { ProfilePane } from './profile';

describe('profile unit tests', () => {
    it('renders Profile without exploding', () => {
        const wrapper = shallow(<ProfilePane />);
        expect(wrapper.length).toEqual(1);
    });
});