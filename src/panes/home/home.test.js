/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* redux */
jest.mock('../../store');
import store from '../../store';

jest.mock('../../appActions');
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../../appActions';

setAppSelectedPane.mockImplementation(() => {
    return { type: 'setAppSelectedPane', };
});

setSideBarVisible.mockImplementation(() => {
    return { type: 'setSideBarVisible', };
});

/* components */
import { HomePane, } from './home';

describe('HomePane unit tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        setSideBarVisible.mockClear();
    });

    it('renders HomePane', () => {
        const wrapper = shallow(<HomePane />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible', () => {
        const wrapper = mount(<HomePane />);

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('handles side effects when this.redirect is called', () => {
        const wrapper = shallow(<HomePane />);

        const e = {
            target: { id: 'testfoo', },
        };

        wrapper.instance().redirect(e);

        expect(setAppSelectedPane.mock.calls.length).toBe(1);
        expect(setAppSelectedPane.mock.calls[0]).toEqual([ 'testfoo', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setAppSelectedPane', },
        ]);
    });
});