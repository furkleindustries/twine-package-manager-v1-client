/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';
import {
    setPackageEditingName,
    setPackageEditingType,
    setPackageEditingVersion,
    setPackageEditingDescription,
    setPackageEditingHomepage,
    setPackageEditingJs,
    setPackageEditingCss,
    setPackageEditingKeywords,
    setPackageEditingTag,
    setPackageEditingNewOwner,
} from '../../components/PackageOwned/PackageOwnedActions';

/* components */
import HideableMenuItem from '../../components/HideableMenuItem/HideableMenuItem';

/* modules */
import unixTimeToSettingsTime from '../../modules/unixTimeToSettingsTime';
import modalClose from '../../modules/modals/close';
import onlyFirstLetterCapitalized from '../../modules/onlyFirstLetterCapitalized';
import packageTransferOwnership from '../../modules/packageTransferOwnership';
import packageUpdate from '../../modules/packageUpdate';

/* css */
/*import css from './PackageEditModal.css';*/

export class PackageEditModal extends Component {
    constructor() {
        super();

        this.handleNewOwnerChange = this.handleNewOwnerChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleVersionChange = this.handleVersionChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleHomepageChange = this.handleHomepageChange.bind(this);
        this.handleJsChange = this.handleJsChange.bind(this);
        this.handleCssChange = this.handleCssChange.bind(this);
        this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);

        this.transferOwnership = this.transferOwnership.bind(this);
        this.updatePackage = this.updatePackage.bind(this);
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

        const transferOwnershipContent = (
            <div className="PackageEditModal-transferOwnershipContainer">
                <label
                    className="PackageEditModal-label"
                    htmlFor="PackageEditModal-transferOwnership">
                    Transfer To User
                </label>

                <input
                    id="PackageEditModal-transferOwnership"
                    className="PackageEditModal-input"
                    value={this.props.packageEditingNewOwner}
                    onChange={this.handleNewOwnerChange} />

                <button
                    className="PackageEditModal-button wideButton"
                    onClick={this.transferOwnership}>
                    Transfer Package To New Owner
                </button>
            </div>
        );

