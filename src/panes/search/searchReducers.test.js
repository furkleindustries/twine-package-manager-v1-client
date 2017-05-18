import * as reducers from './searchReducers';

describe('search reducer unit tests', () => {
    it('should return the initial search state', () => {
        const object = {
            searchedYet: false,
            query: '',
            results: [],
            optionsVisible: false,
            type: 'packages',
            filterTargets: ['id', 'name', 'description', 'keywords', 'homepage'],
            filterStyle: 'metaphone/contains',
            sortTarget: 'name',
            sortStyle: 'similarity',
            sortDirection: 'descending',
            versionRange: [],
            subtype: '',
            message: '',
        };

        const result = reducers.searchOptionsReducer(undefined, {});

        Object.keys(object).forEach(key => {
            expect(object[key]).toEqual(result[key]);
        });
    });

    it('should handle setSearch with valid arguments', () => {
        const previous = {
            searchedYet: false,
            query: '',
            results: [],
            optionsVisible: false,
            type: 'packages',
            filterTargets: 'foo',
            filterStyle: 'metaphone/contains',
            sortTarget: 'name',
            sortStyle: 'similarity',
            sortDirection: 'descending',
            versionRange: [],
            subtype: '',
            message: '',
        };

        const object = {
            searchedYet: true,
            query: 'foo',
            results: [1, 2, 5],
            optionsVisible: true,
            type: 'users',
            filterTargets: ['description', 'keywords'],
            filterStyle: 'metaphone/levenshtein',
            sortTarget: 'id',
            sortStyle: 'soundex/levenshtein',
            sortDirection: 'ascending',
            dateCreatedRange: [0, 15],
            dateModifiedRange: [0, 17],
            versionRange: ['1', '2'],
            subtype: 'scripts',
            message: 'bazbar',
        };

        const action = {
            type: 'setSearchOptions',
            searchOptions: object,
        };

        const result = reducers.searchOptionsReducer(previous, action);

        Object.keys(object).forEach(key => {
            expect(object[key]).toEqual(result[key]);
        });
    });



    it('should handle setSearch with valid arguments', () => {
        const previous = {
            searchedYet: false,
            query: '',
            results: [],
            optionsVisible: false,
            type: 'packages',
            filterTargets: 'foo',
            filterStyle: 'metaphone/contains',
            sortTarget: 'name',
            sortStyle: 'similarity',
            sortDirection: 'descending',
            versionRange: [],
            subtype: '',
            message: '',
        };

        const object = {
            filterTargets: ['foo', 'bar'],
        };

        const action = {
            type: 'setSearchOptions',
            searchOptions: object,
        };

        const result = reducers.searchOptionsReducer(previous, action);

        Object.keys(previous).forEach(key => {
            expect(previous[key]).toEqual(result[key]);
        });
    });

    it('should return the initial searchedYet state', () => {
        expect(reducers.searchedYetReducer(undefined, {}))
            .toEqual(false);
    });

    it('should handle setSearchedYet with valid arguments', () => {
        expect(
          reducers.searchedYetReducer('', {
            type: 'setSearchedYet',
            searchedYet: true,
          })
        ).toEqual(true);
    });

    it('searchedYetReducer should reject with invalid type', () => {
        expect(
          reducers.searchedYetReducer('', {
            type: 'searchTest',
            searchedYet: true,
          })
        ).toEqual('');
    });

    it('searchedYetReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchedYetReducer('', {
            type: 'setSearchedYet',
            searchedYet: 'not a boolean',
          })
        ).toEqual('');
    });

    it('should return the initial searchQuery state', () => {
        expect(reducers.searchQueryReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setSearchQuery with valid arguments', () => {
        expect(
          reducers.searchQueryReducer('', {
            type: 'setSearchQuery',
            query: 'this is a test query',
          })
        ).toEqual('this is a test query');
    });

    it('searchQueryReducer should reject with invalid type', () => {
        expect(
          reducers.searchQueryReducer('', {
            type: 'searchTest',
            query: true,
          })
        ).toEqual('');
    });

    it('searchQueryReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchQueryReducer('', {
            type: 'setSearchQuery',
            query: 12,
          })
        ).toEqual('');
    });

    it('should return the initial searchResults state', () => {
        expect(reducers.searchResultsReducer(undefined, {}))
            .toEqual([]);
    });

    it('should handle setSearchResults with valid arguments', () => {
        expect(
          reducers.searchResultsReducer('', {
            type: 'setSearchResults',
            results: ['a', 'b', 'c'],
          })
        ).toEqual(['a', 'b', 'c']);
    });

    it('searchResultsReducer should reject with invalid type', () => {
        expect(
          reducers.searchResultsReducer('', {
            type: 'searchTest',
            results: true,
          })
        ).toEqual('');
    });

    it('searchResultsReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchResultsReducer('', {
            type: 'setSearchResults',
            results: 15,
          })
        ).toEqual('');
    });

    it('should return the initial searchOptionsVisible state', () => {
        expect(reducers.searchOptionsVisibleReducer(undefined, {}))
            .toEqual(false);
    });

    it('should handle setSearchOptionsVisible with valid arguments', () => {
        expect(
          reducers.searchOptionsVisibleReducer('', {
            type: 'setSearchOptionsVisible',
            optionsVisible: true,
          })
        ).toEqual(true);
    });

    it('searchOptionsVisibleReducer should reject with invalid type', () => {
        expect(
          reducers.searchOptionsVisibleReducer('', {
            type: 'searchTest',
            visible: true,
          })
        ).toEqual('');
    });

    it('searchOptionsVisibleReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchOptionsVisibleReducer('', {
            type: 'setSearchOptionsVisible',
            visible: 17,
          })
        ).toEqual('');
    });

    it('should handle setSearchOptionsVisible with valid arguments', () => {
        expect(
          reducers.searchMessageReducer('', {
            type: 'setSearchMessage',
            message: 'this is a test message',
          })
        ).toEqual('this is a test message');
    });

    it('should return the initial searchMessage state', () => {
        expect(reducers.searchMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setSearchMessage with valid arguments', () => {
        expect(
          reducers.searchMessageReducer('', {
            type: 'setSearchMessage',
            message: 'this is a test message',
          })
        ).toEqual('this is a test message');
    });

    it('searchMessageReducer should reject with invalid type', () => {
        expect(
          reducers.searchMessageReducer('', {
            type: 'searchTest',
            message: 'will fail',
          })
        ).toEqual('');
    });

    it('searchMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchMessageReducer('', {
            type: 'setSearchMessage',
            message: 18,
          })
        ).toEqual('');
    });

    it('should return the initial searchType state', () => {
        expect(reducers.searchTypeReducer(undefined, {}))
            .toEqual('packages');
    });

    it('should handle setSearchType with valid arguments', () => {
        expect(
          reducers.searchTypeReducer('', {
            type: 'setSearchType',
            searchType: 'users',
          })
        ).toEqual('users');
    });

    it('searchTypeReducer should reject with invalid type', () => {
        expect(
          reducers.searchTypeReducer('', {
            type: 'searchTest',
            searchType: 'users',
          })
        ).toEqual('');
    });

    it('searchTypeReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchTypeReducer('', {
            type: 'setSearchType',
            searchType: 19,
          })
        ).toEqual('');
    });

    it('should return the initial searchFilterTargets state', () => {
        expect(reducers.searchFilterTargetsReducer(undefined, {}))
            .toEqual(['id', 'name', 'description', 'keywords', 'homepage']);
    });

    it('should handle setSearchFilterTargets with valid arguments', () => {
        expect(
          reducers.searchFilterTargetsReducer('', {
            type: 'setSearchFilterTargets',
            filterTargets: ['name', 'keywords', 'description'],
          })
        ).toEqual(['name', 'keywords', 'description']);
    });

    it('searchFilterTargetsReducer should reject with invalid type', () => {
        expect(
          reducers.searchFilterTargetsReducer('', {
            type: 'searchTest',
            filterTargets: ['homepage', 'id'],
          })
        ).toEqual('');
    });

    it('searchFilterTargetsReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchFilterTargetsReducer('', {
            type: 'setSearchFilterTargets',
            filterTargets: 19,
          })
        ).toEqual('');

        expect(
          reducers.searchFilterTargetsReducer('', {
            type: 'setSearchFilterTargets',
            filterTargets: { foo: 'bar', },
          })
        ).toEqual('');

        expect(
          reducers.searchFilterTargetsReducer('', {
            type: 'setSearchFilterTargets',
            filterTargets: ['foo', 'bar'],
          })
        ).toEqual('');
    });

    it('searchFilterTargetsReducer using type setSearchOptions should reject if tgts is not an array-like object', () => {
        expect(
            reducers.searchFilterTargetsReducer('', {
                type: 'setSearchOptions',
                searchOptions: { filterTargets: 'not ALO', },
            })
        ).toBe('');
    });

    it('should return the initial searchFilterStyle state', () => {
        expect(reducers.searchFilterStyleReducer(undefined, {}))
        	.toEqual('metaphone/contains');
    });

    it('should handle setSearchFilterStyle with valid arguments', () => {
        expect(
          reducers.searchFilterStyleReducer('', {
            type: 'setSearchFilterStyle',
            filterStyle: 'soundex/levenshtein',
          })
        ).toEqual('soundex/levenshtein');
    });

    it('searchFilterStyleReducer should reject with invalid type', () => {
        expect(
          reducers.searchFilterStyleReducer('', {
            type: 'searchTest',
            filterStyle: 'soundex/levenshtein',
          })
        ).toEqual('');
    });

    it('searchFilterStyleReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchFilterStyleReducer('', {
            type: 'setSearchFilterStyle',
            filterStyle: 21,
          })
        ).toEqual('');

        expect(
          reducers.searchFilterStyleReducer('', {
            type: 'setSearchFilterStyle',
            filterTargets: 'buxbaz',
          })
        ).toEqual('');
    });

    it('should return the initial searchSortTarget state', () => {
        expect(reducers.searchSortTargetReducer(undefined, {}))
            .toEqual('name');
    });

    it('should handle setSearchSortTarget with valid arguments', () => {
        expect(
          reducers.searchSortTargetReducer('', {
            type: 'setSearchSortTarget',
            sortTarget: 'description',
          })
        ).toEqual('description');
    });

    it('searchSortTargetReducer should reject with invalid type', () => {
        expect(
          reducers.searchSortTargetReducer('', {
            type: 'searchTest',
            sortTarget: 'description',
          })
        ).toEqual('');
    });

    it('searchSortTargetReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchSortTargetReducer('', {
            type: 'setSearchSortTarget',
            sortTarget: 22,
          })
        ).toEqual('');

        expect(
          reducers.searchSortTargetReducer('', {
            type: 'setSearchSortTarget',
            sortTarget: 'buzzbar',
          })
        ).toEqual('');
    });

    it('should return the initial searchSortStyle state', () => {
        expect(reducers.searchSortStyleReducer(undefined, {}))
            .toEqual('similarity');
    });

    it('should handle setSearchSortStyle with valid arguments', () => {
        expect(
          reducers.searchSortStyleReducer('', {
            type: 'setSearchSortStyle',
            sortStyle: 'soundex/levenshtein',
          })
        ).toEqual('soundex/levenshtein');
    });

    it('searchSortStyleReducer should reject with invalid type', () => {
        expect(
          reducers.searchSortStyleReducer('', {
            type: 'searchTest',
            sortStyle: 'soundex/levenshtein',
          })
        ).toEqual('');
    });

    it('searchSortStyleReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchSortStyleReducer('', {
            type: 'setSearchSortStyle',
            sortStyle: 22,
          })
        ).toEqual('');

        expect(
          reducers.searchSortStyleReducer('', {
            type: 'setSearchSortStyle',
            sortStyle: 'bulbuzz',
          })
        ).toEqual('');
    });

    it('should return the initial searchSortDirection state', () => {
        expect(reducers.searchSortDirectionReducer(undefined, {}))
            .toEqual('descending');
    });

    it('should handle setSearchSortDirection with valid arguments', () => {
        expect(
          reducers.searchSortDirectionReducer('', {
            type: 'setSearchSortDirection',
            sortDirection: 'ascending',
          })
        ).toEqual('ascending');
    });

    it('searchSortDirectionReducer should reject with invalid type', () => {
        expect(
          reducers.searchSortDirectionReducer('', {
            type: 'searchTest',
            sortDirection: 'ascending',
          })
        ).toEqual('');
    });

    it('searchSortDirectionReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchSortDirectionReducer('', {
            type: 'setSortDirectionStyle',
            sortDirection: 22,
          })
        ).toEqual('');

        expect(
          reducers.searchSortDirectionReducer('', {
            type: 'setSearchSortDirection',
            filterTargets: 'buxbaz',
          })
        ).toEqual('');
    });

    /* can't test [1] right now -- initial value is new Date().getTime(),
     * which has changed by the time the test is run. */
    it('should return the initial searchDateCreatedRange state', () => {
        expect(reducers.searchDateCreatedRangeReducer(undefined, {})[0])
        	.toEqual(0);
    });

    it('should handle setSearchDateCreatedRange with valid arguments', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            dateCreatedRange: [0, 1],
          })
        ).toEqual([0, 1]);
    });

    it('should reject setSearchDateCreatedRange input with more than 2 inputs', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            versionRange: [0, 1, 2],
          })
        ).toEqual('');
    });

    it('should reject setSearchDateCreatedRange input with [0] > [1]', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            versionRange: [1, 0],
          })
        ).toEqual('');
    });

    it('searchDateCreatedRangeReducer should reject with invalid type', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'searchTest',
            dateCreatedRange: [1, 2],
          })
        ).toEqual('');
    });

    it('searchDateCreatedRangeReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            dateCreatedRange: { foo: 'bar', },
          })
        ).toEqual('');

        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            dateCreatedRange: 'buxbaz',
          })
        ).toEqual('');
    });

    /* can't test [1] right now -- initial value is new Date().getTime(),
     * which has changed by the time the test is run. */
    it('should return the initial searchDateModifiedRange state', () => {
        expect(reducers.searchDateModifiedRangeReducer(undefined, {})[0])
        	.toEqual(0);
    });

    it('should handle setSearchDateModifiedRange with valid arguments', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            dateModifiedRange: [0, 1],
          })
        ).toEqual([0, 1]);
    });

    it('should reject searchDateModifiedRange input with more than 2 inputs', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            dateModifiedRange: [0, 1, 2],
          })
        ).toEqual('');
    });

    it('should reject searchDateModifiedRange input with [0] > [1]', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            dateModifiedRange: [1, 0],
          })
        ).toEqual('');
    });

    it('searchDateModifiedRangeReducer should reject with invalid type', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'searchTest',
            dateModifiedRange: [1, 2],
          })
        ).toEqual('');
    });

    it('searchDateCreatedRangeReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            dateModifiedRange: { foo: 'bar', },
          })
        ).toEqual('');

        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            dateModifiedRange: 'buxbaz',
          })
        ).toEqual('');
    });

    it('should return the initial searchVersionRange state', () => {
        expect(reducers.searchVersionRangeReducer(undefined, {})).toEqual([]);
    });

    it('should handle setSearchVersionRange with valid arguments', () => {
        expect(
          reducers.searchVersionRangeReducer('', {
            type: 'setSearchVersionRange',
            versionRange: ['0', '1'],
          })
        ).toEqual(['0', '1']);
    });

    it('should reject searchVersionRange input with more than 2 inputs', () => {
        expect(
          reducers.searchVersionRangeReducer('', {
            type: 'setSearchVersionRange',
            versionRange: ['0', '1', '2'],
          })
        ).toEqual('');
    });

    it('searchVersionRangeReducer should reject with invalid type', () => {
        expect(
          reducers.searchVersionRangeReducer('', {
            type: 'searchTest',
            versionRange: [1, 2],
          })
        ).toEqual('');
    });

    it('searchVersionRangeReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchVersionRangeReducer('', {
            type: 'setSearchVersionRange',
            versionRange: { foo: 'bar', },
          })
        ).toEqual('');

        expect(
          reducers.searchVersionRangeReducer('', {
            type: 'setSearchVersionRange',
            versionRange: 'buxbaz',
          })
        ).toEqual('');
    });

    it('should return the initial searchSubtype state', () => {
        expect(reducers.searchSubtypeReducer(undefined, {})).toEqual('');
    });

    it('should handle setSearchSubtype with valid arguments', () => {
        expect(
          reducers.searchSubtypeReducer('', {
            type: 'setSearchSubtype',
            subtype: 'scripts',
          })
        ).toEqual('scripts');
    });

    it('searchSubtypeReducer should reject with invalid type', () => {
        expect(
          reducers.searchSubtypeReducer('', {
            type: 'searchTest',
            subtype: 'scripts',
          })
        ).toEqual('');
    });

    it('searchSubtypeReducer should reject with invalid arguments', () => {
        expect(
          reducers.searchSubtypeReducer('', {
            type: 'setSearchSubtype',
            subtype: { foo: 'bar', },
          })
        ).toEqual('');

        expect(
          reducers.searchSubtypeReducer('', {
            type: 'setSearchSubtype',
            subtype: 'buxbaz',
          })
        ).toEqual('');
    });
});