/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* redux */
jest.mock('../../store');
import store from '../../store';

jest.mock('../../appActions');
import { setSideBarVisible, } from '../../appActions';
setSideBarVisible.mockImplementation(() => {
    return { type: 'setSideBarVisible', };
});

/* components */
import { FourOhFourPane, } from './404';

describe('FourOhFourPane tests', () => {
    it('renders FourOhFourPane', () => {
        const wrapper = shallow(<FourOhFourPane />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible', () => {
        const wrapper = mount(<FourOhFourPane />);

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });
});