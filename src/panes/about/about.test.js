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
import { AboutPane, } from './about';

/* modules */
jest.mock('../../modules/modals/create');
import create from '../../modules/modals/create';

describe('AboutPane unit tests', () => {
    it('renders AboutPane', () => {
        const wrapper = shallow(<AboutPane />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible', () => {
        const wrapper = mount(<AboutPane />);

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('calls this.modalCreateRules if location.hash === rules', () => {
        window.location.hash = '#rules';

        const wrapper = mount(<AboutPane />);

        expect(create.mock.calls.length).toBe(1);
    });
});