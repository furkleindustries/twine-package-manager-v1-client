// react
import React from 'react';

// enzyme
import { shallow, } from 'enzyme';

// component
import { App, } from './App';

import Home from './panes/home/home';

describe('app unit tests', () => {
    it('renders App', () => {
        const app = shallow(<App children={Home} />);
        expect(app.length).toEqual(1);
    });
});