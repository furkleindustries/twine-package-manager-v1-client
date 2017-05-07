import * as reducers from './appReducers';
import panesSourceApp from './panesSourceApp';

describe('app reducer unit tests', () => {
    it('should return the initial app panes state', () => {
        expect(reducers.appPanesReducer(undefined, {}))
            .toEqual(panesSourceApp);
    });

    it('should handle setAppPanes', () => {
        expect(
          reducers.appPanesReducer('', {
            type: 'setAppPanes',
            panes: {a: 'b'},
          })
        ).toEqual({a: 'b'});
    });

    it('should return the initial appSelectedPane state', () => {
        expect(reducers.appSelectedPaneReducer(undefined, {})).toEqual('home');
    });

    it('should handle setAppSelectedPane', () => {
        expect(
          reducers.appSelectedPaneReducer('', {
            type: 'setAppSelectedPane',
            selectedPane: 'login',
          })
        ).toEqual('login');
    });

    it('should return the initial sidebar visible state', () => {
        expect(reducers.sideBarVisibleReducer(undefined, {})).toEqual(false);
    });

    it('should handle setSideBarVisible', () => {
        expect(
          reducers.sideBarVisibleReducer('', {
            type: 'setSideBarVisible',
            visible: true,
          })
        ).toEqual(true);
    });

    it('should return the initial sidebar panes state', () => {
        expect(reducers.sideBarPanesReducer(undefined, {})).toEqual(null);
    });

    it('should handle setSideBarPanes', () => {
        expect(
          reducers.sideBarPanesReducer('', {
            type: 'setSideBarPanes',
            panes: {a: 'b'},
          })
        ).toEqual({a: 'b'});
    });

    it('should return the initial sideBarSelectedPane state', () => {
        expect(reducers.sideBarSelectedPaneReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setSideBarSelectedPane', () => {
        expect(
          reducers.sideBarSelectedPaneReducer('', {
            type: 'setSideBarSelectedPane',
            selectedPane: 'testing',
          })
        ).toEqual('testing');
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