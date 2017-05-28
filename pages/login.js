/* react */
import React, { Component, } from 'react';
import { browserHistory, } from 'react-router';

/* next */
import withRedux from 'next-redux-wrapper';

/* redux */
import initStore from '../src/store';
import { connect, } from 'react-redux';
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../src/appActions';

import {
    setUsername,
    setPassword,
} from '../src/panes/login/loginActions';

/* modules */
import login from '../src/modules/login';
import * as modalFactories from '../src/modules/modals/factories';

/* components */
import App from '../src/App';

/* css */
import css from '../src/panes/login/login.css';

const baseUrl = process.env.PUBLIC_URL;

export class LoginPage extends Component {
    constructor() {
        super();

        this.handleInputKeydown = this.handleInputKeydown.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

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

                <style>{css}</style>
            </div>
        );
    }

    componentDidMount() {
        if (localStorage.twinepmCSRFToken) {
            browserHistory.push(`${baseUrl}/profile`);
            this.props.dispatch(setAppSelectedPane('profile'));
        }

        this.props.dispatch(setSideBarVisible(false));
        
        if (location.hash === '#createAccount') {
            modalFactories.accountCreate();
        }
    }

    handleUsernameChange(e) {
        this.props.dispatch(setUsername(e.target.value));
    }

    handlePasswordChange(e) {
        this.props.dispatch(setPassword(e.target.value));
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
            this.props.dispatch(setPassword(''));
            this.passwordInput.focus();
        }
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        password: state.password,
        message: state.loginMessage,
    };
}

const ConnectedPage = connect()(LoginPage);

const wrapped = () => (
    <App>
        <ConnectedPage />
    </App>
);

wrapped.getInitialProps = ({ req, store }) => {
    if (req) {
        store.dispatch(setAppSelectedPane(req.url.slice(1)));
    }
};

export default withRedux(initStore, mapStateToProps, null)(wrapped);