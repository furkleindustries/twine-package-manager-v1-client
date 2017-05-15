/* modules */
import closeListener from './closeListener';

jest.mock('./close');
import modalClose from './close';

describe('modal closeListener unit tests', () => {
    beforeEach(() => {
        modalClose.mockClear();
    });

    it('closes modal with e.type of keydown and e.keyCode of 27', () => {
        closeListener({
            type: 'keydown',
            keyCode: 27,
        });

        expect(modalClose.mock.calls.length).toEqual(1);
        expect(modalClose.mock.calls[0]).toEqual([]);
    });

    it('rejects with e.type of keydown and e.keyCode !== 27', () => {
        closeListener({
            type: 'keydown',
            keyCode: 28,
        });

        expect(modalClose.mock.calls.length).toEqual(0);
    });

    it('closes modal with e.type of click and click target outside the modal container', () => {
        const target = {
            contains: () => false,
        };

        document.querySelector = jest.fn();
        document.querySelector.mockImplementationOnce(() => target);

        closeListener({
            type: 'click',
            target: { testing: 'test', }
        });

        expect(modalClose.mock.calls.length).toEqual(1);
        expect(modalClose.mock.calls[0]).toEqual([]);
    });

    it('rejects with e.type of click and click target inside the modal container', () => {
        const target = {
            contains: () => true,
        };

        document.querySelector = jest.fn();
        document.querySelector.mockImplementationOnce(() => target);

        closeListener({
            type: 'click',
            target: { testing: 'test', }
        });

        expect(modalClose.mock.calls.length).toEqual(0);
    });

    it('rejects e.type !== keydown or click', () => {
        closeListener({
            type: 'will not work',
        });

        expect(modalClose.mock.calls.length).toEqual(0);
    });
});