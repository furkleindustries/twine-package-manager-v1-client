import * as reducers from './appReducers';
import panesSourceApp from './panesSourceApp';

jest.mock('./modules/isRunningNodeJs');
import isRunningNodeJs from './modules/isRunningNodeJs';

describe('app reducer unit tests', () => {
    it('should return the initial appPanes state', () => {
        expect(reducers.appPanesReducer(undefined, {}))
            .toEqual(panesSourceApp);
    });

    it('should handle setAppPanes with valid arguments', () => {
        expect(
            reducers.appPanesReducer('', {
                type: 'setAppPanes',
                panes: { foo: 'baz', },
            })
        ).toEqual({ foo: 'baz', });
    });

    it('appPanesReducer should reject with invalid type', () => {
        expect(
          reducers.appPanesReducer('', {
            type: 'setTest',
            panes: { foo: 'will fail', },
          })
        ).toEqual('');
    });

    it('appPanesReducer should reject with invalid arguments', () => {
        expect(
            reducers.appPanesReducer('', {
                type: 'setAppPanes',
                panes: 15,
            })
        ).toBe('');
    });

    it('should return the initial appSelectedPane state', () => {
        expect(reducers.appSelectedPaneReducer(undefined, {})).toBe('home');
    });

    it('should handle setAppSelectedPane with valid arguments', () => {
        expect(
            reducers.appSelectedPaneReducer('', {
                type: 'setAppSelectedPane',
                selectedPane: 'testing',
            })
        ).toBe('testing');
    });

    it('appSelectedPaneReducer should reject with invalid type', () => {
        expect(
            reducers.appSelectedPaneReducer('', {
                type: 'setTest',
                username: 'will fail',
            })
        ).toBe('');
    });

    it('appSelectedPaneReducer should reject with invalid arguments', () => {
        expect(
            reducers.appSelectedPaneReducer('', {
                type: 'setAppSelectedPane',
                selectedPane: 16,
            })
        ).toBe('');
    });

    it('should return the initial sideBarVisible state', () => {
        expect(reducers.sideBarVisibleReducer(undefined, {})).toEqual(false);
    });

    it('should handle setSideBarVisible with valid arguments', () => {
        expect(
          reducers.sideBarVisibleReducer('', {
            type: 'setSideBarVisible',
            visible: true,
          })
        ).toEqual(true);
    });

    it('sideBarVisibleReducer should reject with invalid type', () => {
        expect(
          reducers.sideBarVisibleReducer('', {
            type: 'setTest',
            visible: true,
          })
        ).toEqual('');
    });

    it('sideBarVisibleReducer should reject with invalid arguments', () => {
        expect(
          reducers.sideBarVisibleReducer('', {
            type: 'setSideBarVisible',
            visible: 17,
          })
        ).toEqual('');
    });

    it('should return the initial sideBarPanes state', () => {
        expect(reducers.sideBarPanesReducer(undefined, {})).toEqual(null);
    });

    it('should handle setSideBarPanes with valid arguments', () => {
        expect(
          reducers.sideBarPanesReducer('', {
            type: 'setSideBarPanes',
            panes: { bar: 'baz', },
          })
        ).toEqual({ bar: 'baz', });
    });

    it('sideBarPanesReducer should reject with invalid type', () => {
        expect(
          reducers.sideBarPanesReducer('', {
            type: 'setTest',
            panes: { bux: 'buzz', },
          })
        ).toEqual('');
    });

    it('sideBarPanesReducer should reject with invalid arguments', () => {
        expect(
          reducers.sideBarPanesReducer('', {
            type: 'setSideBarPanes',
            panes: 18,
          })
        ).toEqual('');
    });

    it('should return the initial sideBarSelectedPane state', () => {
        expect(reducers.sideBarSelectedPaneReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setSideBarSelectedPane with valid arguments', () => {
        expect(
          reducers.sideBarSelectedPaneReducer('', {
            type: 'setSideBarSelectedPane',
            selectedPane: 'buzzbazz',
          })
        ).toEqual('buzzbazz');
    });

    it('sideBarSelectedPaneReducer should reject with invalid type', () => {
        expect(
          reducers.sideBarSelectedPaneReducer('', {
            type: 'setTest',
            selectedPane: 'buzzard',
          })
        ).toEqual('');
    });

    it('sideBarSelectedPaneReducer should reject with invalid arguments', () => {
        expect(
          reducers.sideBarSelectedPaneReducer('', {
            type: 'setSideBarSelectedPane',
            selectedPane: 19,
          })
        ).toEqual('');
    });

    it('should return the initial csrfToken state', () => {
        expect(reducers.csrfTokenReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setCSRFToken with valid arguments', () => {
        expect(
          reducers.csrfTokenReducer('', {
            type: 'setCSRFToken',
            csrfToken: 'abcdef',
          })
        ).toEqual('abcdef');
    });

    it('csrfTokenReducer should reject with invalid type', () => {
        expect(
          reducers.csrfTokenReducer('', {
            type: 'setTest',
            csrfToken: 'abcdfgebz',
          })
        ).toEqual('');
    });

    it('csrfTokenReducer should reject with invalid arguments', () => {
        expect(
          reducers.csrfTokenReducer('', {
            type: 'setCSRFToken',
            csrfToken: 20,
          })
        ).toEqual('');
    });

    it('should return the initial modal state', () => {
        expect(reducers.modalReducer(undefined, {})).toEqual(null);
    });

    it('should handle setModal with valid arguments', () => {
        expect(
          reducers.modalReducer('', {
            type: 'setModal',
            modal: { baz: 'buzz', },
          })
        ).toEqual({ baz: 'buzz', });
    });

    it('modalReducer should reject with invalid type', () => {
        expect(
          reducers.modalReducer('', {
            type: 'setTest',
            modal: { bug: 'bun', },
          })
        ).toEqual('');
    });

    it('modalReducer should reject with invalid arguments', () => {
        expect(
          reducers.modalReducer('', {
            type: 'setModal',
            modal: 21,
          })
        ).toEqual('');
    });
});