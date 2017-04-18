import 'whatwg-fetch';

// react
import React, { Component } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';
import {
	setProfilePackages,
} from '../../panes/profile/profileActions';
import {
	setPackagePublishingError,
} from '../../components/PackageOwned/PackageOwnedActions';

// modules
import deepCopy from '../../modules/deepCopy';

// css
import './PackagePublishModal.css';

class PackagePublishModal extends Component {
	constructor() {
		super();

		this.confirm = this.confirm.bind(this);
		this.reject = this.reject.bind(this);
	}

	render() {
		return (
			<div className="PackagePublishModal">
				<div>
					{
						this.props.published ?
							<div className="PackagePublishedModal-introTextUnpublishing">
								This will unpublish your package. It will no longer be
								visible to users, and it cannot be included in Twine.
								Are you sure?
							</div>
							:
							<div className="PackagePublishedModal-introTextPublishing">
								This will publish your package. It will be visible to
								users of every service which queries the package database,
								and will be usable in Twine. Please test your code and be
								certain it works before publishing your package.
							</div>
					} 
				</div>

				<button
					className="PackagePublishModal-confirm wideButton"
					onClick={this.confirm}>
					Confirm
				</button>

				<button
					className="PackagePublishModal-reject wideButton"
					onClick={this.reject}>
					Reject
				</button>

				<p className="PackagePublishModal-error">
					{this.props.error}
				</p>
			</div>
		);
	}

	confirm() {
		const packageId = this.props.id;
		if (!packageId) {
			console.log('Could not find package ID.');
			return;
		}

		const packages = deepCopy(store.getState().profile.packages);
		if (!packages) {
			console.log('Could not find packages in store.');
			return;
		}

		let found = false;
		for (let ii = 0; ii < packages.length; ii++) {
			const pkg = packages[ii];
			if (pkg.id === packageId) {
				pkg.published = !pkg.published;
				found = true;
				break;
			}
		}

		if (!found) {
			console.log('Could not find package with id ' + packageId +
				'in the store\'s packages.');
			return;
		}

		fetch('https://furkleindustries.com/twinepm/package/', {
			method: 'POST',
			credentials: 'include',

			body: new FormData({
				id: this.props.id,
				csrfToken: this.props.csrfToken,
				published: !this.props.published,
			}),
		}).catch(xhr => {
			let error = 'Unknown error publishing package.';
			try {
				const responseObj = JSON.parse(xhr.responseText);
				if (responseObj.error) {
					error = responseObj.error;
				}
			} catch (e) {
				error = 'Unknown error deserializing publishing response ' +
					'object.';
			}

			store.dispatch(setPackagePublishingError(error));

			setTimeout(() => {
				if (this.props.error === error) {
					store.dispatch(setPackagePublishingError(''));
				}
			}, 6000);

			return Promise.reject();
		}).then(response => {
			return response.json();
		}).catch(e => {
			const error = 'Unknown error deserializing package ' +
				'publishing object. Please contact webmaster.';
			store.dispatch(setPackagePublishingError(error));

			setTimeout(() => {
				if (this.props.error === error) {
					store.dispatch(setPackagePublishingError(''));
				}
			}, 6000);

			return Promise.reject();
		}).then(responseObj => {
			if (responseObj.error) {
				let error = responseObj.error;
				if (!responseObj.error) {
					error = 'The publishing response object\'s error ' +
						'field was set, but there was no content in the ' +
						'field.';
				}

				store.dispatch(setPackagePublishingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackagePublishingError(''));
					}
				}, 6000);

				return Promise.reject();
			} else if (responseObj.status !== 200) {
				const error = 'Unknown error: publishing response ' +
					'object status was not 200, but there was no error. Please ' +
					'contact webmaster.';
				store.dispatch(setPackagePublishingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackagePublishingError(''));
					}
				}, 6000);

				return Promise.reject();
			}

			store.dispatch(setProfilePackages(packages));

			const notError = 'Package successfully updated.';
			store.dispatch(setPackagePublishingError(notError));

			setTimeout(() => {
				if (this.props.error === notError) {
					store.dispatch(setPackagePublishingError(''));
					this.props.closeModal();
				}
			}, 6000);
		});
	}

	reject() {
		this.props.closeModal();
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packagePublishing,
		csrfToken: state.csrfToken,
		error: state.packagePublishingError,
	};
}

export default connect(mapStateToProps)(PackagePublishModal);