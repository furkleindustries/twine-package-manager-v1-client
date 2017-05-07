import * as actions from './appActions'

describe('app action unit tests', () => {
    it('creates a valid setPanes action', () => {
        const panes = {
            test: 'testing',
        };

        const object = {
            panes,
            type: 'setAppPanes',
        };

        expect(actions.setAppPanes(panes)).toEqual(object);
    });

    it('creates a valid setAppSelectedPane action', () => {
        const selectedPane = 'testing';

        const object = {
            selectedPane,
            type: 'setAppSelectedPane',
        };

        expect(actions.setAppSelectedPane(selectedPane)).toEqual(object);
    });

    it('creates a valid setAppSelectedPane action', () => {
        const selectedPane = 'testing';

        const object = {
            selectedPane,
            type: 'setAppSelectedPane',
        };

        expect(actions.setAppSelectedPane(selectedPane)).toEqual(object);
    });

    it('creates a valid setSideBarPanes action', () => {
        const panes = {
            testing: 'test',
        };

        const object = {
            panes,
            type: 'setSideBarPanes',
        };

        expect(actions.setSideBarPanes(panes)).toEqual(object);
    });

    it('creates a valid setSideBarSelectedPane action', () => {
        const selectedPane = 'test';

        const object = {
            selectedPane,
            type: 'setSideBarSelectedPane',
        };

        expect(actions.setSideBarSelectedPane(selectedPane)).toEqual(object);
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