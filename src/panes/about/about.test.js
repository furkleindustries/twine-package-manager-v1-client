/* react */
import React from 'react';

/* next */
jest.mock('next/router');

/* enzyme */
import { shallow, mount, } from 'enzyme';

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
import ConnectedAbout, {
    AboutPage,
    getInitialProps,
} from '../../../pages/about';

/* modules */
jest.mock('../../modules/modals/create');
import create from '../../modules/modals/create';

describe('AboutPage unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        store.dispatch.mockClear();
        create.mockClear();

        Object.keys(actionMocks).forEach((key) => {
            actionMocks[key].mockClear();
        });
    });

    it('renders the connected AboutPage component', () => {
        const wrapper = mount(<ConnectedAbout />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides setSideBarVisible', () => {
        const wrapper = shallow(<AboutPage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]); 
    });

    it('calls this.modalCreateRules if location.hash === rules', () => {
        window.location.hash = '#rules';

        const wrapper = shallow(<AboutPage dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(create.mock.calls.length).toBe(1);
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