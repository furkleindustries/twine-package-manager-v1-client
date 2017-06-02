/* redux */
const store = {};
store.dispatch = jest.fn();

jest.mock('../../appActions');
import { setSideBarSelectedPane, } from '../../appActions';

/* modules */
import sideBarClick from './sideBarClick';

describe('sideBarClick unit tests', () => {
    it('tests the sideBarClick method', () => {
        window.localStorage = {};

        const obj = {
            type: 'setSideBarSelectedPane',
        };

        setSideBarSelectedPane.mockImplementationOnce(value => {
            obj.selectedPane = value;
            return obj;
        });

        sideBarClick({
            target: {
                id: 'testPane',
            },
        }, store.dispatch);

        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([obj]);
        expect(localStorage.twinepmProfileLocation).toEqual('testPane');
    });
});