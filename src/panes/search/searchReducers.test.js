import * as reducers from './searchReducers';

describe('search reducer unit tests', () => {
    it('should return the initial searchedYet state', () => {
        expect(reducers.searchedYetReducer(undefined, {})).toEqual(false);
    });

    it('should handle setSearchedYet', () => {
        expect(
          reducers.searchedYetReducer('', {
            type: 'setSearchedYet',
            searchedYet: true,
          })
        ).toEqual(true);
    });

    it('should return the initial searchQuery state', () => {
        expect(reducers.searchQueryReducer(undefined, {})).toEqual('');
    });

    it('should handle setSearchQuery', () => {
        expect(
          reducers.searchQueryReducer('', {
            type: 'setSearchQuery',
            query: 'this is a test search',
          })
        ).toEqual('this is a test search');
    });

    it('should return the initial searchResults state', () => {
        expect(reducers.searchResultsReducer(undefined, {})).toEqual([]);
    });

    it('should handle setSearchResults', () => {
        expect(
          reducers.searchResultsReducer('', {
            type: 'setSearchResults',
            results: [4, 5, 6],
          })
        ).toEqual([4, 5, 6]);
    });

    it('should return the initial searchOptionsVisible state', () => {
        expect(reducers.searchOptionsVisibleReducer(undefined, {}))
        	.toEqual(false);
    });

    it('should handle setSearchOptionsVisible', () => {
        expect(
          reducers.searchOptionsVisibleReducer('', {
            type: 'setSearchOptionsVisible',
            optionsVisible: true,
          })
        ).toEqual(true);
    });

    it('should return the initial searchError state', () => {
        expect(reducers.searchErrorReducer(undefined, {}))
        	.toEqual('');
    });

    it('should handle setSearchError', () => {
        expect(
          reducers.searchErrorReducer('', {
            type: 'setSearchError',
            error: 'this is a test search error',
          })
        ).toEqual('this is a test search error');
    });

    it('should return the initial searchType state', () => {
        expect(reducers.searchTypeReducer(undefined, {}))
        	.toEqual('packages');
    });

    it('should handle setSearchType', () => {
        expect(
          reducers.searchTypeReducer('', {
            type: 'setSearchType',
            searchType: 'users',
          })
        ).toEqual('users');
    });

    it('should return the initial filterTargets state', () => {
        expect(reducers.searchFilterTargetsReducer(undefined, {}))
        	.toEqual(['id', 'name', 'description', 'keywords', 'homepage']);
    });

    it('should handle setFilterTargets', () => {
        expect(
          reducers.searchFilterTargetsReducer('', {
            type: 'setSearchFilterTargets',
            filterTargets: ['id'],
          })
        ).toEqual(['id']);
    });

    it('should handle setSearchType', () => {
        expect(
          reducers.searchTypeReducer('', {
            type: 'setSearchType',
            searchType: 'users',
          })
        ).toEqual('users');
    });

    it('should return the initial filterStyle state', () => {
        expect(reducers.searchFilterStyleReducer(undefined, {}))
        	.toEqual('metaphone/contains');
    });

    it('should handle setSearchFilterStyle', () => {
        expect(
          reducers.searchFilterStyleReducer('', {
            type: 'setSearchFilterStyle',
            filterStyle: 'soundex/levenshtein',
          })
        ).toEqual('soundex/levenshtein');
    });

    it('should return the initial sortTarget state', () => {
        expect(reducers.searchSortTargetReducer(undefined, {}))
        	.toEqual('name');
    });

    it('should handle setSearchSortTarget', () => {
        expect(
          reducers.searchSortTargetReducer('', {
            type: 'setSearchSortTarget',
            sortTarget: 'description',
          })
        ).toEqual('description');
    });

    it('should return the initial sortStyle state', () => {
        expect(reducers.searchSortStyleReducer(undefined, {}))
        	.toEqual('similarity');
    });

    it('should handle setSearchSortStyle', () => {
        expect(
          reducers.searchSortStyleReducer('', {
            type: 'setSearchSortStyle',
            sortStyle: 'metaphone/levenshtein',
          })
        ).toEqual('metaphone/levenshtein');
    });

    it('should return the initial sortDirection state', () => {
        expect(reducers.searchSortDirectionReducer(undefined, {}))
        	.toEqual('descending');
    });

    it('should handle setSearchSortDirection', () => {
        expect(
          reducers.searchSortDirectionReducer('', {
            type: 'setSearchSortDirection',
            sortDirection: 'ascending',
          })
        ).toEqual('ascending');
    });

    /* can't test [1] right now -- initial value is new Date().getTime(),
     * which has changed by the time the test is run. */
    it('should return the initial dateCreatedRange state', () => {
        expect(reducers.searchDateCreatedRangeReducer(undefined, {})[0])
        	.toEqual(0);
    });

    it('should handle setSearchDateCreatedRange', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            dateCreatedRange: [0, 1],
          })
        ).toEqual([0, 1]);
    });

    it('should reject dateCreatedRange input with more than 2 inputs', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            versionRange: [0, 1, 2],
          })
        ).toEqual('');
    });

    it('should reject dateCreatedRange input with [0] > [1]', () => {
        expect(
          reducers.searchDateCreatedRangeReducer('', {
            type: 'setSearchDateCreatedRange',
            versionRange: [1, 0],
          })
        ).toEqual('');
    });

    /* can't test [1] right now -- initial value is new Date().getTime(),
     * which has changed by the time the test is run. */
    it('should return the initial dateModifiedRange state', () => {
        expect(reducers.searchDateModifiedRangeReducer(undefined, {})[0])
        	.toEqual(0);
    });

    it('should handle setSearchDateModifiedRange', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            dateModifiedRange: [0, 1],
          })
        ).toEqual([0, 1]);
    });

    it('should reject dateModifiedRange input with more than 2 inputs', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            versionRange: [0, 1, 2],
          })
        ).toEqual('');
    });

    it('should reject dateModifiedRange input with [0] > [1]', () => {
        expect(
          reducers.searchDateModifiedRangeReducer('', {
            type: 'setSearchDateModifiedRange',
            versionRange: [1, 0],
          })
        ).toEqual('');
    });

    it('should return the initial versionRange state', () => {
        expect(reducers.searchVersionRangeReducer(undefined, {})).toEqual([]);
    });

    it('should handle setSearchVersionRange', () => {
        expect(
          reducers.searchVersionRangeReducer('', {
            type: 'setSearchVersionRange',
            versionRange: ['0', '1'],
          })
        ).toEqual(['0', '1']);
    });

    it('should reject versionRange input with more than 2 inputs', () => {
        expect(
          reducers.searchVersionRangeReducer('', {
            type: 'setSearchVersionRange',
            versionRange: ['0', '1', '2'],
          })
        ).toEqual('');
    });

    it('should return the initial subtype state', () => {
        expect(reducers.searchSubtypeReducer(undefined, {})).toEqual('');
    });

    it('should handle setSearchSubtype', () => {
        expect(
          reducers.searchSubtypeReducer('', {
            type: 'setSearchSubtype',
            subtype: 'scripts',
          })
        ).toEqual('scripts');
    });
});