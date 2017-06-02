/* redux */
import {
    setSearchResults,
    setSearchedYet,
    setSearchMessage,
} from '../panes/search/searchActions';

/* modules */
import * as get from './database/get';
import deepCopy from './deepCopy';

export default async function search(store, searchObj, csrfToken) {
    if (!searchObj || typeof searchObj !== 'object') {
        console.log('The searchObj argument provided to search was not a ' +
            'non-null object.');
        return false;
    } else if (!csrfToken || typeof csrfToken !== 'string') {
        console.log('The csrfToken argument provided to search was not a ' +
            'non-empty string.');
        return false;
    }

    const type = searchObj.type;

    let filterTargets;
    if (searchObj.filterTargets &&
        typeof searchObj.filterTargets === 'object' &&
        'length' in searchObj.filterTargets &&
        searchObj.filterTargets.length >= 1)
    {
        let ft = searchObj.filterTargets;
        
        const canUseDescription =
            searchObj.filterStyle !== 'similarity' &&
            searchObj.filterStyle !== 'levenshtein' &&
            searchObj.filterStyle !== 'soundex/levenshtein' &&
            searchObj.filterStyle !== 'metaphone/levenshtein';
        /* do not allow description as a target when using similarity-based
         * filter styles */
        if (!canUseDescription) {
            ft = ft.filter(aa => aa !== 'description');
        }

        filterTargets = JSON.stringify(ft);
    }


    const filterStyle = searchObj.filterStyle;

    const sortTarget = searchObj.sortTarget;
    const sortStyle = searchObj.sortStyle;
    const sortDirection = searchObj.sortDirection;

    let dateCreatedRange;
    if (searchObj.dateCreatedRange &&
        searchObj.dateCreatedRange.length === 2)
    {
        dateCreatedRange = JSON.stringify(searchObj.dateCreatedRange);
    }

    let dateModifiedRange;
    if (searchObj.dateModifiedRange &&
        searchObj.dateModifiedRange.length === 2)
    {
        dateModifiedRange = JSON.stringify(searchObj.dateModifiedRange);
    }

    let versionRange;
    if (searchObj.versionRange &&
        searchObj.versionRange.length === 2 &&
        searchObj.versionRange[0] &&
        searchObj.versionRange[1])
    {
        versionRange = JSON.stringify(searchObj.versionRange);
    }

    let paramStr = '?';

    if (type) {
        paramStr += 'type=' + encodeURIComponent(type) + '&';
    }

    if (searchObj.query) {
        paramStr += 'query=' + encodeURIComponent(searchObj.query) + '&';
    }

    if (filterTargets && filterTargets.length >= 1) {
        paramStr += 'filterTargets=' + encodeURIComponent(filterTargets) + '&';
    }

    if (filterStyle) {
        paramStr += 'filterStyle=' + encodeURIComponent(filterStyle) + '&';
    }

    if (sortTarget) {
        paramStr += 'sortTarget=' + encodeURIComponent(sortTarget) + '&';        
    }

    if (sortStyle) {
        paramStr += 'sortStyle=' + encodeURIComponent(sortStyle) + '&';
    }

    if (sortDirection) {
        paramStr += 'sortDirection=' + encodeURIComponent(sortDirection) +
            '&';
    }

    if (dateCreatedRange) {
        paramStr += 'dateCreatedRange=' +
            encodeURIComponent(dateCreatedRange) + '&';
    }

    if (dateModifiedRange) {
        paramStr += 'dateModifiedRange=' +
            encodeURIComponent(dateModifiedRange) + '&';
    }

    if (versionRange) {
        paramStr += 'versionRange=' + encodeURIComponent(versionRange) + '&';
    }

    if (searchObj.subtype && searchObj.type === 'packages') {
        paramStr += 'subtype=' + encodeURIComponent(searchObj.subtype) + '&';
    }

    /* remove last & */
    if (paramStr[paramStr.length - 1] === '&') {
        paramStr = paramStr.slice(0, paramStr.length - 1);
    }

    let responseObj;
    try {
        responseObj = await get.search(paramStr);
    } catch (e) {
        console.log(e);
        return;
    }

    let message = '';
    let succeeded = false;
    if (!responseObj) {
        message = 'There was an error in receiving or deserializing the ' +
            'server response.';
    } else if (responseObj.error) {
        message = responseObj.error;
    } else if (responseObj.status !== 200) {
        message = 'The request did not succeed, but there was no ' +
            'error received.';
    } else {
        succeeded = true;

        if (!responseObj.results ||
            typeof responseObj.results !== 'object' ||
            !('length' in responseObj.results))
        {
            message = 'The search was performed, but the response ' +
                'object either did not contain the results ' +
                'property, or it was in an invalid format.';
            succeeded = false;
        }

        if (succeeded) {
            store.dispatch(setSearchResults(responseObj.results));
            store.dispatch(setSearchedYet(true));
        } else {
            store.dispatch(setSearchResults([]));
        }

    }

    store.dispatch(setSearchMessage(message));

    setTimeout(() => {
        if (store.getState().searchMessage === message) {
            store.dispatch(setSearchMessage(''));
        }
    }, 6000);

    return succeeded;
}