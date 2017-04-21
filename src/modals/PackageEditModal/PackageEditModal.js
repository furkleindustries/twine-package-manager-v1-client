import 'whatwg-fetch';

// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';

import { setProfilePackages, } from '../../panes/profile/profileActions';

import {
	setPackageEditingDateModified,
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
	setPackageEditingError,
} from '../../components/PackageOwned/PackageOwnedActions';

// components
import HideableMenuItem from '../../components/HideableMenuItem/HideableMenuItem';

// modules
import deepCopy from '../../modules/deepCopy';
import unixTimeToSettingsTime from '../../modules/unixTimeToSettingsTime';
import modalClose from '../../modules/modalClose';
import onlyFirstLetterCapitalized from '../../modules/onlyFirstLetterCapitalized';
import transferOwnershipOfPackage from '../../modules/transferOwnershipOfPackage';

// css
import './PackageEditModal.css';

class PackageEditModal extends Component {
	constructor() {
		super();

		this.confirm = this.confirm.bind(this);
		this.cancel = this.cancel.bind(this);
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
					onChange={e => store.dispatch(setPackageEditingNewOwner(e.target.value)) }/>

				<button
					className="PackageEditModal-button wideButton"
					onClick={() => transferOwnershipOfPackage(this.props.newOwner)}>
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
					onClick={this.confirm}>
					Confirm
				</button>
				
				<button
					className="wideButton"
					onClick={this.cancel}>
					Cancel
				</button>

				<p className="PackageEditModal-error">
					{this.props.error}
				</p>
			</div>
		);
	}

	setPackageEditingName(value) {
		store.dispatch(setPackageEditingName(value));
	}

	setPackageEditingType(value) {
		store.dispatch(setPackageEditingType(value));
	}

	setPackageEditingVersion(value) {
		store.dispatch(setPackageEditingVersion(value));
	}

	setPackageEditingDescription(value) {
		store.dispatch(setPackageEditingDescription(value));
	}

	setPackageEditingHomepage(value) {
		store.dispatch(setPackageEditingHomepage(value));
	}

	setPackageEditingJs(value) {
		store.dispatch(setPackageEditingJs(value));
	}

	setPackageEditingCss(value) {
		store.dispatch(setPackageEditingCss(value));
	}
	
	setPackageEditingKeywords(value) {
		store.dispatch(setPackageEditingKeywords(value));
	}
	
	setPackageEditingTag(value) {
		store.dispatch(setPackageEditingTag(value));
	}

	confirm() {
		const formData = new FormData();
		formData.append('id', this.props.id);
		formData.append('name', this.props.name);
		formData.append('version', this.props.version);
		formData.append('description', this.props.description);
		formData.append('homepage', this.props.homepage);
		formData.append('js', this.props.js);
		formData.append('css', this.props.css);
		formData.append('keywords', this.props.keywords);
		formData.append('tag', this.props.tag);
		formData.append('csrfToken', this.props.csrfToken);

		fetch('https://furkleindustries.com/twinepm/package/', {
			method: 'POST',
			credentials: 'include',
			body: formData,
		}).catch(xhr => {
			try {
				const responseObj = JSON.parse(xhr.responseText);
				store.dispatch(setPackageEditingError(
					responseObj.error ||
					'Unknown error. Please contact webmaster.'
				));

				setTimeout(() => {
					const loginError = this.props.loginError;
					if (loginError === responseObj.error ||
						loginError === 'Unknown error. Please contact webmaster.')
					{
						store.dispatch(setPackageEditingError(''));
					}
				}, 6000);
			} catch (err) {
				const error = 'Unknown error deserializing update response ' +
					'object. Please contact webmaster.';
				store.dispatch(setPackageEditingError(error));

				setTimeout(() => {
					if (this.props.loginError === error) {
						store.dispatch(setPackageEditingError(''));
					}
				}, 6000);
			}

			// don't allow execution to continue
			return Promise.reject();
		}).then(response => {
			return response.json();
		}).catch(e => {
			const error = 'Error deserializing update response ' +
				'object. Please contact webmaster.';
			store.dispatch(setPackageEditingError(error));

			setTimeout(() => {
				if (this.props.loginError === error) {
					store.dispatch(setPackageEditingError(''));
				}
			}, 6000);

			return Promise.reject();
		}).then(responseObj => {
			if (responseObj.error) {
				store.dispatch(setPackageEditingError(responseObj.error));

				setTimeout(() => {
					if (this.props.error === responseObj.error) {
						store.dispatch(setPackageEditingError(''));
					}
				}, 6000);

				return;
			} else if (responseObj.status !== 200) {
				const error = 'The response object did not reflect a ' +
					'200 status, but an error was not returned. Please ' +
					'contact webmaster.';
				store.dispatch(setPackageEditingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackageEditingError(error));
					}
				}, 6000);

				return;
			}

			const dateModified = responseObj.dateModified;
			store.dispatch(setPackageEditingDateModified(dateModified));

			const newPkg = {
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

			let packages = store.getState().profile.packages;
			packages = deepCopy(packages).map(oldPkg => {
				if (oldPkg.id === this.props.id) {
					return newPkg;
				} else {
					return oldPkg;
				}
			});

			store.dispatch(setProfilePackages(packages));

			const notError = 'Package updated successfully.';
			store.dispatch(setPackageEditingError(notError));

			setTimeout(() => {
				if (this.props.error === notError) {
					modalClose();
					store.dispatch(setPackageEditingError(''));
				}
			}, 6000);
		});
	}

	cancel() {
		modalClose();
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packageEditing,
		csrfToken: state.csrfToken,
		error: state.packageEditingError,
	};
}

export default connect(mapStateToProps)(PackageEditModal);