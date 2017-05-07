import 'whatwg-fetch';

// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';

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

// modules
import * as post from '../../modules/database/post';
import * as modalClose from '../../modules/modals/close';
import onlyFirstLetterCapitalized from '../../modules/onlyFirstLetterCapitalized';

// css
import './PackageCreateModal.css';

class PackageCreateModal extends Component {
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
						onChange={e => store.dispatch(setPackageCreatingName(e.target.value))}
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
							const value = e.target.value
									.replace(/ /g, '')
									.toLowerCase();
							store.dispatch(setPackageCreatingType(value));
						}}
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
						onChange={e => store.dispatch(setPackageCreatingVersion(e.target.value))}
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
						onChange={e => store.dispatch(setPackageCreatingDescription(e.target.value))}
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
						onChange={e => store.dispatch(setPackageCreatingHomepage(e.target.value))}
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
						onChange={e => store.dispatch(setPackageCreatingJs(e.target.value))}
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
						onChange={e => store.dispatch(setPackageCreatingCss(e.target.value))}
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
						onChange={e => store.dispatch(setPackageCreatingKeywords(e.target.value))}
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
						onChange={e => store.dispatch(setPackageCreatingTag(e.target.value))}
						{ ...opts } />
				</div>

				<button
					className="wideButton"
					onClick={() => {
						post.createPackage({

						});
					}}>
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
			</div>
		);
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packageCreating,
		message: state.packageCreatingMessage,
		csrfToken: state.csrfToken,
	};
}

export default connect(mapStateToProps)(PackageCreateModal);