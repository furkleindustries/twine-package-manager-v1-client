/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn();

jest.mock('../panes/search/searchActions');
import {
    setSearchResults,
    setSearchedYet,
    setSearchMessage,
} from '../panes/search/searchActions';

const actionMocks = {
    setSearchResults,
    setSearchedYet,
    setSearchMessage,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(() => {
        return { type: key, };
    });
});

/* modules */
import search from './search';

jest.mock('./database/get');
import * as get from './database/get';

describe('search module tests', () => {
    beforeEach(() => {
        store.dispatch.mockClear();
        store.getState.mockClear();

        Object.keys(actionMocks).forEach(key => {
            actionMocks[key].mockClear();
        });

        get.search.mockClear();
    });

    it('logs a message and aborts early if the searchObj argument is invalid', async () => {
        const log = console.log;
        console.log = jest.fn();

        await search(store);

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('logs a message and aborts early if the csrfToken argument is falsey', async () => {
        const log = console.log;
        console.log = jest.fn();

        await search(store, {});

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('logs a message and aborts early if the csrfToken argument is truthy but not a string', async () => {
        const log = console.log;
        console.log = jest.fn();

        await search(store, {}, []);

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('passes filterTargets through', async () => {
        await search(store, {
            filterTargets: [ 'id', 'description', ],
        }, 'test_token');

        const queryStr = '?filterTargets=%5B%22id%22%2C%22description%22%5D';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('drops description from filterTargets if similarity is used', async () => {
        await search(store, {
            filterStyle: 'similarity',
            filterTargets: ['id', 'description', ],
        }, 'test_token');

        const queryStr = '?filterTargets=%5B%22id%22%5D&' +
            'filterStyle=similarity';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('drops description from filterTargets if levenshtein is used', async () => {
        await search(store, {
            filterStyle: 'levenshtein',
            filterTargets: ['id', 'description', ],
        }, 'test_token');

        const queryStr = '?filterTargets=%5B%22id%22%5D&' +
            'filterStyle=levenshtein';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('drops description from filterTargets if soundex/levenshtein is used', async () => {
        await search(store, {
            filterStyle: 'soundex/levenshtein',
            filterTargets: ['id', 'description', ],
        }, 'test_token');

        const queryStr = '?filterTargets=%5B%22id%22%5D&' +
            'filterStyle=soundex%2Flevenshtein';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('drops description from filterTargets if metaphone/levenshtein is used', async () => {
        await search(store, {
            filterStyle: 'metaphone/levenshtein',
            filterTargets: ['id', 'description', ],
        }, 'test_token');

        const queryStr = '?filterTargets=%5B%22id%22%5D&' +
            'filterStyle=metaphone%2Flevenshtein';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('keeps description from filterTargets if valid filterStyle is used', async () => {
        await search(store, {
            filterStyle: 'contains',
            filterTargets: ['id', 'description', ],
        }, 'test_token');

        const queryStr = '?filterTargets=%5B%22id%22%2C%22description%22%5D&' +
            'filterStyle=contains';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('rejects filterTargets if length is < 1', async () => {
        await search(store, {
            filterTargets: [],
        }, 'test_token');

        const queryStr = '?';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes sortTarget through', async () => {
        await search(store, {
            sortTarget: 'description',
        }, 'test_token');

        const queryStr = '?sortTarget=description';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes sortStyle through', async () => {
        await search(store, {
            sortStyle: 'levenshtein',
        }, 'test_token');

        const queryStr = '?sortStyle=levenshtein';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes sortDirection through', async () => {
        await search(store, {
            sortDirection: 'descending',
        }, 'test_token');

        const queryStr = '?sortDirection=descending';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes dateCreatedRange through', async () => {
        await search(store, {
            dateCreatedRange: [1, 2],
        }, 'test_token');

        const queryStr = '?dateCreatedRange=%5B1%2C2%5D';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('rejects dateCreatedRange if length is not 2', async () => {
        await search(store, {
            dateCreatedRange: [ 1, ],
        }, 'test_token');

        const queryStr = '?';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes dateModifiedRange through', async () => {
        await search(store, {
            dateModifiedRange: [1, 2],
        }, 'test_token');

        const queryStr = '?dateModifiedRange=%5B1%2C2%5D';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('rejects dateModifiedRange if length is not 2', async () => {
        await search(store, {
            dateModifiedRange: [ 1, ],
        }, 'test_token');

        const queryStr = '?';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes versionRange through', async () => {
        await search(store, {
            versionRange: ['1', '2'],
        }, 'test_token');

        const queryStr = '?versionRange=%5B%221%22%2C%222%22%5D';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('rejects versionRange if length is not 2', async () => {
        await search(store, {
            versionRange: [ '1', ],
        }, 'test_token');

        const queryStr = '?';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('rejects versionRange if 0th is falsey', async () => {
        await search(store, {
            versionRange: [ '', 'foo', ],
        }, 'test_token');

        const queryStr = '?';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('rejects versionRange if 0th is falsey', async () => {
        await search(store, {
            versionRange: [ 'foo', '', ],
        }, 'test_token');

        const queryStr = '?';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes type through', async () => {
        await search(store, {
            type: 'foobar',
        }, 'test_token');

        const queryStr = '?type=foobar';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes query through', async () => {
        await search(store, {
            query: 'a query for testing',
        }, 'test_token');

        const queryStr = '?query=a%20query%20for%20testing';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('passes subtype through when type is packages', async () => {
        await search(store, {
            type: 'packages',
            subtype: 'scripts',
        }, 'test_token');

        const queryStr = '?type=packages&subtype=scripts';

        expect(get.search.mock.calls.length).toBe(1);
        expect(get.search.mock.calls[0]).toEqual([ queryStr, ]);
    });

    it('handles side effects when get.search succeeds', async () => {
        get.search.mockImplementationOnce(() => {
            return {
                status: 200,
                results: [ 'test', ],
            };
        });

        await search(store, {}, 'test_token');

        expect(setSearchResults.mock.calls.length).toBe(1);
        expect(setSearchResults.mock.calls[0]).toEqual([ [ 'test', ], ]);

        expect(setSearchedYet.mock.calls.length).toBe(1);
        expect(setSearchedYet.mock.calls[0]).toEqual([ true, ]);

        expect(store.dispatch.mock.calls.length).toBe(3);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchResults', },
        ]);

        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setSearchedYet', },
        ]);

        expect(store.dispatch.mock.calls[2]).toEqual([
            { type: 'setSearchMessage', },
        ]);
    });

    it('does not update store when responseObj.results is out of band', async () => {
        get.search.mockImplementationOnce(() => {
            return {
                status: 200,
                results: 'not an array-like object',
            };
        });

        await search(store, {}, 'test_token');

        expect(setSearchResults.mock.calls.length).toBe(1);
        expect(setSearchResults.mock.calls[0]).toEqual([ [], ]);

        expect(setSearchedYet.mock.calls.length).toBe(0);

        expect(setSearchMessage.mock.calls.length).toBe(1);

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchResults', },
        ]);

        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setSearchMessage', },
        ]);
    });

    it('records a generic error message when get.search returns falsey', async () => {
        get.search.mockImplementationOnce(() => null);

        await search(store, {}, 'test_token');

        expect(setSearchMessage.mock.calls.length).toBe(1);
        expect(setSearchMessage.mock.calls[0]).toEqual([
            'There was an error in receiving or deserializing the server ' +
                'response.',
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchMessage', },
        ]);
    });

    it('passes through the error message received from get.search', async () => {
        get.search.mockImplementationOnce(() => {
            return { error: 'testing', };
        });

        await search(store, {}, 'test_token');

        expect(setSearchMessage.mock.calls.length).toBe(1);
        expect(setSearchMessage.mock.calls[0]).toEqual([ 'testing', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchMessage', },
        ]);
    });

    it('recprds a generic error message when get.search returns no error but status !== 200', async () => {
        get.search.mockImplementationOnce(() => {
            return { status: 400, };
        });

        await search(store, {}, 'test_token');

        expect(setSearchMessage.mock.calls.length).toBe(1);
        expect(setSearchMessage.mock.calls[0]).toEqual([
            'The request did not succeed, but there was no error received.',
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchMessage', },
        ]);
    });

    it('clears the searchMessage if it is the same at the creation of the timeout and its execution', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        get.search.mockImplementationOnce(() => {
            return { error: 'test', };
        });

        await search(store, {}, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return { searchMessage: 'test', };
        });

        jest.runAllTimers();

        expect(setSearchMessage.mock.calls.length).toBe(2);
        expect(setSearchMessage.mock.calls[1]).toEqual([ '', ]);

        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[1]).toEqual([
            { type: 'setSearchMessage', },
        ]);
    });

    it('does not clear the searchMessage if it is not the same at the creation of the timeout and its execution', async () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        await search(store, {}, 'test_token');

        store.getState.mockImplementationOnce(() => {
            return { searchMessage: 'test', };
        });

        jest.runAllTimers();

        expect(setSearchMessage.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(1);
    });

    it('logs a message and returns early when get.search throws an exception', async () => {
        const log = console.log;
        console.log = jest.fn();

        const exception = new Error('uh oh');
        get.search.mockImplementationOnce(() => {
            throw exception;
        });

        await search(store, {}, 'test_token');

        expect(console.log.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls.length).toBe(0);

        console.log = log;
    });
});