import 'whatwg-fetch';

// react
import React, { Component } from 'react';

// redux
import store from '../../store';
import { connect, } from 'react-redux';

// modules
import packageDelete from '../../modules/packageDelete';
import modalClose from '../../modules/modals/close';

// css
import './PackageDeleteModal.css';

export class PackageDeleteModal extends Component {
	constructor() {
		super();

		this.deletePackage = this.deletePackage.bind(this);
	}

	render() {
		return (
			<div className="PackageDeleteModal">
				<h1 className="PackageDeleteModal-title header">
					Delete Package {this.props.name}
				</h1>

				<p>
					This will delete your package and there will be no way
					to retrieve it. 
				</p>

				<button
					className="PackageDeleteModal-confirm wideButton"
					onClick={this.deletePackage}>
					Confirm
				</button>

				<button
					className="PackageDeleteModal-reject wideButton"
					onClick={modalClose}>
					Reject
				</button>

				<p className="PackageDeleteModal-message">
					{this.props.message}
				</p>
			</div>
		);
	}

	async deletePackage() {
		const successful = await packageDelete(
			this.props.id,
			this.props.csrfToken);
		if (successful) {
			setTimeout(modalClose, 6000);
		}
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packageRemoving,
		csrfToken: state.csrfToken,
		message: state.packageRemovingMessage,
	};
}

export default connect(mapStateToProps)(PackageDeleteModal);