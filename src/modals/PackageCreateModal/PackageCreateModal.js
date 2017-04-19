import 'whatwg-fetch';

// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';

import {
	setPackageCreating,
	setPackageCreatingName,
	setPackageCreatingType,
	setPackageCreatingVersion,
	setPackageCreatingDescription,
	setPackageCreatingHomepage,
	setPackageCreatingJs,
	setPackageCreatingCss,
	setPackageCreatingKeywords,
	setPackageCreatingTag,
	setPackageCreatingError,
} from './PackageCreateModalActions';

// modules
import renderLogin from '../../modules/renderLogin';
import modalClose from '../../modules/modalClose';
import onlyFirstLetterCapitalized from '../../modules/onlyFirstLetterCapitalized';

// css
import './PackageCreateModal.css';

class PackageCreateModal extends Component {
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
						onChange={e => this.setPackageCreatingName(e.target.value)}
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
						onChange={e => this.setPackageCreatingType(e.target.value.replace(/ /g, '').toLowerCase())}
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
						onChange={e => this.setPackageCreatingVersion(e.target.value)}
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
						onChange={e => this.setPackageCreatingDescription(e.target.value)}
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
						onChange={e => this.setPackageCreatingHomepage(e.target.value)}
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
						onChange={e => this.setPackageCreatingJs(e.target.value)}
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
						onChange={e => this.setPackageCreatingCss(e.target.value)}
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
						onChange={e => this.setPackageCreatingKeywords(e.target.value)}
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
						onChange={e => this.setPackageCreatingTag(e.target.value)}
						{ ...opts } />
				</div>

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

				<p className="PackageCreateModal-error">
					{this.props.error}
				</p>
			</div>
		);
	}

	setPackageCreatingName(value) {
		store.dispatch(setPackageCreatingName(value));
	}

	setPackageCreatingType(value) {
		store.dispatch(setPackageCreatingType(value));
	}

	setPackageCreatingVersion(value) {
		store.dispatch(setPackageCreatingVersion(value));
	}

	setPackageCreatingDescription(value) {
		store.dispatch(setPackageCreatingDescription(value));
	}

	setPackageCreatingHomepage(value) {
		store.dispatch(setPackageCreatingHomepage(value));
	}

	setPackageCreatingJs(value) {
		store.dispatch(setPackageCreatingJs(value));
	}

	setPackageCreatingCss(value) {
		store.dispatch(setPackageCreatingCss(value));
	}
	
	setPackageCreatingKeywords(value) {
		store.dispatch(setPackageCreatingKeywords(value));
	}
	
	setPackageCreatingTag(value) {
		store.dispatch(setPackageCreatingTag(value));
	}

	confirm() {
		const formData = new FormData();
		formData.append('id', this.props.id);
		formData.append('name', this.props.name);
		formData.append('type', this.props.type);
		formData.append('version', this.props.version);
		formData.append('description', this.props.description);
		formData.append('homepage', this.props.homepage);
		formData.append('js', this.props.js);
		formData.append('css', this.props.css);
		formData.append('keywords', this.props.keywords);
		formData.append('tag', this.props.tag);
		formData.append('csrfToken', this.props.csrfToken);

		fetch('https://furkleindustries.com/twinepm/package/createPackage.php', {
			method: 'POST',
			credentials: 'include',
			body: formData,
		}).catch(xhr => {
			try {
				const responseObj = JSON.parse(xhr.responseText);
				store.dispatch(setPackageCreatingError(
					responseObj.error ||
					'Unknown error. Please contact webmaster.'
				));

				setTimeout(() => {
					const error = this.props.error;
					if (error === responseObj.error ||
						error === 'Unknown error. Please contact webmaster.')
					{
						store.dispatch(setPackageCreatingError(''));
					}
				}, 6000);
			} catch (err) {
				const error = 'Unknown error deserializing update response ' +
					'object. Please contact webmaster.';
				store.dispatch(setPackageCreatingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackageCreatingError(''));
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
			store.dispatch(setPackageCreatingError(error));

			setTimeout(() => {
				if (this.props.error === error) {
					store.dispatch(setPackageCreatingError(''));
				}
			}, 6000);

			return Promise.reject();
		}).then(responseObj => {
			if (responseObj.error) {
				store.dispatch(setPackageCreatingError(responseObj.error));

				setTimeout(() => {
					if (this.props.error === responseObj.error) {
						store.dispatch(setPackageCreatingError(''));
					}
				}, 6000);

				return;
			} else if (responseObj.status !== 200) {
				const error = 'The response object did not reflect a ' +
					'200 status, but an error was not returned. Please ' +
					'contact webmaster.';
				store.dispatch(setPackageCreatingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackageCreatingError(error));
					}
				}, 6000);

				return;
			}

			const notError = 'Package created successfully.';
			store.dispatch(setPackageCreatingError(notError));

			setTimeout(() => {
				if (this.props.error === notError) {
					store.dispatch(setPackageCreatingError(''));

					modalClose();

					// rerender the login to reflect the new package
					renderLogin();
				}
			}, 6000);
		});
	}

	cancel() {
		store.dispatch(setPackageCreating({}));
		modalClose();
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packageCreating,
		error: state.packageCreatingError,
		csrfToken: state.csrfToken,
	};
}

export default connect(mapStateToProps)(PackageCreateModal);