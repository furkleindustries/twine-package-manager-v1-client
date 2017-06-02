/* modules */
jest.mock('./modules/isRunningNodeJs');
import isRunningNodeJs from './modules/isRunningNodeJs';
isRunningNodeJs.mockImplementation(() => false);

describe('client-side-specific tests for appReducers', () => {
    it('slices default argument from location.pathname when running on client', () => {
        Object.defineProperty(window.location, 'pathname', {
            writable: true,
            value: 'foo/bar/baz/bux',
        });

        const reducers = require('./appReducers');
        expect(reducers.appSelectedPaneReducer(undefined, {})).toBe('bux');
    });
});