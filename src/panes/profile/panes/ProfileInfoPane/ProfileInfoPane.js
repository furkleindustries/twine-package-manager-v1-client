// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../../../store';
import {
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
} from '../../profileActions';

// modules
import unixTimeToSettingsTime from '../../../../modules/unixTimeToSettingsTime';
import deepCopy from '../../../../modules/deepCopy';
import accountUpdate from '../../../../modules/accountUpdate';

// css
import './ProfileInfoPane.css';

export class ProfileInfoPane extends Component {
    constructor() {
        super();

        this.getNameVisibleChecked = this.getNameVisibleChecked.bind(this);
        this.getDateCreatedVisibleChecked =
            this.getDateCreatedVisibleChecked.bind(this);
        this.getEmailVisibleChecked = this.getEmailVisibleChecked.bind(this);
        this.getPrettyDateStyle = this.getPrettyDateStyle.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

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
                            checked={this.getDateCreatedVisibleChecked}
                            onChange={this.handleDateCreatedChange} />
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
                            onChange={this.handleNameChange} />

                        <input
                            id="ProfileInfoPane-nameVisible"
                            className="ProfileInfoPane-visibility body"
                            type="checkbox"
                            checked={this.getNameVisibleChecked}
                            onChange={this.handleNameVisibleChange} />
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
                            onChange={this.handleDescriptionChange} />
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
                            onChange={this.handleEmailChange} />

                        <input
                            id="ProfileInfoPane-emailVisible"
                            className="ProfileInfoPane-visibility body"
                            type="checkbox"
                            checked={this.getEmailVisibleChecked}
                            onChange={this.handleEmailVisibleChange} />
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
                            onChange={this.handleHomepageChange} />
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
                            value={this.getPrettyDateStyle}
                            onChange={this.handleDateStyleChange}>
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
                            onChange={this.handleTimeStyleChange}>
                            <option>12h</option>
                            <option>24h</option>
                        </select>
                    </div>
                </div>

                <button
                    className={"ProfileInfoPane-confirmEditAccount wideButton" +
                        (this.props.changed ? "" : " disabled")}
                    onClick={this.updateProfile}>
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

    handleDateCreatedChange(e) {
        store.dispatch(setProfileDateCreatedVisible(e.target.checked));
    }

    handleNameChange(e) {
        store.dispatch(setProfileName(e.target.value));
    }

    handleNameVisibleChange(e) {
        store.dispatch(setProfileNameVisible(e.target.checked));
    }

    handleDescriptionChange(e) {
        store.dispatch(setProfileDescription(e.target.value));
    }

    handleEmailChange(e) {
        store.dispatch(setProfileEmail(e.target.value));
    }

    handleEmailVisibleChange(e) {
        store.dispatch(setProfileEmailVisible(e.target.checked));
    }

    handleHomepageChange(e) {
        store.dispatch(setProfileHomepage(e.target.value));
    }

    handleDateStyleChange(e) {
        let dateStyle;
        const value = e.target.value;
        if (value === 'month/day/year') {
            dateStyle = 'mmdd';
        } else if (value === 'day/month/year') {
            dateStyle = 'ddmm';
        } else {
            throw new Error('Unrecognized datestyle.');
        }

        store.dispatch(setProfileDateStyle(dateStyle));
    }

    handleTimeStyleChange(e) {
        store.dispatch(setProfileTimeStyle(e.target.value));
    }

    getNameVisibleChecked() {
        return this.props.nameVisible ? "checked" : null;
    }

    getDateCreatedVisibleChecked() {
        return this.props.dateCreatedVisible ? "checked" : null;
    }

    getEmailVisibleChecked() {
        return this.props.emailVisible ? "checked" : null;
    }

    getPrettyDateStyle() {
        return this.props.dateStyle === 'ddmm' ?
            'day/month/year' :
            'month/day/year';
    }

    updateProfile() {
        const profile = {
            dateCreatedVisible: this.props.dateCreatedVisible,
            name: this.props.name || '',
            nameVisible: this.props.nameVisible,
            description: this.props.description || '',
            email: this.props.email || '',
            emailVisible: this.props.emailVisible,
            homepage: this.props.homepage || '',
            dateStyle: this.props.dateStyle,
            timeStyle: this.props.timeStyle,
        };

        accountUpdate(profile, this.props.csrfToken);
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