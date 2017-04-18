import 'whatwg-fetch';

// react
import React, { Component } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';
import {
	setProfilePackages,
} from '../../panes/profile/profileActions';

// modules
import deepCopy from '../../modules/deepCopy';

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

		this.props.closeModal();
	}

	reject() {
		this.props.closeModal();
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