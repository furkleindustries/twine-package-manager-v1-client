/* react */
import React from 'react';

/* enzyme */
import { shallow, } from 'enzyme';

/* components */
import Modal from './Modal';

/* modules */
jest.mock('../../modules/modals/close');
import modalClose from '../../modules/modals/close';

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

    it('calls the modal close function and passes it store.dispatch when doModalClose is called', () => {
        const store = {};
        store.dispatch = jest.fn();        

        const wrapper = shallow(<Modal store={store} />);
        wrapper.instance().doModalClose();

        expect(modalClose.mock.calls.length).toBe(1);
        expect(modalClose.mock.calls[0]).toEqual([ store.dispatch, ]);
    });
});