// redux
import { combineReducers, } from 'redux';

//////// APPLICATION STATE ////////
export function searchedYetReducer(previous = false, action) {
	if (action.type === 'setSearchedYet') {
		if (action.searchedYet === true) {
			return action.searchedYet;
		}
	} else if (action.type === 'setSearchOptions') {
		if (action.searchOptions.searchedYet === true) {
			return action.searchOptions.searchedYet;
		}
	}

	return previous;
}

export function searchQueryReducer(previous = '', action) {
	if (action.type === 'setSearchQuery') {
		if (typeof action.query === 'string') {
			return action.query;
		}
	} else if (action.type === 'setSearchOptions') {
		if (typeof action.searchOptions.query === 'string') {
			return action.searchOptions.query;
		}
	}

	return previous;
}

export function searchResultsReducer(previous = [], action) {
	if (action.type === 'setSearchResults') {
		if (action.results &&
			typeof action.results === 'object' &&
			'length' in action.results)
		{
			return action.results;
		}
	} else if (action.type === 'setSearchOptions') {
		if (action.searchOptions.results &&
			typeof action.searchOptions.results === 'object' &&
			'length' in action.searchOptions.results)
		{
			return action.searchOptions.results;
		}
	}

	return previous;
}

export function searchOptionsVisibleReducer(previous = false, action) {
	if (action.type === 'setSearchOptionsVisible') {
		if (typeof action.optionsVisible === 'boolean') {
			return action.optionsVisible;
		}
	} else if (action.type === 'setSearchOptions') {
		if (typeof action.searchOptions.optionsVisible === 'boolean') {
			return action.searchOptions.optionsVisible;
		}
	}

	return previous;
}

export function searchMessageReducer(previous = '', action) {
	if (action.type === 'setSearchMessage') {
		if (typeof action.message === 'string') {
			return action.message;
		}
	} else if (action.type === 'setSearchOptions') {
		if (typeof action.searchOptions.message === 'string') {
			return action.searchOptions.message;
		}
	}

	return previous;
}
//////// END APPLICATION STATE ///////

//////// USER SETTINGS ////////
const type = 'packages';
const allTypes = ['packages', 'users'];
export function searchTypeReducer(previous = type, action) {
	if (action.type === 'setSearchType') {
		if (allTypes.indexOf(action.searchType) !== -1) {
			return action.searchType;		
		}
	} else if (action.type === 'setSearchOptions') {
		if (allTypes.indexOf(action.searchOptions.type) !== -1) {
			return action.searchOptions.type;
		}
	}

	return previous;
}

const filterTargets = ['id', 'name', 'description', 'keywords', 'homepage'];
export function searchFilterTargetsReducer(previous = filterTargets, action) {
	if (action.type === 'setSearchFilterTargets') {
		const tgts = action.filterTargets;
		if (tgts && typeof tgts === 'object' && 'length' in tgts) {
			for (let ii = 0; ii < tgts.length; ii++) {
				const index = filterTargets.indexOf(tgts[ii]);
				if (index === -1) {
					return previous;
				}
			}

			return tgts;
		}
	} else if (action.type === 'setSearchOptions') {
		const tgts = action.searchOptions.filterTargets;
		if (tgts && typeof tgts === 'object' && 'length' in tgts) {
			for (let ii = 0; ii < tgts.length; ii++) {
				const index = filterTargets.indexOf(tgts[ii]);
				if (index === -1) {
					return previous;
				}
			}

			return tgts;
		}
	}

	return previous;
}

const allFilterStyles = [
	'exact',
	'contains',
	'metaphone/contains',
	'similarity',
	'levenshtein',
	'soundex/levenshtein',
	'metaphone/levenshtein',
];
const filterStyle = 'metaphone/contains';
export function searchFilterStyleReducer(previous = filterStyle, action) {
	if (action.type === 'setSearchFilterStyle') {
		if (allFilterStyles.indexOf(action.filterStyle) !== -1) {
			return action.filterStyle;
		}
	} else if (action.type === 'setSearchOptions') {
		if (allFilterStyles.indexOf(action.searchOptions.filterStyle) !== -1) {
			return action.searchOptions.filterStyle;
		}
	}

	return previous;
}

const allSortTargets = ['id', 'name', 'description', 'keywords', 'homepage'];
const sortTarget = 'name';
export function searchSortTargetReducer(previous = sortTarget, action) {
	if (action.type === 'setSearchSortTarget') {
		if (allSortTargets.indexOf(action.sortTarget) !== -1) {
			return action.sortTarget;
		}
	} else if (action.type === 'setSearchOptions') {
		if (allSortTargets.indexOf(action.searchOptions.sortTarget) !== -1) {
			return action.searchOptions.sortTarget;
		}
	}

	return previous;
}

const allSortStyles = [
	'alphanumeric',
	'similarity',
	'levenshtein',
	'soundex/levenshtein',
	'metaphone/levenshtein',
];
const sortStyle = 'similarity';
export function searchSortStyleReducer(previous = sortStyle, action) {
	if (action.type === 'setSearchSortStyle') {
		if (allSortStyles.indexOf(action.sortStyle) !== -1) {
			return action.sortStyle;
		}
	} else if (action.type === 'setSearchOptions') {
		if (allSortStyles.indexOf(action.searchOptions.sortStyle) !== -1) {
			return action.searchOptions.sortStyle;
		}
	}

	return previous;
}

