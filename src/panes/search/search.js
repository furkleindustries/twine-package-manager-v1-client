/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';
import store from '../../store';
import { setSideBarVisible, } from '../../appActions';
import {
    setSearchedYet,
    setSearchQuery,
    setSearchResults,
    setSearchOptionsVisible,
    setSearchType,
    setSearchSubtype,
    setSearchFilterTargets,
    setSearchFilterStyle,
    setSearchSortTarget,
    setSearchSortStyle,
    setSearchSortDirection,
    setSearchDateCreatedRange,
    setSearchDateModifiedRange,
    setSearchVersionRange,
    setSearchMessage,
} from './searchActions';

/* components */
import Result from '../../components/Result/Result';

/* modules */
import search from '../../modules/search';
import deepCopy from '../../modules/deepCopy';
import unixTimeToSettingsTime from '../../modules/unixTimeToSettingsTime';
import onlyFirstLetterCapitalized from '../../modules/onlyFirstLetterCapitalized';

/* css */
import css from './search.css';

export class SearchPane extends Component {
    constructor() {
        super();

        this.searchKeyUp = this.searchKeyUp.bind(this);
        this.autocomplete = this.autocomplete.bind(this);
        this.search = this.search.bind(this);

        this.toggleOptions = this.toggleOptions.bind(this);

        this.setType = this.setType.bind(this);
        this.setSubtype = this.setSubtype.bind(this);
        this.setFilterTargets = this.setFilterTargets.bind(this);
        this.setFilterStyle = this.setFilterStyle.bind(this);
        this.setSortTarget = this.setSortTarget.bind(this);
        this.setSortStyle = this.setSortStyle.bind(this);
        this.setSortDirection = this.setSortDirection.bind(this);
        this.setDateCreatedRange = this.setDateCreatedRange.bind(this);
        this.setDateModifiedRange = this.setDateModifiedRange.bind(this);
        this.setVersionRange = this.setVersionRange.bind(this);
    }

