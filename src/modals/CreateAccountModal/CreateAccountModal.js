import 'whatwg-fetch';

// react
import React, { Component } from 'react';

// modules
import modalClose from '../../modules/modalClose';

// css
import './CreateAccountModal.css';

class CreateAccountModal extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			email: '',
		};

		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.clearInputs = this.clearInputs.bind(this);
		this.doCreateAccount = this.doCreateAccount.bind(this);
	}

	render() {
		return (
			<div className="CreateAccountModal">
				<h1 className="subheader">Create Account</h1>
				<div className="CreateAccount-usernameContainer CreateAccount-container centerHorizontallyRelative">
					<label
						className="CreateAccount-usernameLabel CreateAccount-label"
						htmlFor="CreateAccount-username">
						Username
					</label>
					<input
						className="CreateAccount-usernameInput CreateAccount-input"
						id="CreateAccount-username"
						value={this.state.username}
						onChange={this.onUsernameChange}
						ref={input => this.usernameInput = input} 
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doCreateAccount();
							}
						}} />
				</div>

				<div className="CreateAccount-passwordContainer CreateAccount-container centerHorizontallyRelative">
					<label
						className="CreateAccount-passwordLabel CreateAccount-label"
						htmlFor="CreateAccount-password">
						Password
					</label>
					<input
						type="password"
						className="CreateAccount-passwordInput CreateAccount-input"
						id="CreateAccount-password"
						value={this.state.password}
						onChange={this.onPasswordChange}
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doCreateAccount();
							}
						}} />
				</div>

				<div className="CreateAccount-emailContainer CreateAccount-container centerHorizontallyRelative">
					<label
						className="CreateAccount-emailLabel CreateAccount-label"
						htmlFor="CreateAccount-email">
						E-mail
					</label>
					<input
						className="CreateAccount-emailInput CreateAccount-input"
						id="CreateAccount-email"
						value={this.state.email}
						onChange={this.onEmailChange}
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.doCreateAccount();
							}
						}} />
				</div>

				<button
					className="CreateAccount-button centerHorizontallyRelative"
					onClick={this.doCreateAccount}>
					Create Account
				</button>

				<p className="CreateAccount-error">
					{this.state.error}
				</p>
			</div>
		);
	}

	componentDidMount() {
		this.usernameInput.focus();
	}

	onUsernameChange(e) {
		this.setState({
			username: e.target.value,
		});
	}

	onPasswordChange(e) {
		this.setState({
			password: e.target.value,
		});
	}

	onEmailChange(e) {
		this.setState({
			email: e.target.value,
		});
	}

	clearInputs() {
		this.setState({
			username: '',
			password: '',
			email: '',
		});
	}

	doCreateAccount() {
		const formData = new FormData();
		formData.append('name', this.state.username);
		formData.append('password', this.state.password);
		formData.append('email', this.state.email);

		fetch('https://furkleindustries.com/twinepm/login/createAccount.php', {
			method: 'POST',
			body: formData,
		}).then(response => {
			return response.json();
		}).catch(e => {
			const error = 'Unknown error.'
			this.setState({
				error,
			});

			setTimeout(() => {
				if (this.state.error === error) {
					this.setState({
						error: '',
					});
				}
			}, 6000);

			// set the focus to the username
			this.usernameInput.focus();

			// don't allow execution to continue
			return Promise.reject();
		}).then(responseObj => {
			if (responseObj.error) {
				this.setState({
					error: responseObj.error,
				});

				setTimeout(() => {
					if (this.state.error === responseObj.error) {
						this.setState({
							error: '',
						});
					}
				}, 6000);

				return Promise.reject();
			} else if (responseObj.status !== 200) {
				const error = 'The request did not succeed, but there was ' +
					'error message received.';
				this.setState({
					error,
				});

				setTimeout(() => {
					if (this.state.error === error) {
						this.setState({
							error: '',
						});
					}
				}, 6000);

				return Promise.reject();
			}

			// clear both input elements
			this.clearInputs();

			this.setState({
				error: 'Please check your e-mail (including the spam ' +
					'folder) for the validation e-mail, then follow the ' +
					'link therein. Your username will be reserved for 24 ' +
					'hours, after which it will become available to everyone ' +
					'again.',
			});

			setTimeout(() => {
				modalClose();
			}, 6000)
		});
	}
}

export default CreateAccountModal;