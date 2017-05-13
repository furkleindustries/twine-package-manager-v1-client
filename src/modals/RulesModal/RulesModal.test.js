// react
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

// enzyme
import { shallow, } from 'enzyme';

// redux
import store from '../../store';

// components
import { RulesModal, } from './RulesModal';
import rootComponent from '../../rootComponent';

import * as modalFactories from '../../modules/modals/factories';

const dispatch = store.dispatch;

describe('RulesModal unit tests', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    it('produces the RulesModal modal', () => {
        window.localStorage = {};

        store.dispatch = dispatch;
        const component = ReactTestUtils.renderIntoDocument(rootComponent);
        modalFactories.rules();
        const find = ReactTestUtils.scryRenderedComponentsWithType(
            component,
            RulesModal);
        expect(find.length).toEqual(1);
    });

    it('renders RulesModal', () => {
        const wrapper = shallow(<RulesModal />);
        expect(wrapper.length).toEqual(1);
    });
});