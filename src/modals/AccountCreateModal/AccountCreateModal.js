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
import css from './AccountCreateModal.css';

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

                <style>{css}</style>
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
            this.props.name,
            this.props.password,
            this.props.email,
            this.props.csrfToken);

        if (successful) {
            setTimeout(modalClose, 6000);
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