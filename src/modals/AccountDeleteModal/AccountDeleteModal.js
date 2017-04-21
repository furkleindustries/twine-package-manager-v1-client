// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import store from '../../store';
import { setAccountDeletingEnteredId, } from './AccountDeleteModalActions';


// modules
import deleteAccount from '../../modules/deleteAccount';
import modalClose from '../../modules/modalClose';

// css
import './AccountDeleteModal.css';

export class AccountDeleteModal extends Component {
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
					Type the id of your account, <strong>{this.props.id}</strong>,
					into the input below. 
				</p>

				<input
					className="AccountDeleteModal-input body"
					value={this.props.enteredId}
					onChange={e => {
						store.dispatch(setAccountDeletingEnteredId(e.target.value));
					}} />

				<button
					className={"AccountDeleteModal-button wideButton" +
						(this.props.id === this.props.enteredId ? "" : " disabled")}
					onClick={deleteAccount}>
					Delete Account
				</button>

				<button
					className="AccountDeleteModal-button wideButton"
					onClick={modalClose}>
					Cancel
				</button> 

				<p className="AccountDeleteModal-error">
					{this.props.error}
				</p>
			</div>
		);
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		id: (String)(state.profile.id || ''),
		error: state.accountDeletingError,
		enteredId: state.accountDeletingEnteredId,
	};
}

export default connect(mapStateToProps)(AccountDeleteModal);