const allSortDirections = ['ascending', 'descending'];
const sortDirection = 'descending';
export function searchSortDirectionReducer(previous = sortDirection, action) {
	if (action.type === 'setSearchSortDirection') {
		if (allSortDirections.indexOf(action.sortDirection) !== -1) {
			return action.sortDirection;
		}
	} else if (action.type === 'setSearchOptions') {
		if (allSortDirections.indexOf(action.searchOptions.sortDirection) !== -1) {
			return action.searchOptions.sortDirection;
		}
	}

	return previous;
}

const defaultDateCreated = [0, new Date().getTime()];
export function searchDateCreatedRangeReducer(previous = defaultDateCreated, action) {
	if (action.type === 'setSearchDateCreatedRange') {
		if (action.dateCreatedRange &&
			typeof action.dateCreatedRange === 'object' &&
			action.dateCreatedRange.length === 2 &&
			action.dateCreatedRange[0] % 1 === 0 &&
			action.dateCreatedRange[1] % 1 === 0 &&
			action.dateCreatedRange[0] >= 0 &&
			action.dateCreatedRange[1] >=
				action.dateCreatedRange[0])
		{
			return action.dateCreatedRange;
		}
	} else if (action.type === 'setSearchOptions') {
		if (action.searchOptions.dateCreatedRange &&
			typeof action.searchOptions.dateCreatedRange === 'object' &&
			action.searchOptions.dateCreatedRange.length === 2 &&
			action.searchOptions.dateCreatedRange[0] % 1 === 0 &&
			action.searchOptions.dateCreatedRange[1] % 1 === 0 &&
			action.searchOptions.dateCreatedRange[0] >= 0 &&
			action.searchOptions.dateCreatedRange[1] >=
				action.searchOptions.dateCreatedRange[0])
		{
			return action.searchOptions.dateCreatedRange;
		}
	}

	return previous;
}

const defaultDateModified = [0, new Date().getTime()];
export function searchDateModifiedRangeReducer(previous = defaultDateModified, action) {
	if (action.type === 'setSearchDateModifiedRange') {
		if (action.dateModifiedRange &&
			typeof action.dateModifiedRange === 'object' &&
			action.dateModifiedRange.length === 2 &&
			action.dateModifiedRange[0] % 1 === 0 &&
			action.dateModifiedRange[1] % 1 === 0 &&
			action.dateModifiedRange[0] >= 0 &&
			action.dateModifiedRange[1] >=
				action.dateModifiedRange[0])
		{
			return action.dateModifiedRange;
		}
	} else if (action.type === 'setSearchOptions') {
		if (action.searchOptions.dateModifiedRange &&
			typeof action.searchOptions.dateModifiedRange === 'object' &&
			action.searchOptions.dateModifiedRange.length === 2 &&
			action.searchOptions.dateModifiedRange[0] % 1 === 0 &&
			action.searchOptions.dateModifiedRange[1] % 1 === 0 &&
			action.searchOptions.dateModifiedRange[0] >= 0 &&
			action.searchOptions.dateModifiedRange[1] >=
				action.searchOptions.dateModifiedRange[0])
		{
			return action.searchOptions.dateModifiedRange;
		}
	}

	return previous;
}

export function searchVersionRangeReducer(previous = [], action) {
	if (action.type === 'setSearchVersionRange') {
		if (action.versionRange &&
			typeof action.versionRange === 'object' &&
			action.versionRange.length <= 2)
		{
			return action.versionRange;
		}
	} else if (action.type === 'setSearchOptions') {
		if (action.searchOptions.versionRange &&
			typeof action.searchOptions.versionRange === 'object' &&
			action.searchOptions.versionRange.length <= 2)
		{
			return action.searchOptions.versionRange;
		}
	}

	return previous;
}

const allSubtypes = [
	'scripts',
	'styles',
	'macros',
	'passagethemes',
	'storythemes'
];
const subtype = '';
export function searchSubtypeReducer(previous = subtype, action) {
	if (action.type === 'setSearchSubtype') {
		if (action.subtype === '' ||
			allSubtypes.indexOf(action.subtype) !== -1)
		{
			return action.subtype;
		}
	} else if (action.type === 'setSearchOptions') {
		if (action.searchOptions.subtype === '' ||
			allSubtypes.indexOf(action.searchOptions.subtype) !== -1)
		{
			return action.searchOptions.subtype;
		}
	}

	return previous;
}
/////// END USER SETTINGS ////////

/* must be at the bottom - investigate why? */
export const searchOptionsReducer = combineReducers({
	searchedYet: searchedYetReducer,
	query: searchQueryReducer,
	results: searchResultsReducer,
	optionsVisible: searchOptionsVisibleReducer,
	type: searchTypeReducer,
	filterTargets: searchFilterTargetsReducer,
	filterStyle: searchFilterStyleReducer,
	sortTarget: searchSortTargetReducer,
	sortStyle: searchSortStyleReducer,
	sortDirection: searchSortDirectionReducer,
	dateCreatedRange: searchDateCreatedRangeReducer,
	dateModifiedRange: searchDateModifiedRangeReducer,
	versionRange: searchVersionRangeReducer,
	subtype: searchSubtypeReducer,
	message: searchMessageReducer,
});