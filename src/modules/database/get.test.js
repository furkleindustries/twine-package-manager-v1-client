import 'whatwg-fetch';

/* modules */
import * as get from './get';

describe('database get unit tests', () => {
    beforeEach(() => {
        fetch = jest.fn();
        fetch.mockImplementationOnce(() => Promise.resolve({ json: () => {}}));
    });

    it('tests get.userdata', async () => {
        const antiCSRFToken = 'test_token1';
        await get.userdata(antiCSRFToken);
        expect(fetch.mock.calls.length).toEqual(1);

        const url = `https://furkleindustries.com/twinepm/userdata/` +
            `?csrfToken=${antiCSRFToken}`;
        const obj = {
            credentials: 'include',
        };
        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });
});