    render() {
        const results = (this.props.results || []).map(result => {
            return (<Result
                key={result.id}
                id={result.id}
                name={result.name}
                description={result.description}
                keywords={result.keywords}
                homepage={result.homepage}
                createModal={this.props.createModal} />);
        });

        let resultsObj;
        if (results.length) {
            resultsObj = results;
        } else if (this.props.searchedYet) {
            resultsObj = 'No results.';
        } else {
            resultsObj = '';
        }

        const canUseDescription =
            this.props.filterStyle !== 'similarity' &&
            this.props.filterStyle !== 'levenshtein' &&
            this.props.filterStyle !== 'soundex/levenshtein' &&
            this.props.filterStyle !== 'metaphone/levenshtein';

        const opts = {};
        if (!canUseDescription) {
            opts.disabled = 'disabled';
        }

        let processedFilterStyle = onlyFirstLetterCapitalized(this.props.filterStyle);
        if (processedFilterStyle === 'Metaphone/contains') {
            processedFilterStyle = 'Metaphone/Contains';
        } else if (processedFilterStyle === 'Soundex/levenshtein') {
            processedFilterStyle = 'Soundex/Levenshtein';
        } else if (processedFilterStyle === 'Metaphone/levenshtein') {
            processedFilterStyle = 'Metaphone/Levenshtein';
        }

        let processedSortStyle = onlyFirstLetterCapitalized(this.props.sortStyle);
        if (processedSortStyle === 'Soundex/levenshtein') {
            processedSortStyle = 'Soundex/Levenshtein';
        } else if (processedSortStyle === 'Metaphone/levenshtein') {
            processedSortStyle = 'Metaphone/Levenshtein';
        }

        return (
            <div className="Search paneContainer">
                <input
                    className="Search-bar subheader"
                    value={this.props.searchQuery}
                    onKeyUp={this.searchKeyUp} />

                <button
                    className="Search-options body"
                    onClick={this.toggleOptions}>
                    Options
                </button>

                <button
                    className="Search-button body"
                    onClick={this.search}>
                    Search
                </button>

                <div className="Search-status body">
                    {this.props.message}
                </div>

                <div className="Search-resultsContainer">
                    {resultsObj}
                </div>

                <div className={"Search-optionsContainer" + (this.props.optionsVisible ? "" : " hidden")}>
                    <div className="Search-option">
                        <label
                            className="Search-label"
                            htmlFor="Search-type">
                            I want to find:
                        </label>

                        <select
                            id="Search-type"
                            className="Search-select body"
                            value={onlyFirstLetterCapitalized(this.props.type)}
                            onChange={this.setType}>
                            <option>Packages</option>
                            <option>Users</option>
                        </select>
                    </div>

                    <div className="Search-option body">
                        <label className="Search-label">
                            Matching the search term to the following fields:
                        </label>

                        <div className="Search-checkboxPair">
                            <label
                                className="Search-label Search-checkboxLabel"
                                htmlFor="Search-filterTargetId">
                                ID:
                            </label>

                            <input
                                id="Search-filterTargetId"
                                className="Search-checkbox"
                                type="checkbox"
                                checked={(this.props.filterTargets || []).indexOf('id') !== -1}
                                onChange={this.setFilterTargets}
                                ref={input => this.filterTargetId = input} />
                        </div>

                        <div className="Search-checkboxPair">
                            <label
                                className="Search-label Search-checkboxLabel"
                                htmlFor="Search-filterTargetName">
                                Name:
                            </label>

                            <input
                                id="Search-filterTargetName"
                                className="Search-checkbox"
                                type="checkbox"
                                checked={(this.props.filterTargets || []).indexOf('name') !== -1}
                                onChange={this.setFilterTargets}
                                ref={input => this.filterTargetName = input} />
                        </div>

                        <div className="Search-checkboxPair">
                            <label
                                className={"Search-label Search-checkboxLabel" + (canUseDescription ? "" : " disabled")}
                                htmlFor="Search-filterTargetDescription">
                                Description:
                            </label>

                            <input
                                id="Search-filterTargetDescription"
                                className="Search-checkbox"
                                type="checkbox"
                                checked={(this.props.filterTargets || []).indexOf('description') !== -1}
                                onChange={this.setFilterTargets}
                                ref={input => this.filterTargetDescription = input} 
                                {...opts} />
                        </div>

                        <div className="Search-checkboxPair">
                            <label
                                className="Search-label Search-checkboxLabel"
                                htmlFor="Search-filterTargetKeywords">
                                Keywords:
                            </label>

                            <input
                                id="Search-filterTargetKeywords"
                                className="Search-checkbox"
                                type="checkbox"
                                checked={(this.props.filterTargets || []).indexOf('keywords') !== -1}
                                onChange={this.setFilterTargets}
                                ref={input => this.filterTargetKeywords = input} />
                        </div>

                        <div className="Search-checkboxPair">
                            <label
                                className="Search-label Search-checkboxLabel"
                                htmlFor="Search-filterTargetHomepage">
                                Homepage:
                            </label>

                            <input
                                id="Search-filterTargetHomepage"
                                className="Search-checkbox"
                                type="checkbox"
                                checked={(this.props.filterTargets || []).indexOf('homepage') !== -1}
                                onChange={this.setFilterTargets}
                                ref={input => this.filterTargetHomepage = input} />
                        </div>
                    </div>

                    <div className="Search-option">
                        <label
                            className="Search-label"
                            htmlFor="Search-filterStyle">
                            Matching results with the following method:
                        </label>

                        <select
                            id="Search-filterStyle"
                            className="Search-select body"
                            value={processedFilterStyle}
                            onChange={this.setFilterStyle}>
                            <option>Exact</option>
                            <option>Contains</option>
                            <option>Metaphone/Contains</option>
                            <option>Similarity</option>
                            <option>Levenshtein</option>
                            <option>Soundex/Levenshtein</option>
                            <option>Metaphone/Levenshtein</option>
                        </select>
                    </div>

                    <div className="Search-option">
                        <label
                            className="Search-label"
                            htmlFor="Search-sortTarget">
                            Sorting based on the following field:
                        </label>

                        <select
                            id="Search-sortTarget"
                            className="Search-select body"
                            value={/id/i.test(this.props.sortTarget) ? 'ID' : onlyFirstLetterCapitalized(this.props.sortTarget)}
                            onChange={this.setSortTarget}>
                            <option>ID</option>
                            <option>Name</option>
                            <option>Description</option>
                            <option>Keywords</option>
                            <option>Homepage</option>
                        </select>
                    </div>

                    <div className="Search-option">
                        <label
                            className="Search-label"
                            htmlFor="Search-sortStyle">
                            Sorting based on the following method:
                        </label>

                        <select
                            id="Search-sortStyle"
                            className="Search-select body"
                            value={processedSortStyle}
                            onChange={this.setSortStyle}>
                            <option>Alphanumeric</option>
                            <option>Similarity</option>
                            <option>Levenshtein</option>
                            <option>Soundex/Levenshtein</option>
                            <option>Metaphone/Levenshtein</option>
                        </select>
                    </div>

                    <div className="Search-option">
                        <label
                            className="Search-label"
                            htmlFor="Search-sortDirection">
                            Sorting in the following direction:
                        </label>

                        <select
                            id="Search-sortDirection"
                            className="Search-select body"
                            value={onlyFirstLetterCapitalized(this.props.sortDirection)}
                            onChange={this.setSortDirection}>
                            <option>Descending</option>
                            <option>Ascending</option>
                        </select>
                    </div>

                    <div className="Search-option">
                        <label className="Search-label">
                            {"Restricting results to "}
                            {this.props.type}
                            {" created..."}
                        </label>

                        <label
                            className="Search-italicLabel"
                            htmlFor="Search-dateCreatedRangeLower">
                            from:
                        </label>

                        <input
                            id="Search-dateCreatedRangeLower"
                            className="Search-rangeSlider"
                            type="range"
                            min="0"
                            max={Math.floor(new Date().getTime())}
                            step="8640"
                            value={(this.props.dateCreatedRange || [])[0]}
                            ref={input => this.dateCreatedRangeLower = input}
                            onChange={this.setDateCreatedRange} />

                        <div className="Search-rangeSliderOutput">
                            {unixTimeToSettingsTime(
                                (this.props.dateCreatedRange || [])[0])}
                        </div>

                        <label
                            className="Search-italicLabel"
                            htmlFor="Search-dateCreatedRangeLower">
                            to:
                        </label>

                        <input
                            id="Search-dateCreatedRangeUpper"
                            className="Search-rangeSlider"
                            type="range"
                            min="0"
                            max={Math.floor(new Date().getTime())}
                            step="8640"
                            value={(this.props.dateCreatedRange || [])[1]}
                            ref={input => this.dateCreatedRangeUpper = input}
                            onChange={this.setDateCreatedRange} />
                        <div className="Search-rangeSliderOutput">
                            {unixTimeToSettingsTime(
                                (this.props.dateCreatedRange || [])[1])}
                        </div>
                    </div>

                    {
                        this.props.type === 'packages' ?
                            <div className="Search-option">
                                <label className="Search-label">
                                    Restricting results to packages modified...
                                </label>

                                <label
                                    className="Search-italicLabel"
                                    htmlFor="Search-dateModifiedRangeLower">
                                    from:
                                </label>

                                <input
                                    id="Search-dateModifiedRangeLower"
                                    className="Search-rangeSlider"
                                    type="range"
                                    min="0"
                                    max={Math.floor(new Date().getTime())}
                                    step="8640"
                                    value={(this.props.dateModifiedRange || [])[0]}
                                    ref={input => this.dateModifiedRangeLower = input}
                                    onChange={this.setDateModifiedRange} />

                                <div className="Search-rangeSliderOutput">
                                    {unixTimeToSettingsTime(
                                        (this.props.dateModifiedRange || [])[0])}
                                </div>

                                <label
                                    className="Search-italicLabel"
                                    htmlFor="Search-dateCreatedRangeLower">
                                    to:
                                </label>

                                <input
                                    id="Search-dateModifiedRangeLower"
                                    className="Search-rangeSlider"
                                    type="range"
                                    min="0"
                                    max={Math.floor(new Date().getTime())}
                                    step="8640"
                                    value={(this.props.dateModifiedRange || [])[1]}
                                    ref={input => this.dateModifiedRangeUpper = input}
                                    onChange={this.setDateModifiedRange} />
                                <div className="Search-rangeSliderOutput">
                                    {unixTimeToSettingsTime(
                                        (this.props.dateModifiedRange || [])[1])}
                                </div>
                            </div>
                            :
                            null
                    }

                    {
                        this.props.type === 'packages' ?
                            <div className="Search-option">
                                <label className="Search-label">
                                    Restricting results to packages with a
                                    current version...
                                </label>

                                <label
                                    className="Search-italicLabel"
                                    htmlFor="Search-dateCreatedRangeLower">
                                    from:
                                </label>

                                <input
                                    id="Search-versionRangeLower"
                                    className="Search-input"
                                    value={(this.props.versionRange || [])[0]}
                                    ref={input => this.versionRangeLower = input}
                                    onChange={this.setVersionRange} />

                                <label
                                    className="Search-italicLabel"
                                    htmlFor="Search-versionRangeLower">
                                    to:
                                </label>

                                <input
                                    id="Search-versionRangeLower"
                                    className="Search-input"
                                    value={(this.props.versionRange || [])[1]}
                                    ref={input => this.versionRangeUpper = input}
                                    onChange={this.setVersionRange} />
                            </div>
                            :
                            null
                    }

                    <div
                        className="Search-optionsClose body"
                        onClick={this.toggleOptions}>
                        ✖
                    </div>
                </div>
                <style>{css}</style>
            </div>
        ); 
    }

