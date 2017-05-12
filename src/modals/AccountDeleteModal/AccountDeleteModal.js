// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import store from '../../store';
import { setAccountDeletingEnteredId, } from './AccountDeleteModalActions';


// modules
import deleteAccount from '../../modules/deleteAccount';
import modalClose from '../../modules/modals/close';

// css
import './AccountDeleteModal.css';

export class AccountDeleteModal extends Component {
	constructor() {
		super();

		this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
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
					onChange={e => {
						const value = e.target.value;
						const action = setAccountDeletingEnteredId(value);
						store.dispatch(action);
					}} />

				<button
					className={"AccountDeleteModal-button wideButton" +
						(this.props.id === this.props.enteredId ? "" : " disabled")}
					onClick={this.handleDeleteAccount}>
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

	handleDeleteAccount() {
		const success = await deleteAccount(
			(Number)(this.props.id), 
			this.props.csrfToken);
		if (success) {
			setTimeout(() => {
				modalClose();
			}, 2000);
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