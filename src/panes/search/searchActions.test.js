import * as actions from './searchActions'

describe('search action unit tests', () => {
    it('creates a valid setSearchedYet action', () => {
        const searchedYet = true;

        const object = {
            searchedYet,
            type: 'setSearchedYet',
        };

        expect(actions.setSearchedYet(searchedYet)).toEqual(object);
    });

    it('creates a valid setSearchQuery action', () => {
        const query = 'testing';

        const object = {
            query,
            type: 'setSearchQuery',
        };

        expect(actions.setSearchQuery(query)).toEqual(object);
    });

    it('creates a valid setSearchResults action', () => {
        const results = {
            test: 'testing',
        };

        const object = {
            results,
            type: 'setSearchResults',
        };

        expect(actions.setSearchResults(results)).toEqual(object);
    });

    it('creates a valid setSearchMessage action', () => {
        const message = 'test';

        const object = {
            message,
            type: 'setSearchMessage',
        };

        expect(actions.setSearchMessage(message)).toEqual(object);
    });

    it('creates a valid setSearchOptions action', () => {
        const searchOptions = {
            testing: 'test',
        };

        const object = {
            searchOptions,
            type: 'setSearchOptions',
        };

        expect(actions.setSearchOptions(searchOptions)).toEqual(object);
    });

    it('creates a valid setSearchOptionsVisible action', () => {
        const optionsVisible = true;

        const object = {
            optionsVisible,
            type: 'setSearchOptionsVisible',
        };

        expect(actions.setSearchOptionsVisible(optionsVisible))
            .toEqual(object);
    });

    it('creates a valid setSearchType action', () => {
        const searchType = 'tester';

        const object = {
            searchType,
            type: 'setSearchType',
        };

        expect(actions.setSearchType(searchType)).toEqual(object);
    });

    it('creates a valid setSearchFilterTargets action', () => {
        const filterTargets = ['description'];

        const object = {
            filterTargets,
            type: 'setSearchFilterTargets',
        };

        expect(actions.setSearchFilterTargets(filterTargets)).toEqual(object);
    });

    it('creates a valid setSearchFilterStyle action', () => {
        const filterStyle = 'metaphone/contains';

        const object = {
            filterStyle,
            type: 'setSearchFilterStyle',
        };

        expect(actions.setSearchFilterStyle(filterStyle)).toEqual(object);
    });

    it('creates a valid setSearchSortTarget action', () => {
        const sortTarget = 'keywords';

        const object = {
            sortTarget,
            type: 'setSearchSortTarget',
        };

        expect(actions.setSearchSortTarget(sortTarget)).toEqual(object);
    });

    it('creates a valid setSearchSortStyle action', () => {
        const sortStyle = 'metaphone/levenshtein';

        const object = {
            sortStyle,
            type: 'setSearchSortStyle',
        };

        expect(actions.setSearchSortStyle(sortStyle)).toEqual(object);
    });

    it('creates a valid setSearchSortDirection action', () => {
        const sortDirection = 'ascending';

        const object = {
            sortDirection,
            type: 'setSearchSortDirection',
        };

        expect(actions.setSearchSortDirection(sortDirection)).toEqual(object);
    });

    it('creates a valid setSearchDateCreatedRange action', () => {
        const dateCreatedRange = [0, 1000];

        const object = {
            dateCreatedRange,
            type: 'setSearchDateCreatedRange',
        };

        expect(actions.setSearchDateCreatedRange(dateCreatedRange))
            .toEqual(object);
    });

    it('creates a valid setSearchDateModifiedRange action', () => {
        const dateModifiedRange = [1000, 2000];

        const object = {
            dateModifiedRange,
            type: 'setSearchDateModifiedRange',
        };

        expect(actions.setSearchDateModifiedRange(dateModifiedRange))
            .toEqual(object);
    });

    it('creates a valid setSearchVersionRange action', () => {
        const versionRange = ['1', '2'];

        const object = {
            versionRange,
            type: 'setSearchVersionRange',
        };

        expect(actions.setSearchVersionRange(versionRange))
            .toEqual(object);
    });

    it('creates a valid setSearchSubtype action', () => {
        const subtype = 'macros';

        const object = {
            subtype,
            type: 'setSearchSubtype',
        };

        expect(actions.setSearchSubtype(subtype))
            .toEqual(object);
    });
});