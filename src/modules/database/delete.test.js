import 'whatwg-fetch';

/* modules */
import * as _delete from './delete';


describe('database _delete unit tests', () => {
    beforeEach(() => {
        fetch = jest.fn();
        fetch.mockImplementationOnce(() => Promise.resolve({ json: () => {}}));
    });

    it('tests _delete.account', async () => {
        await _delete.account(321, 'test_token1');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/userdata/';
        const obj = {
            body: JSON.stringify({
                id: 321,
                csrfToken: 'test_token1',
            }),
            credentials: 'include',
            method: 'DELETE',
        };
        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests _delete._package', async () => {
        await _delete._package(124, 'test_token2');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/package/';
        const obj = {
            body: JSON.stringify({
                id: 124,
                csrfToken: 'test_token2',
            }),
            credentials: 'include',
            method: 'DELETE',
        };
        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });
});