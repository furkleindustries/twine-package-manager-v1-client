/* react */
import React, { Component } from 'react';

/* redux */
import { connect, } from 'react-redux';
import {
    setAccountCreatingName,
    setAccountCreatingPassword,
    setAccountCreatingEmail,
} from './AccountCreateModalActions';

/* modules */
import accountCreate from '../../modules/accountCreate';
import modalClose from '../../modules/modals/close';

/* css */
/*import css from './AccountCreateModal.css';*/

export class AccountCreateModal extends Component {
    constructor() {
        super();

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.doAccountCreate = this.doAccountCreate.bind(this);
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
                            value={this.props.name}
                            onChange={this.handleNameChange}
                            ref={input => this.nameInput = input} 
                            onKeyDown={this.handleKeyDown} />
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
                            onChange={this.handlePasswordChange}
                            onKeyDown={this.handleKeyDown} />
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
                            onChange={this.handleEmailChange}
                            onKeyDown={this.handleKeyDown} />
                    </div>
                </div>

                <button
                    className="AccountCreateModal-button wideButton"
                    onClick={this.doAccountCreate}>
                    Create Account
                </button>

                <p className="AccountCreateModal-message">
                    {this.props.message}
                </p>

                <style jsx>{
                    `.AccountCreateModal {
                        text-align: left;
                    }

                    .AccountCreateModal-fieldContainer {
                        text-align: center;
                    }

                    .AccountCreateModal-infoPairContainer {
                        display: inline-block;
                        text-align: left;
                    }

                    .AccountCreateModal-title {
                        text-align: center;
                    }

                    .AccountCreateModal-label {
                        display: inline-block;
                        text-align: left;
                    }

                    .AccountCreateModal-button:hover,
                    .AccountCreateModal-button:active {
                        background: rgb(200, 0, 0);
                    }

                    .AccountCreateModal-message {
                        text-align: center;
                        height: 1rem;
                    }

                    @media (min-width: 0px) {
                        .AccountCreateModal-input {
                            width: 100%;
                            margin-bottom: 0.5rem;
                        }

                        .AccountCreateModal-input:last-of-type {
                            margin-bottom: 0.75rem;
                        }
                    }

                    @media (min-width: 550px) {
                        .AccountCreateModal-label {
                            width: 7rem;
                        }

                        .AccountCreateModal-input {
                            width: 15.25rem;
                            margin-bottom: 0.75rem;
                        }

                        .AccountCreateModal-input:last-of-type {
                            margin-bottom: 1.125rem;
                        }
                    }

                    @media (min-width: 750px) {
                        .AccountCreateModal-label {
                            width: 7.5rem;
                        }

                        .AccountCreateModal-input {
                            width: 24.5rem;
                        }
                    }

                    @media (min-width: 1000px) {
                        .AccountCreateModal-label {
                            width: 8rem;
                        }

                        .AccountCreateModal-input {
                            width: 36.5rem;
                        }
                    }

                    @media (min-width: 1250px) {
                        .AccountCreateModal-label {
                            width: 8.75rem;
                        }

                        .AccountCreateModal-input {
                            width: 48rem;
                        }
                    }

                    @media (min-width: 1500px) {
                        .AccountCreateModal-label {
                            width: 9.5rem;
                        }

                        .AccountCreateModal-input {
                            width: 59.5rem;
                        }
                    }

                    @media (min-width: 1750px) {
                        .AccountCreateModal-label {
                            width: 10.5rem;
                        }

                        .AccountCreateModal-input {
                            width: 63.5rem;
                        }
                    }`
                }</style>
            </div>
        );
    }

    componentDidMount() {
        this.nameInput.focus();
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.doAccountCreate();
        }
    }

    handleNameChange(e) {
        this.props.dispatch(setAccountCreatingName(e.target.value));
    }

    handlePasswordChange(e) {
        this.props.dispatch(setAccountCreatingPassword(e.target.value));
    }

    handleEmailChange(e) {
        this.props.dispatch(setAccountCreatingEmail(e.target.value));
    }

    async doAccountCreate() {
        const successful = await accountCreate(
            this.props.store,
            this.props.name,
            this.props.password,
            this.props.email);

        if (successful) {
            setTimeout(() => modalClose(this.props.store.dispatch), 6000);
        } else {
            this.nameInput.focus();
        }
    }
}

function mapStateToProps(state) {
    return {
        name: state.accountCreatingName,
        password: state.accountCreatingPassword,
        email: state.accountCreatingEmail,
        message: state.accountCreatingMessage,
        csrfToken: state.csrfToken,
    };
}

export default connect(mapStateToProps)(AccountCreateModal);