        return (
            <div className="PackageEditModal">              
                <h2 className="PackageEditModal-title subheader">
                    Edit Package
                </h2>

                <div className="PackageEditModal-infoPair">
                    <label className="PackageEditModal-label body">
                        Package ID:
                    </label>

                    <div id="PackageEditModal-id"
                        className="PackageEditModal-input body">
                        {this.props.id}
                    </div>
                </div>

                <div className="PackageEditModal-infoPair">
                    <label className="PackageEditModal-label body">
                        Date Created:
                    </label>

                    <div id="PackageEditModal-id"
                        className="PackageEditModal-input body">
                        {unixTimeToSettingsTime(this.props.dateCreated * 1000)}
                    </div>
                </div>

                <div className="PackageEditModal-infoPair">
                    <label className="PackageEditModal-label body">
                        Date Last Modified:
                    </label>

                    <div id="PackageEditModal-id"
                        className="PackageEditModal-input body">
                        {unixTimeToSettingsTime(this.props.dateModified * 1000)}
                    </div>
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label body"
                        htmlFor="PackageEditModal-name">
                        Name:
                    </label>

                    <input
                        id="PackageEditModal-name"
                        className="PackageEditModal-input body"
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

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label body"
                        htmlFor="PackageEditModal-version">
                        Version:
                    </label>

                    <input
                        id="PackageEditModal-version"
                        className="PackageEditModal-input body"
                        value={this.props.version}
                        onChange={this.handleVersionChange}
                        { ...opts }/>
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label PackageEditModal-textareaLabel body"
                        htmlFor="PackageEditModal-description">
                        Description:
                    </label>

                    <textarea
                        id="PackageEditModal-description"
                        className="PackageEditModal-input PackageEditModal-textarea body"
                        value={this.props.description}
                        onChange={this.handleDescriptionChange}
                        { ...opts } />
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label body"
                        htmlFor="PackageEditModal-homepage">
                        Homepage:
                    </label>

                    <input
                        id="PackageEditModal-homepage"
                        className="PackageEditModal-input body"
                        value={this.props.homepage}
                        onChange={this.handleHomepageChange}
                        { ...opts } />
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label PackageEditModal-textareaLabel body"
                        htmlFor="PackageEditModal-js">
                        Javascript:
                    </label>

                    <textarea
                        id="PackageEditModal-js"
                        className="PackageEditModal-input PackageEditModal-textarea body"
                        value={this.props.js}
                        onChange={this.handleJsChange}
                        { ...opts } />
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label PackageEditModal-textareaLabel body"
                        htmlFor="PackageEditModal-css">
                        CSS:
                    </label>

                    <textarea
                        id="PackageEditModal-css"
                        className="PackageEditModal-input PackageEditModal-textarea body"
                        value={this.props.css}
                        onChange={this.handleCssChange}
                        { ...opts } />
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label body"
                        htmlFor="PackageEditModal-keywords">
                        Keywords:
                    </label>

                    <input
                        id="PackageEditModal-keywords"
                        className="PackageEditModal-input body"
                        value={this.props.keywords}
                        onChange={this.handleKeywordsChange}
                        { ...opts } />
                </div>

                <div className="PackageEditModal-infoPair">
                    <label
                        className="PackageEditModal-label PackageEditModal-textareaLabel body"
                        htmlFor="PackageEditModal-tag">
                        Tag:
                    </label>

                    <textarea
                        id="PackageEditModal-tag"
                        className="PackageEditModal-input PackageEditModal-textarea body"
                        value={this.props.tag}
                        onChange={this.handleTagChange}
                        { ...opts } />
                </div>

                <HideableMenuItem
                    title={"Transfer Ownership of " + this.props.name + ":"}
                    content={transferOwnershipContent} />

                <button
                    className="wideButton"
                    onClick={this.updatePackage}>
                    Confirm
                </button>
                
                <button
                    className="wideButton"
                    onClick={modalClose}>
                    Cancel
                </button>

                <p className="PackageEditModal-message">
                    {this.props.message}
                </p>

                <style jsx>{
                    `.PackageEditModal {
                        text-align: left;
                    }

                    .PackageEditModal-title {
                        margin-top: 0;
                        text-align: center;
                    }

                    #PackageEditModal-id,
                    #PackageEditModal-dateCreated,
                    #PackageEditModal-dateModified {
                        display: inline-block;
                        border: 2px solid transparent;
                    }

                    #PackageEditModal-js,
                    #PackageEditModal-css,
                    #PackageEditModal-tag {
                        height: 26rem;
                    }

                    .PackageEditModal-label {
                        display: inline-block;
                        margin-right: 0.5rem;
                        font-weight: bold;
                    }

                    .PackageEditModal-input {
                        width: 95%;
                        margin-bottom: 1.25rem;
                        padding: 0.25rem;
                    }

                    .PackageEditModal-textarea {
                        height: 4rem;
                        resize: none;
                    }

                    .PackageEditModal-message {
                        height: 1rem;
                        text-align: center;
                    }`
                }</style>
            </div>
        );
    }

    handleNewOwnerChange(e) {
        this.props.dispatch(setPackageEditingNewOwner(e.target.value));
    }

    transferOwnership() {
        packageTransferOwnership(
            this.props.id,
            this.props.newOwner,
            this.props.csrfToken);
    }

    handleNameChange(e) {
        this.props.dispatch(setPackageEditingName(e.target.value));
    }

    handleTypeChange(e) {
        const value = e.target.value.replace(/ /g, '').toLowerCase();

        this.props.dispatch(setPackageEditingType(value));
    }

    handleVersionChange(e) {
        this.props.dispatch(setPackageEditingVersion(e.target.value));
    }

    handleDescriptionChange(e) {
        this.props.dispatch(setPackageEditingDescription(e.target.value));
    }

    handleHomepageChange(e) {
        this.props.dispatch(setPackageEditingHomepage(e.target.value));
    }

    handleJsChange(e) {
        this.props.dispatch(setPackageEditingJs(e.target.value));
    }

    handleCssChange(e) {
        this.props.dispatch(setPackageEditingCss(e.target.value));
    }

    handleKeywordsChange(e) {
        this.props.dispatch(setPackageEditingKeywords(e.target.value));
    }

    handleTagChange(e) {
        this.props.dispatch(setPackageEditingTag(e.target.value));
    }

    async updatePackage() {
        const pkg = {
            id: this.props.id,
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

        const successful = await packageUpdate(
            this.props.store,
            pkg,
            this.props.csrfToken);
        if (successful) {
            setTimeout(() => modalClose(this.props.dispatch), 6000);
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.packageEditing,
        message: state.packageEditingMessage,
        csrfToken: state.csrfToken,
    };
}

export default connect(mapStateToProps)(PackageEditModal);