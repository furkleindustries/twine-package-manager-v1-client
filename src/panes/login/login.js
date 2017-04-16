// react
import React, { Component } from 'react';

// redux
import store from '../../store';
import { setUsername, setPassword } from './loginActions';

import './login.css';

// components
import CreateAccountModal from '../../modals/CreateAccountModal/CreateAccountModal.js';

class LoginPane extends Component {
	constructor() {
		super();

		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.doLogin = this.doLogin.bind(this);
		this.createAccountModal = this.createAccountModal.bind(this);
	}

	render() {
		return (
			<div className="Login paneContainer">
				<div className="Login-usernameContainer Login-container centerHorizontallyRelative">
					<label
						className="Login-usernameLabel Login-label subheader"
						htmlFor="Login-username">
						Username
					</label>
					<input
						className="Login-usernameInput Login-input subheader"
						id="Login-username"
						value={this.props.username}
						ref={input => this.usernameInput = input}
						onChange={this.onUsernameChange} 
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doLogin();
							}
						}} />
				</div>

				<div className="Login-passwordContainer Login-container centerHorizontallyRelative">
					<label
						className="Login-passwordLabel Login-label subheader"
						htmlFor="Login-password">
						Password
					</label>
					<input
						type="password" 
						className="Login-passwordInput Login-input subheader"
						id="Login-password"
						value={this.props.password}
						onChange={this.onPasswordChange}
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doLogin();
							}
						}} />
				</div>

				<button
					className="Login-doLogin Login-button centerHorizontallyRelative wideButton"
					onClick={this.doLogin}>
					<span>Login</span>
				</button>

				<button
					className="Login-createAccount Login-button centerHorizontallyRelative wideButton"
					onClick={this.createAccountModal}>
					<span>Create Account</span>
				</button>

				<p className="Login-error">
					{this.props.error}
				</p>
			</div>
		);
	}

	componentDidMount() {
		if (location.hash === '#register') {
			this.createAccountModal();
		}
	}

	onUsernameChange(e) {
		store.dispatch(setUsername(e.target.value));
	}

	onPasswordChange(e) {
		store.dispatch(setPassword(e.target.value));
	}

	doLogin() {
		this.props.appLogin(this.props.username, this.props.password, this);

		// set the focus to the username
		this.usernameInput.focus();
	}

	createAccountModal() {
		location.hash = 'register';

		this.props.createModal(<CreateAccountModal />);		
	}
}

export default LoginPane;