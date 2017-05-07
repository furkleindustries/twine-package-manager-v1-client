import 'whatwg-fetch';

// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';

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

// components
import HideableMenuItem from '../../components/HideableMenuItem/HideableMenuItem';

// modules
import unixTimeToSettingsTime from '../../modules/unixTimeToSettingsTime';
import modalClose from '../../modules/modals/close';
import onlyFirstLetterCapitalized from '../../modules/onlyFirstLetterCapitalized';
import * as post from '../../modules/database/post';

// css
import './PackageEditModal.css';

class PackageEditModal extends Component {
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
					onChange={e => store.dispatch(setPackageEditingNewOwner(e.target.value)) }/>

				<button
					className="PackageEditModal-button wideButton"
					onClick={() => post.ownershipTransferOfPackage(this.props.newOwner)}>
					Transfer
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
						onChange={e => store.dispatch(setPackageEditingName(e.target.value))}
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
						onChange={e => {
							const value = e.target.value.replace(/ /g, '').toLowerCase();

							store.dispatch(setPackageEditingType(value));
						}}
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
						onChange={e => store.dispatch(setPackageEditingVersion(e.target.value))}
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
						onChange={e => store.dispatch(setPackageEditingDescription(e.target.value))}
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
						onChange={e => store.dispatch(setPackageEditingHomepage(e.target.value))}
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
						onChange={e => store.dispatch(setPackageEditingJs(e.target.value))}
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
						onChange={e => store.dispatch(setPackageEditingCss(e.target.value))}
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
						onChange={e => store.dispatch(setPackageEditingKeywords(e.target.value))}
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
						onChange={e => store.dispatch(setPackageEditingTag(e.target.value))}
						{ ...opts } />
				</div>

				<HideableMenuItem
					title={"Transfer Ownership of " + this.props.name + ":"}
					content={transferOwnershipContent} />

				<button
					className="wideButton"
					onClick={() => {
						post.packageUpdate({
							id: this.props.id,
							name: this.props.name,
							version: this.props.version,
							description: this.props.description,
							homepage: this.props.homepage,
							js: this.props.js,
							css: this.props.css,
							keywords: this.props.keywords,
							tag: this.props.tag,
						});
					}}>
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
			</div>
		);
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packageEditing,
		message: state.packageEditingMessage,
		csrfToken: state.csrfToken,
	};
}

export default connect(mapStateToProps)(PackageEditModal);