    componentDidMount() {
        store.dispatch(setSideBarVisible(false));
    }

    autocomplete() {

    }

    searchKeyUp(e) {
        if (e.keyCode === 13) {
            this.search();
        } else {
            store.dispatch(setSearchQuery(e.target.value));

            //              delete              space
            if (e.keyCode !== 46 && e.keyCode !== 32) {
                this.autocomplete();
            }
        }
    }

    toggleOptions() {
        store.dispatch(setSearchOptionsVisible(!this.props.optionsVisible));
    }

    serializeSearchOptions() {
        const searchObj = store.getState().search;

        if (!searchObj || typeof searchObj !== 'object') {
            console.log('Could not find search object in store.');
            return;
        }

        /* do not serialize application state; only serialize user settings */
        delete searchObj.searchedYet;
        delete searchObj.query;
        delete searchObj.results;
        delete searchObj.message;
        delete searchObj.optionsVisible;

        localStorage.twinepmSearchOptions = JSON.stringify(searchObj);
    }

    setType(e) {
        store.dispatch(setSearchType(e.target.value.toLowerCase()));

        this.serializeSearchOptions();
    }

    setSubtype(e) {
        store.dispatch(setSearchSubtype(e.target.value.toLowerCase()));

        this.serializeSearchOptions();
    }

