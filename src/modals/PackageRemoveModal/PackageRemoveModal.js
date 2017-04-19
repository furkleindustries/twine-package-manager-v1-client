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
	setPackageRemovingError,
} from '../../components/PackageOwned/PackageOwnedActions';

// modules
import deepCopy from '../../modules/deepCopy';
import modalClose from '../../modules/modalClose';

// css
import './PackageRemoveModal.css';

class PackageRemoveModal extends Component {
	constructor() {
		super();

		this.confirm = this.confirm.bind(this);
		this.reject = this.reject.bind(this);
	}

	render() {
		return (
			<div className="PackageRemoveModal">
				<h1 className="PackageRemoveModal-title header">
					Delete Package {this.props.name}
				</h1>

				<p>
					This will delete your package and there will be no way
					to retrieve it. 
				</p>

				<button
					className="PackageRemoveModal-confirm wideButton"
					onClick={this.confirm}>
					Confirm
				</button>

				<button
					className="PackageRemoveModal-reject wideButton"
					onClick={this.reject}>
					Reject
				</button>

				<p className="PackageRemoveModal-error">
					{this.props.error}
				</p>
			</div>
		);
	}

	confirm() {
		const params = {
			id: this.props.id,
			csrfToken: this.props.csrfToken,
		};

		fetch('https://furkleindustries.com/twinepm/package/', {
			method: 'DELETE',
			credentials: 'include',
			body: JSON.stringify(params),
		}).catch(response => {
			response.json().catch(() => {
				const error = 'There was a problem with the request, and ' +
					'the response could not be ' +
					'deserialized.';
				store.dispatch(setPackageRemovingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackageRemovingError(''));
					}
				}, 6000);

				return Promise.reject();
			}).then(responseObj => {
				const error = responseObj.error ||
					'The delete request failed, but the response object ' +
					'did not contain an error message.';
				store.dispatch(setPackageRemovingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackageRemovingError(''));
					}
				}, 6000);

				return Promise.reject();
			});
		}).then(response => {
			return response.json();
		}).catch(e => {
			const error = 'The request succeeded, but the response could ' +
				'not be deserialized.';
			store.dispatch(setPackageRemovingError(error));

			setTimeout(() => {
				if (this.props.error === 'error') {
					store.dispatch(setPackageRemovingError(''));
				}
			}, 6000);

			return Promise.reject();
		}).then(responseObj => {
			if (!responseObj.error && responseObj.status === 200) {
				const packageId = this.props.id;
				if (!packageId) {
					console.log('Could not find package ID.');
					return;
				}

				let packages = deepCopy(store.getState().profile.packages);
				if (!packages) {
					console.log('Could not find packages in store.');
					return;
				}

				const oldLength = packages.length;

				packages = packages.filter(pkg => pkg.id !== packageId);

				const newLength = packages.length;

				if (newLength !== oldLength - 1) {
					console.log('Could not find package with id ' + packageId +
						'in the store\'s packages.');
					return;
				}

				store.dispatch(setProfilePackages(packages));

				modalClose();
			} else {
				const error = responseObj.error ||
					'The request appeared to succeed, but the response had ' +
					'a status other than 200.';

				store.dispatch(setPackageRemovingError(error));

				setTimeout(() => {
					if (this.props.error === error) {
						store.dispatch(setPackageRemovingError(''));
					}
				}, 6000);

				return Promise.reject();
			}
		});
	}

	reject() {
		modalClose();
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packageRemoving,
		csrfToken: state.csrfToken,
		error: state.packageRemovingError,
	};
}

export default connect(mapStateToProps)(PackageRemoveModal);