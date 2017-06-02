/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';

/* modules */
/* import changePassword from '../../../../modules/changePassword'; */
import * as modalFactories from '../../../../modules/modals/factories';
import logout from '../../../../modules/logout';

/* css */
/*import css from './ProfileAccountPane.css';*/

export class ProfileAccountPane extends Component {
    constructor() {
        super();

        this.spawnAccountDeleteModal = this.spawnAccountDeleteModal.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

    render() {
        return (
            <div className="ProfileAccountPane">
                <h1 className="header">
                    Account Options
                </h1>

                <button className="Profile-logout wideButton">
                    <span>Change Password</span>
                </button>

                <button
                    className="ProfileInfoPane-deleteAccount wideButton"
                    onClick={this.spawnAccountDeleteModal}>
                    <span>Delete Account</span>
                </button>

                <button
                    className="Profile-logout wideButton"
                    onClick={this.doLogout}>
                    <span>Log Out</span>
                </button>

                <p className="ProfileInfoPane-message">
                    {this.props.message}
                </p>

                <style jsx>{
                    `.ProfileInfoPane-message {
                        height: 1rem;
                        text-align: center;
                    }`
                }</style>
            </div>
        );
    }

    spawnAccountDeleteModal() {
        modalFactories.accountDelete(this.props.dispatch);
    }

    doLogout() {
        logout(this.props.store);
    }
}

function mapStateToProps(state) {
    return {
        message: state.profileMessage,
    };
}   

export default connect(mapStateToProps)(ProfileAccountPane);