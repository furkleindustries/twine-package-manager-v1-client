import * as actions from './appActions'

describe('app action unit tests', () => {
    it('creates a valid setPanes action', () => {
    	const panes = {
			test: 'testing',
		};

    	const object = {
    		panes,
    		type: 'setPanes',
    	};

    	expect(actions.setPanes(panes)).toEqual(object);
    });

    it('creates a valid setSelectedPane action', () => {
    	const selectedPane = 'testing';

    	const object = {
    		selectedPane,
    		type: 'setSelectedPane',
    	};

    	expect(actions.setSelectedPane(selectedPane)).toEqual(object);
    });

    it('creates a valid setModal action', () => {
    	const modal = {
    		test: 'testing',
    	};

    	const object = {
    		modal,
    		type: 'setModal',
    	};

    	expect(actions.setModal(modal)).toEqual(object);
    });

    it('creates a valid setCSRFToken action', () => {
    	const csrfToken = 'test';

    	const object = {
    		csrfToken,
    		type: 'setCSRFToken',
    	};

    	expect(actions.setCSRFToken(csrfToken)).toEqual(object);
    });
});