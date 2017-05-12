import 'whatwg-fetch';

// react
import React, { Component } from 'react';

// redux
import store from '../../store';
import { connect, } from 'react-redux';

// modules
import _delete from '../../modules/database/delete';
import modalClose from '../../modules/modals/close';

// css
import './PackageDeleteModal.css';

class PackageDeleteModal extends Component {
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
					onClick={() => _delete._package(this.props.id)}>
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