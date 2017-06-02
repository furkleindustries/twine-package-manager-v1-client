/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* redux */
const store = {};
store.dispatch = jest.fn();

jest.mock('../../appActions');
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../../appActions';

const actionMocks = {
    setAppSelectedPane,
    setSideBarVisible,
};

Object.keys(actionMocks).forEach((key) => {
    actionMocks[key].mockImplementation(() => ( { type: key, } ));
});

/* components */
import ConnectedHome, {
    HomePage,
    getInitialProps,
} from '../../../pages/index';

describe('HomePage unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();

        Object.keys(actionMocks).forEach((key) => {
            actionMocks[key].mockClear();
        });
    });

    it('renders connected HomePage component', () => {
        const wrapper = mount(<ConnectedHome />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible', () => {
        const wrapper = shallow(<HomePage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('handles side effects when this.redirect is called', () => {
        const wrapper = shallow(<HomePage dispatch={store.dispatch} />);

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

    it('tests getInitialProps when req exists', async () => {
        await getInitialProps({ req: { url: '/foo', }, store, });

        expect(setAppSelectedPane.mock.calls.length).toBe(1);
        expect(setAppSelectedPane.mock.calls[0]).toEqual([ 'foo', ]);
        
        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setAppSelectedPane', },
        ]);
    });

    it('tests getInitialProps when req does not exist', async () => {
        await getInitialProps({ store, });

        expect(setAppSelectedPane.mock.calls.length).toBe(0);
        expect(store.dispatch.mock.calls.length).toBe(0);
    });
});