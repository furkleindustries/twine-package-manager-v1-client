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

export class AccountCreateModal extends Component {
	constructor() {
		super();

		this.doCreateAccount = this.doCreateAccount.bind(this);
	}

	render() {
		return (
			<div className="AccountCreateModal">
				<h1 className="subheader">Create Account</h1>
				<div className="AccountCreate-usernameContainer AccountCreate-container centerHorizontallyRelative">
					<label
						className="AccountCreate-usernameLabel AccountCreate-label"
						htmlFor="AccountCreate-username">
						Username
					</label>
					<input
						className="AccountCreate-usernameInput AccountCreate-input"
						id="AccountCreate-username"
						value={this.props.username}
						onChange={e => store.dispatch(setAccountCreatingName(e.target.value))}
						ref={input => this.usernameInput = input} 
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doCreateAccount();
							}
						}} />
				</div>

				<div className="AccountCreate-passwordContainer AccountCreate-container centerHorizontallyRelative">
					<label
						className="AccountCreate-passwordLabel AccountCreate-label"
						htmlFor="AccountCreate-password">
						Password
					</label>
					<input
						type="password"
						className="AccountCreate-passwordInput AccountCreate-input"
						id="AccountCreate-password"
						value={this.props.password}
						onChange={e => store.dispatch(setAccountCreatingPassword(e.target.value))}
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doCreateAccount();
							}
						}} />
				</div>

				<div className="AccountCreate-emailContainer AccountCreate-container centerHorizontallyRelative">
					<label
						className="AccountCreate-emailLabel AccountCreate-label"
						htmlFor="AccountCreate-email">
						E-mail
					</label>
					<input
						className="AccountCreate-emailInput AccountCreate-input"
						id="AccountCreate-email"
						value={this.props.email}
						onChange={e => store.dispatch(setAccountCreatingEmail(e.target.value))}
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doCreateAccount();
							}
						}} />
				</div>

				<button
					className="AccountCreate-button centerHorizontallyRelative"
					onClick={this.doCreateAccount}>
					Create Account
				</button>

				<p className="AccountCreate-error">
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

export default connect(mapStateToProps)(AccountCreateModal);