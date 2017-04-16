// metadata for each pane

export function panesReducer(previous = panesSource, action) {
    if (action.type === 'setPanes') {
        if (action.panes && typeof(action.panes) === 'object') {
            return action.panes;
        }
    }

    return previous;
}

const startPane =
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1) ||
    'home';

export function selectedPaneReducer(previous = startPane, action) {
    if (action.type === 'setSelectedPane') {
        if (action.selectedPane && typeof(action.selectedPane) === 'string') {
            return action.selectedPane;
        }
    }

    return previous;
}

export function csrfTokenReducer(previous = null, action) {
    if (action.type === 'setCSRFToken') {
        if (action.csrfToken && typeof(action.csrfToken) === 'string') {
            return action.csrfToken;
        }
    }

    return previous;
}

export function modalReducer(previous = null, action) {
    if (action.type === 'setModal') {
        if (typeof(action.modal) === 'object') {
            return action.modal;
        }
    }

    return previous;
}

import * as reducers from './appReducers';
import panesSource from './panesSource';

describe('app reducer unit tests', () => {
    it('should return the initial panes state', () => {
        expect(reducers.panesReducer(undefined, {}))
            .toEqual(panesSource);
    });

    it('should handle setPanes', () => {
        expect(
          reducers.panesReducer('', {
            type: 'setPanes',
            panes: {a: 'b'},
          })
        ).toEqual({a: 'b'});
    });

    it('should return the initial selectedPane state', () => {
        expect(reducers.selectedPaneReducer(undefined, {}))
            .toEqual('home');
    });

    it('should handle setSelectedPane', () => {
        expect(
          reducers.selectedPaneReducer('', {
            type: 'setSelectedPane',
            selectedPane: 'login',
          })
        ).toEqual('login');
    });

    it('should return the initial csrfToken state', () => {
        expect(reducers.csrfTokenReducer(undefined, {})).toEqual(null);
    });

    it('should handle setSelectedPane', () => {
        expect(
          reducers.csrfTokenReducer('', {
            type: 'setCSRFToken',
            csrfToken: 'foobarbaz',
          })
        ).toEqual('foobarbaz');
    });

    it('should return the initial modal state', () => {
        expect(reducers.modalReducer(undefined, {})).toEqual(null);
    });

    it('should handle setModal', () => {
        expect(
          reducers.modalReducer('', {
            type: 'setModal',
            modal: {},
          })
        ).toEqual({});
    });
});