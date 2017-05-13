// react
import React, { Component } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';
import { setAccountDeletingEnteredId, } from './AccountDeleteModalActions';


// modules
import accountDelete from '../../modules/accountDelete';
import modalClose from '../../modules/modals/close';

// css
import './AccountDeleteModal.css';

export class AccountDeleteModal extends Component {
	constructor() {
		super();

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
	}

	render() {
		return (
			<div className="AccountDeleteModal">
				<h1 className="header">Delete Account</h1>
				
				<p className="body">
					This will permanently, irreversibly delete your account
					and all your packages.
				</p>

				<p className="body">
					Please be absolutely certain this is what you want.
					Other people may be depending on your code remaining available.
				</p>

				<p className="body">
					Type the id of your account,
					<strong>{` ${this.props.id}`}</strong>{", "}
					into the input below.
				</p>

				<input
					className="AccountDeleteModal-input body"
					value={this.props.enteredId}
					onChange={this.handleKeyDown} />

				<button
					className={"AccountDeleteModal-button wideButton" +
						(this.props.id === this.props.enteredId ? "" : " disabled")}
					onClick={this.deleteAccount}>
					Delete Account
				</button>

				<button
					className="AccountDeleteModal-button wideButton"
					onClick={modalClose}>
					Cancel
				</button> 

				<p className="AccountDeleteModal-message">
					{this.props.message}
				</p>
			</div>
		);
	}

	handleKeyDown(e) {
		store.dispatch(setAccountDeletingEnteredId(e.target.value));
	}

	async deleteAccount() {
		const success = await accountDelete(
			(Number)(this.props.id), 
			this.props.csrfToken);
		if (success) {
			setTimeout(modalClose, 2000);
		}
	}

}

function mapStateToProps() {
	const state = store.getState();

	return {
		id: (String)(state.profile.id || ''),
		enteredId: state.accountDeletingEnteredId,
		csrfToken: state.csrfToken,
		message: state.accountDeletingMessage,
	};
}

export default connect(mapStateToProps)(AccountDeleteModal);