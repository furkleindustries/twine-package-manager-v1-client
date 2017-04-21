// react
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// redux
import { connect, } from 'react-redux';
import store from '../../store';

// actions
import { setSelectedPane, } from '../../appActions';

import {
    setProfile,
    setProfileRollback,
    setProfileDateCreatedVisible,
    setProfileName,
    setProfileNameVisible,
    setProfileDescription,
    setProfileEmail,
    setProfileEmailVisible,
    setProfileHomepage,
    setProfileDateStyle,
    setProfileTimeStyle,
    setProfileEditing,
} from './profileActions';

// components
import PackageOwned from '../../components/PackageOwned/PackageOwned';

// modules
import unixTimeToSettingsTime from '../../modules/unixTimeToSettingsTime';
import updateProfileOnDatabase from '../../modules/updateProfileOnDatabase';
import logout from '../../modules/logout';
// no idea why i need .js                                                   here
import modalCreateCreatePackage from '../../modules/modalCreateCreatePackage.js';
import modalCreateDeleteAccount from '../../modules/modalCreateDeleteAccount';

// css
import './profile.css';

const baseUrl = process.env.PUBLIC_URL;

export class ProfilePane extends Component {
    render() {
        const opts = {};
        const disabled = {};

        if (!this.props.editing) {
             opts.readOnly = 'readOnly';
             disabled.disabled = 'disabled'; 
        }

        const list = (this.props.packages || []).map(pkg => {
            return <PackageOwned
                key={pkg.name}
                createModal={this.props.createModal}
                closeModal={this.props.closeModal}
                togglePackagePublish={this.props.togglePackagePublish}
                editPackage={this.props.editPackage}
                removePackage={this.props.removePackage}
                {...pkg} />;
        });

        const dateCreated = unixTimeToSettingsTime(this.props.dateCreated * 1000);

        return (
            <div className="Profile paneContainer">
                <section id="profileInfo">
                    <h2 className="Profile-infoHeader subheader">
                        Profile Information
                    </h2>

                    <div id="Profile-infoContainer">
                        <span
                            id="Profile-visibleSign"
                            className="body"
                            htmlFor="Profile-dateCreatedVisible">
                            Visible to public:
                        </span>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-nameLabel Profile-label body"
                                htmlFor="Profile-id">
                                Profile ID:
                            </label>

                            <span
                                id="Profile-id"
                                className="Profile-input body">
                                {this.props.id}
                            </span>
                        </div>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-dateCreatedLabel Profile-label body"
                                htmlFor="Profile-dateCreated">
                                Created Date:
                            </label>

                            <span
                                id="Profile-dateCreated"
                                className="Profile-input body">
                                {dateCreated}
                            </span>

                            <input
                                id="Profile-dateCreatedVisible"
                                className={"Profile-visibility body" + (this.props.editing ? "" : " Profile-readonly")}
                                type="checkbox"
                                checked={this.props.dateCreatedVisible ? "checked" : null}
                                onChange={e => store.dispatch(setProfileDateCreatedVisible(e.target.checked))}
                                {...disabled} />
                        </div>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-nameLabel Profile-label body"
                                htmlFor="Profile-name">
                                Name:
                            </label>

                            <input
                                id="Profile-name"
                                className={"Profile-input body" + (this.props.editing ? "" :  " Profile-readonly")}
                                value={this.props.name}
                                onChange={e => store.dispatch(setProfileName(e.target.value))}
                                {...opts} />

                            <input
                                id="Profile-nameVisible"
                                className={"Profile-visibility body" + (this.props.editing ? "" : " Profile-readonly")}
                                type="checkbox"
                                checked={this.props.nameVisible ? "checked" : null}
                                onChange={e => store.dispatch(setProfileNameVisible(e.target.checked))}
                                {...disabled} />
                        </div>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-descriptionLabel Profile-label body"
                                htmlFor="Profile-description">
                                Description:
                            </label>

                            <textarea
                                id="Profile-description"
                                className={"Profile-input body" + (this.props.editing ? "" :  " Profile-readonly")}
                                value={this.props.description}
                                onChange={e => store.dispatch(setProfileDescription(e.target.value))}
                                {...disabled} />
                        </div>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-emailLabel Profile-label body"
                                htmlFor="Profile-email">
                                Email:
                            </label>
                            
                            <input
                                id="Profile-email"
                                className={"Profile-input body" + (this.props.editing ? "" :  " Profile-readonly")}
                                value={this.props.email}
                                onChange={e => store.dispatch(setProfileEmail(e.target.value))}
                                {...opts} />

                            <input
                                id="Profile-emailVisible"
                                className="Profile-visibility body"
                                type="checkbox"
                                checked={this.props.emailVisible ? "checked" : null}
                                onChange={e => store.dispatch(setProfileEmailVisible(e.target.checked))}
                                {...disabled} />
                        </div>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-homepageLabel Profile-label body"
                                htmlFor="Profile-homepage">
                                Homepage:
                            </label>
                            
                            <input
                                id="Profile-homepage"
                                className={"Profile-homepage Profile-input body" + (this.props.editing ? "" :  " Profile-readonly")}
                                value={this.props.homepage}
                                onChange={e => store.dispatch(setProfileHomepage(e.target.value))}
                                {...opts} />
                        </div>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-dateStyleLabel Profile-label body"
                                htmlFor="Profile-dateStyle">
                                Date Style:
                            </label>

                            <select
                                id="Profile-dateStyle"
                                className={"Profile-homepage Profile-input body" + (this.props.editing ? "" : " Profile-readonly")}
                                value={this.props.dateStyle === 'ddmm' ? 'day/month/year' : 'month/day/year'}
                                onChange={e => {
                                    if (e.target.value === 'month/day/year') {
                                        store.dispatch(setProfileDateStyle('mmdd'));
                                    } else {
                                        store.dispatch(setProfileDateStyle('ddmm'));
                                    }
                                }}
                                {...disabled}>
                                <option>month/day/year</option>
                                <option>day/month/year</option>
                            </select>
                        </div>

                        <div className="Profile-infoPair">
                            <label
                                className="Profile-timetyleLabel Profile-label body"
                                htmlFor="Profile-timeStyle">
                                Time Style:
                            </label>

                            <select
                                id="Profile-timeStyle"
                                className={"Profile-homepage Profile-input body" + (this.props.editing ? "" : " Profile-readonly")}
                                value={this.props.timeStyle}
                                onChange={e => {
                                    store.dispatch(setProfileTimeStyle(e.target.value));
                                }}
                                {...disabled}>
                                <option>12h</option>
                                <option>24h</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className={"Profile-editAccount wideButton" + (this.props.editing ? " Profile-invisible" : "")}
                        onClick={() => {
                            store.dispatch(setProfileRollback(null));
                            const rollback = { ...this.props };
                            rollback.rollback = null;
                            store.dispatch(setProfileRollback(rollback));
                            store.dispatch(setProfileEditing(true));
                        }}>
                        <span className="centerHorizontallyAndVerticallyAbsolute">
                            Edit Profile Details
                        </span>
                    </button>

                    <button
                        className="Profile-editAccount wideButton"
                        onClick={modalCreateDeleteAccount}>
                        <span className="centerHorizontallyAndVerticallyAbsolute">
                            Delete Account
                        </span>
                    </button>

                    <div className={"Profile-doubleButtonContainer wideButton" + (this.props.editing ? "" : " Profile-invisible")}>
                        <button
                            className="Profile-confirmEditAccount wideButton"
                            onClick={() => {
                                updateProfileOnDatabase({
                                    dateCreatedVisible: this.props.dateCreatedVisible,
                                    name: this.props.name || '',
                                    nameVisible: this.props.nameVisible,
                                    description: this.props.description || '',
                                    email: this.props.email || '',
                                    emailVisible: this.props.emailVisible,
                                    homepage: this.props.homepage || '',
                                    dateStyle: this.props.dateStyle,
                                    timeStyle: this.props.timeStyle,
                                    csrfToken: this.props.csrfToken,
                                });
                            }}>
                            <span>Confirm</span>
                        </button>

                        <button
                            className="Profile-cancelEditAccount wideButton"
                            onClick={() => {
                                store.dispatch(setProfile(this.props.rollback));
                                store.dispatch(setProfileEditing(false));
                            }}>
                            <span>Cancel</span>
                        </button>
                    </div>

                    <p className="Profile-userdataError">{this.props.error}</p>
                </section>

                <hr className="Profile-newSection" />

                <div className="Profile-packages body">
                    <h2 className="Profile-packagesHeader subheader">My Packages</h2>
                    {list.length ? list : "No packages."}
                </div>

                <button
                    className="Profile-newPackage wideButton"
                    onClick={modalCreateCreatePackage}>
                    Create New Package
                </button>

                <hr className="Profile-newSection" />

                <button
                    className="Profile-logout wideButton"
                    onClick={logout}>
                    <span>
                        Log Out
                    </span>
                </button>
            </div>
        );
    }

    componentDidMount() {
        if (!localStorage.twinepmCSRFToken) {
            store.dispatch(setSelectedPane('login'));
            browserHistory.push(baseUrl + '/login');
        }

        if (location.hash === '#deleteAccount') {
            modalCreateDeleteAccount();
        } else if (location.hash === '#createNewPackage') {
            modalCreateCreatePackage();
        }
    }
}

function mapStateToProps() {
    const state = store.getState();

    return {
        ...state.profile,
        csrfToken: state.csrfToken,
    };
}

export default connect(mapStateToProps)(ProfilePane);