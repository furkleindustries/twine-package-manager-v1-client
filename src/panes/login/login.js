/* react */
import React, { Component, } from 'react';
import { browserHistory, } from 'react-router';

/* redux */
import { connect, } from 'react-redux';
import store from '../../store';
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../../appActions';

import {
    setUsername,
    setPassword,
} from './loginActions';

/* modules */
import login from '../../modules/login';
import * as modalFactories from '../../modules/modals/factories';

/* css */
import './login.css';

const baseUrl = process.env.PUBLIC_URL;

export class LoginPane extends Component {
    constructor() {
        super();

        this.handleInputKeydown = this.handleInputKeydown.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    render() {
        return (
            <div className="Login paneContainer">
                <div className="Login-fieldContainer">
                    <div className="Login-infoPairContainer">
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
                            onChange={this.handleUsernameChange} 
                            onKeyDown={this.handleInputKeydown} />
                    </div>

                    <div className="Login-infoPairContainer">
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
                            ref={input => this.passwordInput = input}
                            onChange={this.handlePasswordChange}
                            onKeyDown={this.handleInputKeydown} />
                    </div>
                </div>

                <button
                    className="wideButton"
                    onClick={this.doLogin}>
                    <span>Login</span>
                </button>

                <button
                    className="wideButton"
                    onClick={modalFactories.accountCreate}>
                    <span>Create Account</span>
                </button>

                <p className="Login-message">
                    {this.props.message}
                </p>
            </div>
        );
    }

    componentDidMount() {
        if (localStorage.twinepmCSRFToken) {
            browserHistory.push(`${baseUrl}/profile`);
            store.dispatch(setAppSelectedPane('profile'));
        }

        store.dispatch(setSideBarVisible(false));
        
        if (location.hash === '#createAccount') {
            modalFactories.accountCreate();
        }
    }

    handleUsernameChange(e) {
        store.dispatch(setUsername(e.target.value));
    }

    handlePasswordChange(e) {
        store.dispatch(setPassword(e.target.value));
    }

    handleInputKeydown(e) {
        if (e.keyCode === 13) {
            this.doLogin();
        }
    }

    async doLogin() {
        let success;
        try {
            success = await login(this.props.username, this.props.password);
        } catch (e) {
            console.log(e);
        }

        if (!success) {
            store.dispatch(setPassword(''));
            this.passwordInput.focus();
        }
    }
}

function mapStateToProps() {
    const state = store.getState();

    return {
        username: state.username,
        password: state.password,
        message: state.loginMessage,
    };
}

export default connect(mapStateToProps)(LoginPane);