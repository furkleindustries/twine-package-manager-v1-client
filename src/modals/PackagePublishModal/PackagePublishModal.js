import 'whatwg-fetch';

// react
import React, { Component } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';

// modules
import modalClose from '../../modules/modals/close';
import packagePublish from '../../modules/packagePublish';

// css
import './PackagePublishModal.css';

export class PackagePublishModal extends Component {
	constructor() {
		super();

		this.publishPackage = this.publishPackage.bind(this);
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
					onClick={this.publishPackage}>
					Confirm
				</button>

				<button
					className="PackagePublishModal-reject wideButton"
					onClick={modalClose}>
					Reject
				</button>

				<p className="PackagePublishModal-message">
					{this.props.message}
				</p>
			</div>
		);
	}

	async publishPackage() {
		const successful = await packagePublish(
			this.props.id,
			!this.props.published,
			this.props.csrfToken);

		if (successful) {
			setTimeout(modalClose, 6000);
		}
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		...state.packagePublishing,
		csrfToken: state.csrfToken,
		message: state.packagePublishingMessage,
	};
}

export default connect(mapStateToProps)(PackagePublishModal);