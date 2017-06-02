/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';

import {
    setPackageCreatingName,
    setPackageCreatingType,
    setPackageCreatingVersion,
    setPackageCreatingDescription,
    setPackageCreatingHomepage,
    setPackageCreatingJs,
    setPackageCreatingCss,
    setPackageCreatingKeywords,
    setPackageCreatingTag,
} from './PackageCreateModalActions';

/* modules */
import packageCreate from '../../modules/packageCreate';
import modalClose from '../../modules/modals/close';
import onlyFirstLetterCapitalized from '../../modules/onlyFirstLetterCapitalized';

/* css */
/*import css from './PackageCreateModal.css';*/

export class PackageCreateModal extends Component {
    constructor() {
        super();

        this.createPackage = this.createPackage.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleVersionChange = this.handleVersionChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleHomepageChange = this.handleHomepageChange.bind(this);
        this.handleJsChange = this.handleJsChange.bind(this);
        this.handleCssChange = this.handleCssChange.bind(this);
        this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
    }

    render() {
        const opts = {
            spellCheck: false,
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
        };

        let type = onlyFirstLetterCapitalized(this.props.type);
        if (type === 'Storythemes') {
            type = 'Story Themes';
        } else if (type === 'Passagethemes') {
            type = 'Passage Themes';
        }

        return (
            <div className="PackageCreateModal">                
                <h2 className="PackageCreateModal-title subheader">
                    New Package
                </h2>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label body"
                        htmlFor="PackageCreateModal-name">
                        Name:
                    </label>

                    <input
                        id="PackageCreateModal-name"
                        className="PackageCreateModal-input body"
                        value={this.props.name}
                        onChange={this.handleNameChange}
                        { ...opts }/>
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label body"
                        htmlFor="PackageEditModal-type">
                        Package Type:
                    </label>

                    <select
                        id="PackageEditModal-type"
                        className="PackageEditModal-input body"
                        value={type}
                        onChange={this.handleTypeChange}
                        { ...opts }>
                        <option>Macros</option>
                        <option>Scripts</option>
                        <option>Styles</option>
                        <option>Story Themes</option>
                        <option>Passage Themes</option>
                    </select>
                </div>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label body"
                        htmlFor="PackageCreateModal-version">
                        Version:
                    </label>

                    <input
                        id="PackageCreateModal-version"
                        className="PackageCreateModal-input body"
                        value={this.props.version}
                        onChange={this.handleVersionChange}
                        { ...opts }/>
                </div>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label PackageCreateModal-textareaLabel body"
                        htmlFor="PackageCreateModal-description">
                        Description:
                    </label>

                    <textarea
                        id="PackageCreateModal-description"
                        className="PackageCreateModal-input PackageCreateModal-textarea body"
                        value={this.props.description}
                        onChange={this.handleDescriptionChange}
                        { ...opts } />
                </div>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label body"
                        htmlFor="PackageCreateModal-homepage">
                        Homepage:
                    </label>

                    <input
                        id="PackageCreateModal-homepage"
                        className="PackageCreateModal-input body"
                        value={this.props.homepage}
                        onChange={this.handleHomepageChange}
                        { ...opts } />
                </div>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label PackageCreateModal-textareaLabel body"
                        htmlFor="PackageCreateModal-js">
                        Javascript:
                    </label>

                    <textarea
                        id="PackageCreateModal-js"
                        className="PackageCreateModal-input PackageCreateModal-textarea body"
                        value={this.props.js}
                        onChange={this.handleJsChange}
                        { ...opts } />
                </div>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label PackageCreateModal-textareaLabel body"
                        htmlFor="PackageCreateModal-css">
                        CSS:
                    </label>

                    <textarea
                        id="PackageCreateModal-css"
                        className="PackageCreateModal-input PackageCreateModal-textarea body"
                        value={this.props.css}
                        onChange={this.handleCssChange}
                        { ...opts } />
                </div>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label body"
                        htmlFor="PackageCreateModal-keywords">
                        Keywords:
                    </label>

                    <input
                        id="PackageCreateModal-keywords"
                        className="PackageCreateModal-input body"
                        value={this.props.keywords}
                        onChange={this.handleKeywordsChange}
                        { ...opts } />
                </div>

                <div className="PackageCreateModal-infoPair">
                    <label
                        className="PackageCreateModal-label PackageCreateModal-textareaLabel body"
                        htmlFor="PackageCreateModal-tag">
                        Tag:
                    </label>

                    <textarea
                        id="PackageCreateModal-tag"
                        className="PackageCreateModal-input PackageCreateModal-textarea body"
                        value={this.props.tag}
                        onChange={this.handleTagChange}
                        { ...opts } />
                </div>

                <button
                    className="wideButton"
                    onClick={this.createPackage}>
                    Confirm
                </button>

                <button
                    className="wideButton"
                    onClick={modalClose}>
                    Cancel
                </button>

                <p className="PackageCreateModal-message">
                    {this.props.message}
                </p>

                <style jsx>{
                    `.PackageCreateModal {
                        text-align: left;
                    }

                    .PackageCreateModal-title {
                        margin-top: 0;
                        text-align: center;
                    }

                    #PackageCreateModal-dateCreated,
                    #PackageCreateModal-dateModified {
                        display: inline-block;
                        border: 2px solid transparent;
                    }

                    #PackageCreateModal-js,
                    #PackageCreateModal-css,
                    #PackageCreateModal-tag {
                        height: 26rem;
                    }

                    .PackageCreateModal-label {
                        display: inline-block;
                        margin-right: 0.5rem;
                        font-weight: bold;
                    }

                    .PackageCreateModal-input {
                        width: 95%;
                        margin-bottom: 1.25rem;
                        padding: 0.25rem;
                    }

                    .PackageCreateModal-textarea {
                        height: 4rem;
                        resize: none;
                    }

                    .PackageCreateModal-message {
                        height: 1rem;
                        text-align: center;
                    }`
                }</style>
            </div>
        );
    }

