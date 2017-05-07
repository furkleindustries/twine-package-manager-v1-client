export function setSearchedYet(searchedYet) {
	return {
		searchedYet,
		type: 'setSearchedYet',
	};
}

export function setSearchQuery(query) {
	return {
		query,
		type: 'setSearchQuery',
	};
}

export function setSearchResults(results) {
	return {
		results,
		type: 'setSearchResults',
	};
}

export function setSearchMessage(message) {
	return {
		message,
		type: 'setSearchMessage',
	};
}

export function setSearchOptions(searchOptions) {
	return {
		searchOptions,
		type: 'setSearchOptions',
	};
}

export function setSearchOptionsVisible(optionsVisible) {
	return {
		optionsVisible,
		type: 'setSearchOptionsVisible',
	};
}
		
export function setSearchType(searchType) {
	return {
		searchType,
		type: 'setSearchType',
	};
}

export function setSearchFilterTargets(filterTargets) {
	return {
		filterTargets,
		type: 'setSearchFilterTargets',
	};
}

export function setSearchFilterStyle(filterStyle) {
	return {
		filterStyle,
		type: 'setSearchFilterStyle',
	};
}

export function setSearchSortTarget(sortTarget) {
	return {
		sortTarget,
		type: 'setSearchSortTarget',
	};
}

export function setSearchSortStyle(sortStyle) {
	return {
		sortStyle,
		type: 'setSearchSortStyle',
	};
}

export function setSearchSortDirection(sortDirection) {
	return {
		sortDirection,
		type: 'setSearchSortDirection',
	};
}

export function setSearchDateCreatedRange(dateCreatedRange) {
	return {
		dateCreatedRange,
		type: 'setSearchDateCreatedRange',
	};
}

export function setSearchDateModifiedRange(dateModifiedRange) {
	return {
		dateModifiedRange,
		type: 'setSearchDateModifiedRange',
	};
}

export function setSearchVersionRange(versionRange) {
	return {
		versionRange,
		type: 'setSearchVersionRange',
	};
}

export function setSearchSubtype(subtype) {
	return {
		subtype,
		type: 'setSearchSubtype',
	};
}