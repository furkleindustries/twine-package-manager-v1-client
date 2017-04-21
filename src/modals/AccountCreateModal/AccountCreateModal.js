import 'whatwg-fetch';

// react
import React, { Component } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../store';
import {
	setAccountCreatingName,
	setAccountCreatingPassword,
	setAccountCreatingEmail,
} from './AccountCreateModalActions';

// modules
import createAccount from '../../modules/createAccount';

// css
import './AccountCreateModal.css';

export class AccountCreateModalModal extends Component {
	constructor() {
		super();

		this.doCreateAccount = this.doCreateAccount.bind(this);
	}

	render() {
		return (
			<div className="AccountCreateModal">
				<h1 className="AccountCreateModal-title header">
					Create Account
				</h1>

				<div className="AccountCreateModal-fieldContainer">
					<div className="AccountCreateModal-infoPairContainer">
						<label
							className="AccountCreateModal-usernameLabel AccountCreateModal-label subheader"
							htmlFor="AccountCreateModal-username">
							Username
						</label>

						<input
							className="AccountCreateModal-usernameInput AccountCreateModal-input subheader"
							id="AccountCreateModal-username"
							value={this.props.username}
							onChange={e => store.dispatch(setAccountCreatingName(e.target.value))}
							ref={input => this.usernameInput = input} 
							onKeyDown={e => {
								if (e.keyCode === 13) {
									this.doCreateAccount();
								}
							}} />
					</div>

					<div className="AccountCreateModal-infoPairContainer">
						<label
							className="AccountCreateModal-passwordLabel AccountCreateModal-label subheader"
							htmlFor="AccountCreateModal-password">
							Password
						</label>

						<input
							type="password"
							className="AccountCreateModal-passwordInput AccountCreateModal-input subheader"
							id="AccountCreateModal-password"
							value={this.props.password}
							onChange={e => store.dispatch(setAccountCreatingPassword(e.target.value))}
							onKeyDown={e => {
								if (e.keyCode === 13) {
									this.doCreateAccount();
								}
							}} />
					</div>

					<div className="AccountCreateModal-infoPairContainer">
						<label
							className="AccountCreateModal-emailLabel AccountCreateModal-label subheader"
							htmlFor="AccountCreateModal-email">
							E-mail
						</label>

						<input
							className="AccountCreateModal-emailInput AccountCreateModal-input subheader"
							id="AccountCreateModal-email"
							value={this.props.email}
							onChange={e => store.dispatch(setAccountCreatingEmail(e.target.value))}
							onKeyDown={e => {
								if (e.keyCode === 13) {
									this.doCreateAccount();
								}
							}} />
					</div>
				</div>

				<button
					className="AccountCreateModal-button wideButton"
					onClick={this.doCreateAccount}>
					Create Account
				</button>

				<p className="AccountCreateModal-error">
					{this.props.error}
				</p>
			</div>
		);
	}

	componentDidMount() {
		this.usernameInput.focus();
	}

	doCreateAccount() {
		createAccount(this.props.name, this.props.password, this.props.email);

		store.dispatch(setAccountCreatingName(''));
		store.dispatch(setAccountCreatingPassword(''));
		store.dispatch(setAccountCreatingEmail(''));

		// set the focus to the username
		this.usernameInput.focus();
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		name: state.accountCreatingName,
		password: state.accountCreatingPassword,
		email: state.accountCreatingEmail,
		error: state.accountCreatingError,
	};
}

export default connect(mapStateToProps)(AccountCreateModalModal);