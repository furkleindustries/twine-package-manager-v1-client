/* redux */
const store = {};
store.dispatch = jest.fn();

jest.mock('../../appActions');
import { setModal, } from '../../appActions';

/* modules */
import closeListener from './closeListener';
import close from './close';

describe('modal close unit tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
    });

    it('tests the side effects of the close method', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();
        
        setModal.mockImplementationOnce(() => {
            return {
                modal: null,
                type: 'setModal',
            };
        });

        document.body.removeEventListener = jest.fn();

        close(store.dispatch);

        jest.runAllTimers();

        expect(store.dispatch.mock.calls.length).toEqual(1);

        const action = {
            modal: null,
            type: 'setModal',
        };

        expect(store.dispatch.mock.calls[0]).toEqual([action]);

        expect(document.body.removeEventListener.mock.calls.length).toEqual(2);
        
        const args1 = [
            'keydown',
            closeListener,
            false,
        ];

        expect(document.body.removeEventListener.mock.calls[0]).toEqual(args1);

        const args2 = [
            'click',
            closeListener,
            false,
        ];

        expect(document.body.removeEventListener.mock.calls[1]).toEqual(args2);
    });

    it('tests that the location.hash property is set to an empty string', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        window.location.hash = 'testing';
        close(store.dispatch);

        jest.runAllTimers();

        expect(window.location.hash).toEqual('');
    });

    it('zeroes the opacity of the modal container if it can be found', () => {
        document.querySelector = jest.fn();
        const obj = {};
        document.querySelector.mockImplementationOnce(() => {
            return { style: obj, };
        });

        close(store.dispatch);

        expect(document.querySelector.mock.calls.length).toEqual(1);
        expect(document.querySelector.mock.calls[0]).toEqual([
            '.Modal-container',
        ]);
        expect(obj.opacity).toEqual(0);
    });
});