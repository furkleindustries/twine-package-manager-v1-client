import 'whatwg-fetch';

/* modules */
import * as get from './get';

describe('database.get tests', () => {
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

    it('tests get.userdata', async () => {
        const searchObj = {
            query: 'testQuery',
            type: 'testType',
            filterTargets: 'testFilterTargets',
            filterStyle: 'testFilterStyle',
            sortTarget: 'testSortTarget',
            sortStyle: 'testSortStyle',
            sortDirection: 'testSortDirection',
            dateCreatedRange: 'testDateCreatedRange',
            dateModifiedRange: 'testDateModifiedRange',
            versionRange: 'testVersionRange',
            subtype: 'testSubtype',
        };

        const queryStr = '?' + Object.keys(searchObj)
            .map(key => `${key}=${searchObj[key]}`)
            .join('&');
        const url = `https://furkleindustries.com/twinepm/search/${queryStr}`;

        const antiCSRFToken = 'test_token1';
        await get.search(queryStr, antiCSRFToken);
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0]).toEqual([ url, ]);
    });
});