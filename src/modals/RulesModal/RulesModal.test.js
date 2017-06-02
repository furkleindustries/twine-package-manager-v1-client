/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* components */
import { RulesModal, } from './RulesModal';
import Index from '../../../pages/index';

import * as modalFactories from '../../modules/modals/factories';

describe('RulesModal unit tests', () => {
    beforeEach(() => {
        window.localStorage = {};
    });

    it('produces the RulesModal modal', () => {
        const wrapper = mount(<Index />);
        const app = wrapper.find('App');
        modalFactories.rules(app.props().dispatch);
        const find = wrapper.find('RulesModal');
        expect(find.length).toEqual(1);
    });

    it('renders RulesModal', () => {
        const wrapper = shallow(<RulesModal />);
        expect(wrapper.length).toEqual(1);
    });
});