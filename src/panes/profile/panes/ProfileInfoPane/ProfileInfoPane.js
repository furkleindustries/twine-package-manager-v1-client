// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../../../store';
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
} from '../../profileActions';

// modules
import * as post from '../../../../modules/database/post';
import * as modalFactories from '../../../../modules/modals/factories';
import unixTimeToSettingsTime from '../../../../modules/unixTimeToSettingsTime';
import deepCopy from '../../../../modules/deepCopy';

// css
import './ProfileInfoPane.css';

export class ProfileInfoPane extends Component {
    render() {
        return (
            <div className="ProfileInfoPane">
                <h2 className="ProfileInfoPane-infoHeader header">
                    Profile Information
                </h2>

                <div id="ProfileInfoPane-infoContainer">
                    <span
                        id="ProfileInfoPane-visibleSign"
                        className="body"
                        htmlFor="ProfileInfoPane-dateCreatedVisible">
                        Visible to public:
                    </span>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-nameLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-id">
                            Profile ID:
                        </label>

                        <span
                            id="ProfileInfoPane-id"
                            className="ProfileInfoPane-input body">
                            {this.props.id}
                        </span>
                    </div>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-dateCreatedLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-dateCreated">
                            Created Date:
                        </label>

                        <span
                            id="ProfileInfoPane-dateCreated"
                            className="ProfileInfoPane-input body">
                            {unixTimeToSettingsTime(
                                this.props.dateCreated * 1000)}
                        </span>

                        <input
                            id="ProfileInfoPane-dateCreatedVisible"
                            className="ProfileInfoPane-visibility body"
                            type="checkbox"
                            checked={this.props.dateCreatedVisible ? "checked" : null}
                            onChange={e => {
                                let action = setProfileDateCreatedVisible(
                                    e.target.checked);
                                store.dispatch(action);
                            }} />
                    </div>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-nameLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-name">
                            Name:
                        </label>

                        <input
                            id="ProfileInfoPane-name"
                            className="ProfileInfoPane-input body"
                            value={this.props.name}
                            onChange={e => {
                                const action = setProfileName(e.target.value);
                                store.dispatch(action);
                            }} />

                        <input
                            id="ProfileInfoPane-nameVisible"
                            className="ProfileInfoPane-visibility body"
                            type="checkbox"
                            checked={this.props.nameVisible ? "checked" : null}
                            onChange={e => {
                                const action = setProfileNameVisible(
                                    e.target.checked);
                                store.dispatch(action);
                            }} />
                    </div>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-descriptionLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-description">
                            Description:
                        </label>

                        <textarea
                            id="ProfileInfoPane-description"
                            className="ProfileInfoPane-input body"
                            value={this.props.description}
                            onChange={e => {
                                const action = setProfileDescription(
                                    e.target.value);
                                store.dispatch(action);
                            }} />
                    </div>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-emailLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-email">
                            Email:
                        </label>
                        
                        <input
                            id="ProfileInfoPane-email"
                            className="ProfileInfoPane-input body"
                            value={this.props.email}
                            onChange={e => {
                                const action = setProfileEmail(e.target.value);
                                store.dispatch(action);
                            }} />

                        <input
                            id="ProfileInfoPane-emailVisible"
                            className="ProfileInfoPane-visibility body"
                            type="checkbox"
                            checked={this.props.emailVisible ? "checked" : null}
                            onChange={e => {
                                const action = setProfileEmailVisible(
                                    e.target.checked);
                                store.dispatch(action);
                            }} />
                    </div>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-homepageLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-homepage">
                            Homepage:
                        </label>
                        
                        <input
                            id="ProfileInfoPane-homepage"
                            className="ProfileInfoPane-homepage ProfileInfoPane-input body"
                            value={this.props.homepage}
                            onChange={e => {
                                const action = setProfileHomepage(
                                    e.target.value);
                                store.dispatch(action);
                            }} />
                    </div>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-dateStyleLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-dateStyle">
                            Date Style:
                        </label>

                        <select
                            id="ProfileInfoPane-dateStyle"
                            className="ProfileInfoPane-homepage ProfileInfoPane-input body"
                            value={this.props.dateStyle === 'ddmm' ? 'day/month/year' : 'month/day/year'}
                            onChange={e => {
                                let action;
                                const value = e.target.value;
                                if (value === 'month/day/year') {
                                    action = setProfileDateStyle('mmdd');
                                } else if (value === 'day/month/year') {
                                    action = setProfileDateStyle('ddmm');
                                } else {
                                    throw new Error('Unrecognized datestyle.');
                                }

                                store.dispatch(action);
                            }}>
                            <option>month/day/year</option>
                            <option>day/month/year</option>
                        </select>
                    </div>

                    <div className="ProfileInfoPane-infoPair">
                        <label
                            className="ProfileInfoPane-timetyleLabel ProfileInfoPane-label body"
                            htmlFor="ProfileInfoPane-timeStyle">
                            Time Style:
                        </label>

                        <select
                            id="ProfileInfoPane-timeStyle"
                            className="ProfileInfoPane-homepage ProfileInfoPane-input body"
                            value={this.props.timeStyle}
                            onChange={e => {
                                const action = setProfileTimeStyle(
                                    e.target.value);
                                store.dispatch(action);
                            }}>
                            <option>12h</option>
                            <option>24h</option>
                        </select>
                    </div>
                </div>

                <button
                    className={"ProfileInfoPane-confirmEditAccount wideButton" +
                        (this.props.changed ? "" : " disabled")}
                    onClick={() => {
                        post.profileUpdate({
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
                    <span>Update Profile</span>
                </button>

                <p className="ProfileInfoPane-message">
                    {this.props.message}
                </p>
            </div>
        );
    }

    componentDidMount() {
        const rollback = deepCopy(this.props);
        delete rollback.changed;
        delete rollback.rollback;
        delete rollback.packages;
        delete rollback.csrfToken;

        store.dispatch(setProfileRollback(rollback));
    }
}

function mapStateToProps() {
    const state = store.getState();

    const rollback = store.getState().profile.rollback;

    const current = deepCopy(store.getState().profile);
    delete current.rollback;
    delete current.packages;

    const changed = JSON.stringify(rollback) !== JSON.stringify(current);

    return {
        ...state.profile,
        changed,
        message: state.profileMessage,
        csrfToken: state.csrfToken,
    };
}

export default connect(mapStateToProps)(ProfileInfoPane)