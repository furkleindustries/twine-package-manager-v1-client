/* redux */
const store = {};
store.dispatch = jest.fn();

jest.mock('../../appActions');
import { setAppSelectedPane, } from '../../appActions';

/* modules */
import topBarClick from './topBarClick';

describe('topBarClick unit tests', () => {
    it('tests the topBarClick method', () => {
        const obj = {
            type: 'setAppSelectedPane',
        };

        setAppSelectedPane.mockImplementationOnce(value => {
            obj.selectedPane = value;
            return obj;
        });

        topBarClick({
            target: {
                id: 'testingPane',
            },
        }, store.dispatch);

        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([obj]);
    });
});