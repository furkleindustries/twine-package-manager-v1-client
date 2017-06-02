/* react */
import React, { Component, } from 'react';
import { browserHistory, } from 'react-router';

/* next */
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';

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
/*import css from '../src/panes/login/login.css';*/

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

                <style jsx>{
                    `.Login {
                        text-align: left;
                    }

                    .Login-fieldContainer {
                        text-align: center;
                    }

                    .Login-infoPairContainer {
                        display: inline-block;
                        text-align: left;
                    }

                    .Login-title {
                        text-align: center;
                    }

                    .Login-label {
                        display: inline-block;
                        text-align: left;
                    }

                    .Login-button:hover,
                    .Login-button:active {
                        background: rgb(200, 0, 0);
                    }

                    .Login-message {
                        height: 1rem;
                        text-align: center;
                    }

                    @media (min-width: 0px) {
                        .Login-input {
                            width: 100%;
                            margin-bottom: 0.5rem;
                        }

                        .Login-input:last-of-type {
                            margin-bottom: 0.75rem;
                        }
                    }

                    @media (min-width: 550px) {
                        .Login-label {
                            width: 7rem;
                        }

                        .Login-input {
                            width: 15.25rem;
                        }

                        .Login-input {
                            margin-bottom: 0.75rem;
                        }

                        .Login-input:last-of-type {
                            margin-bottom: 1.125rem;
                        }
                    }

                    @media (min-width: 750px) {
                        .Login-label {
                            width: 7.5rem;
                        }

                        .Login-input {
                            width: 24.5rem;
                        }
                    }

                    @media (min-width: 1000px) {
                        .Login-label {
                            width: 8rem;
                        }

                        .Login-input {
                            width: 36.5rem;
                        }
                    }

                    @media (min-width: 1250px) {
                        .Login-label {
                            width: 8.75rem;
                        }

                        .Login-input {
                            width: 46rem;
                        }
                    }

                    @media (min-width: 1500px) {
                        .Login-label {
                            width: 9.5rem;
                        }

                        .Login-input {
                            width: 59.5rem;
                        }
                    }

                    @media (min-width: 1750px) {
                        .Login-label {
                            width: 10.5rem;
                        }

                        .Login-input {
                            width: 63.5rem;
                        }
                    }`
                }</style>
            </div>
        );
    }

    componentDidMount() {
        if (localStorage.twinepmCSRFToken) {
            Router.push('/profile', 'profile');
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
            success = await login(
                this.props.store,
                this.props.username,
                this.props.password);
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

const Connected = connect(mapStateToProps)(LoginPage);
const wrapped = () => (
    <App>
        <Connected />
    </App>
);

export async function getInitialProps({ req, store, }) {
    /* req only exists on server side */
    if (req) {
        store.dispatch(setAppSelectedPane(req.url.slice(1)));
    }
}

wrapped.getInitialProps = getInitialProps;

export default withRedux(initStore, mapStateToProps, null)(wrapped);