    setFilterTargets() {
        const filterTargets = [];
        if (this.filterTargetId && this.filterTargetId.checked) {
            filterTargets.push('id');
        }

        if (this.filterTargetName && this.filterTargetName.checked) {
            filterTargets.push('name');
        }

        if (this.filterTargetDescription &&
            this.filterTargetDescription.checked)
        {
            filterTargets.push('description');
        }

        if (this.filterTargetKeywords && this.filterTargetKeywords.checked) {
            filterTargets.push('keywords');
        }

        if (this.filterTargetHomepage && this.filterTargetHomepage.checked) {
            filterTargets.push('homepage');
        }

        store.dispatch(setSearchFilterTargets(filterTargets));

        this.serializeSearchOptions();
    }

    setFilterStyle(e) {
        store.dispatch(setSearchFilterStyle(e.target.value.toLowerCase()));

        this.serializeSearchOptions();
    }

    setSortTarget(e) {
        store.dispatch(setSearchSortTarget(e.target.value.toLowerCase()));

        this.serializeSearchOptions();
    }

    setSortStyle(e) {
        store.dispatch(setSearchSortStyle(e.target.value.toLowerCase()));

        this.serializeSearchOptions();
    }

    setSortDirection(e) {
        store.dispatch(setSearchSortDirection(e.target.value.toLowerCase()));

        this.serializeSearchOptions();
    }

    setDateCreatedRange(e) {
        const arr = [
            Number(this.dateCreatedRangeLower.value),
            Number(this.dateCreatedRangeUpper.value),
        ];

        store.dispatch(setSearchDateCreatedRange(arr));

        this.serializeSearchOptions();
    }

    setDateModifiedRange() {
        const arr = [
            Number(this.dateModifiedRangeLower.value),
            Number(this.dateModifiedRangeUpper.value),
        ];

        store.dispatch(setSearchDateModifiedRange(arr));

        this.serializeSearchOptions();
    }

    setVersionRange(e) {
        const arr = [
            this.versionRangeLower.value,
            this.versionRangeUpper.value,
        ];

        store.dispatch(setSearchVersionRange(arr));

        this.serializeSearchOptions();
    }

    search() {
        const searchObj = {
            query: this.props.query,
            type: this.props.type,
            filterTargets: this.props.filterTargets,
            filterStyle: this.props.filterStyle,
            sortTarget: this.props.sortTarget,
            sortStyle: this.props.sortStyle,
            sortDirection: this.props.sortDirection,
            dateCreatedRange: this.props.dateCreatedRange,
            dateModifiedRange: this.props.dateModifiedRange,
            versionRange: this.props.versionRange,
            subtype: this.props.subtype,
        };

        search(searchObj, this.props.csrfToken);
    }
}

function mapStateToProps() {
    const state = store.getState();
    const search = state.search;

    return {
        searchedYet: search.searchedYet,
        query: search.query,
        results: search.results,
        optionsVisible: search.optionsVisible,
        type: search.type,
        filterTargets: search.filterTargets,
        filterStyle: search.filterStyle,
        sortTarget: search.sortTarget,
        sortStyle: search.sortStyle,
        sortDirection: search.sortDirection,
        dateCreatedRange: search.dateCreatedRange,
        dateModifiedRange: search.dateModifiedRange,
        versionRange: search.versionRange,
        subtype: search.subtype,
        message: search.message,
        csrfToken: state.csrfToken,
    };
}

export default connect(mapStateToProps)(SearchPane);