    handleNameChange(e) {
        this.props.dispatch(setPackageCreatingName(e.target.value));
    }

    handleTypeChange(e) {
        const value = e.target.value.replace(/ /g, '').toLowerCase();
        this.props.dispatch(setPackageCreatingType(value));
    }

    handleVersionChange(e) {
        this.props.dispatch(setPackageCreatingVersion(e.target.value));
    }

    handleDescriptionChange(e) {
        this.props.dispatch(setPackageCreatingDescription(e.target.value));
    }

    handleHomepageChange(e) {
        this.props.dispatch(setPackageCreatingHomepage(e.target.value));
    }

    handleJsChange(e) {
        this.props.dispatch(setPackageCreatingJs(e.target.value));
    }

    handleCssChange(e) {
        this.props.dispatch(setPackageCreatingCss(e.target.value));
    }

    handleKeywordsChange(e) {
        this.props.dispatch(setPackageCreatingKeywords(e.target.value));
    }

    handleTagChange(e) {
        this.props.dispatch(setPackageCreatingTag(e.target.value));
    }

    async createPackage() {
        const pkg = {
            name: this.props.name,
            type: this.props.type,
            version: this.props.version,
            description: this.props.description,
            homepage: this.props.homepage,
            js: this.props.js,
            css: this.props.css,
            keywords: this.props.keywords,
            tag: this.props.tag,
        };

        const successful = await packageCreate(
            this.props.store,
            pkg,
            this.props.csrfToken);

        if (successful) {
            setTimeout(() => modalClose(this.props.store.dispatch), 6000);
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.packageCreating,
        message: state.packageCreatingMessage,
        csrfToken: state.csrfToken,
    };
}

export default connect(mapStateToProps)(PackageCreateModal);