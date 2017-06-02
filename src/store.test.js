/* redux */
import initStore from './store';

/* modules */
jest.mock('./modules/isRunningNodeJs');
import isRunningNodeJs from './modules/isRunningNodeJs';

describe('store constructor/returner tests', () => {
    it('tests that a new store is created each time the function is called when running node', () => {
        isRunningNodeJs.mockImplementationOnce(() => true);

        expect(initStore()).not.toBe(initStore());
    });

    it('tests that a new store is initially created on the client side, and then passed each successive time as the result of the function', () => {
        isRunningNodeJs.mockImplementationOnce(() => false);

        expect(initStore()).toBe(initStore());
    });
});