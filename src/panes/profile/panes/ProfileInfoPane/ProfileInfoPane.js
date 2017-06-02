/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';
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

/* modules */
import unixTimeToSettingsTime from '../../../../modules/unixTimeToSettingsTime';
import deepCopy from '../../../../modules/deepCopy';
import accountUpdate from '../../../../modules/accountUpdate';

/* css */
/*import css from './ProfileInfoPane.css';*/

export class ProfileInfoPane extends Component {
    constructor() {
        super();

        this.getNameVisibleChecked = this.getNameVisibleChecked.bind(this);
        this.getDateCreatedVisibleChecked =
            this.getDateCreatedVisibleChecked.bind(this);
        this.getEmailVisibleChecked = this.getEmailVisibleChecked.bind(this);
        this.getPrettyDateStyle = this.getPrettyDateStyle.bind(this);

        this.handleDateCreatedVisibleChange =
            this.handleDateCreatedVisibleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameVisibleChange = this.handleNameVisibleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailVisibleChange =
            this.handleEmailVisibleChange.bind(this);
        this.handleDateStyleChange = this.handleDateStyleChange.bind(this);
        this.handleTimeStyleChange = this.handleTimeStyleChange.bind(this);

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
                            onChange={this.handleDateCreatedVisibleChange} />
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

                <style jsx>{
                    `#ProfileInfoPane-infoContainer {
                        display: inline-block;
                        position: relative;
                        text-align: left;
                    }

                    #ProfileInfoPane-id,
                    #ProfileInfoPane-dateCreated {
                        display: inline-block;
                        border: 2px solid transparent;
                    }

                    #ProfileInfoPane-description {
                        height: 6rem;
                        background: white;
                        resize: none;
                    }

                    label[for="ProfileInfoPane-description"] {
                        transform: translateY(-6rem);
                    }

                    #ProfileInfoPane-visibleSign {
                        position: absolute;
                        right: 0;
                        width: 4rem;
                        text-align: center;
                    }

                    #ProfileInfoPane-visibleSign::after {
                        position: absolute;
                        left: 50%;
                        background: black;
                        opacity: 0.1;
                        transform: translateX(-50%);
                        z-index: -1;
                        content: '';
                    }

                    .ProfileInfoPane-label {
                        position: relative;
                        display: inline-block;
                        margin-right: 0.5rem;
                        font-weight: bold;
                        z-index: -1;
                    }

                    .ProfileInfoPane-input {
                        margin-bottom: 0.5rem;
                        padding: 0.25rem;
                        border: 2px double rgb(80, 80, 80);
                        border-radius: 3px;
                        box-sizing: content-box;
                    }

                    .ProfileInfoPane-visibility {
                        margin: 0 0.65rem 0 0.95rem;
                    }

                    .ProfileInfoPane-newSection {
                        margin: 1.1rem;
                        border-top: 0.1rem solid rgba(0, 0, 0, 0.5);
                    }

                    .ProfileInfoPane-readonly {
                        border: 2px solid rgba(0, 0, 0, 0.05);
                        color: #6d6d6d;
                    }

                    .ProfileInfoPane-message {
                        display: inline-block;
                        height: 1rem;
                        text-align: center;
                    }

                    .ProfileInfoPane-doubleButtonContainer {
                        padding: 0;
                        border: 0;
                        background: none;
                    }

                    .ProfileInfoPane-doubleButtonContainer:hover {
                        background: transparent;
                    }

                    .ProfileInfoPane-doubleButtonContainer button {
                        display: inline;
                        width: 50%;
                        margin: 0;
                    }

                    .ProfileInfoPane-invisible {
                        display: none;
                    }

                    .ProfileInfoPane-logout {
                        margin-left: auto;
                        margin-right: auto;
                    }

                    @media (min-width: 0px) {
                        .ProfileInfoPane-label {
                            width: 2.1rem;
                        }

                        .ProfileInfoPane-input {
                            width: 2.1rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(1, 1) translateY(0.3rem);
                            margin: 0 -0.1rem 0  0.2rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            width: 2rem;
                            transform: translateX(0.65rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 1.25rem;
                            width: 0.09rem;
                            height: 12.6rem;
                        }

                        .ProfileInfoPane-editAccount {
                            padding: 1rem;
                        }
                    }

                    @media (min-width: 250px) {
                        .ProfileInfoPane-label {
                            width: 3rem;
                        }

                        .ProfileInfoPane-input {
                            width: 3rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(1.2, 1.2) translateY(0.225rem);
                            margin: 0 0.025rem 0 0.5rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            transform: translateX(0.5rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 1.55rem;
                            width: 0.1rem;
                            height: 12.7rem;
                        }

                        .ProfileInfoPane-editAccount {
                            padding: inherit;
                        }
                    }

                    @media (min-width: 300px) {
                        .ProfileInfoPane-label {
                            width: 3.9rem;
                        }

                        .ProfileInfoPane-input {
                            width: 3.9rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(1.6, 1.6) translateY(0.12rem);
                            margin: 0 0.2rem 0 0.75rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            width: 3rem;
                            transform: translateX(0.8rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 1.95rem;
                            height: 13.3rem;
                        }
                    }

                    @media (min-width: 350px) {
                        .ProfileInfoPane-label {
                            width: 4.5rem;
                        }

                        .ProfileInfoPane-input {
                            width: 6.55rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(1.7, 1.7) translateY(0.11rem);
                            margin: 0 0.35rem 0 1rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            transform: translateX(1.2rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 2.2rem;
                            height: 13.9rem;
                        }
                    }

                    @media (min-width: 400px) {
                        .ProfileInfoPane-label {
                            width: 4.8rem;
                        }

                        .ProfileInfoPane-input {
                            width: 8.7rem;
                            font-size: 95%;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(1.8, 1.8) translateY(0.11rem);
                            margin: 0 0.4rem 0 1rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            transform: translateX(1.1rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 2.3rem;
                            height: 13.8rem;
                        }

                        .ProfileInfoPane-packagesHeader {
                            margin-bottom: 2rem;
                        }
                    }

                    @media (min-width: 450px) {
                        .ProfileInfoPane-label {
                            width: 6rem;
                        }

                        .ProfileInfoPane-input {
                            width: 9.5rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(1.9, 1.9) translateY(0.1rem);
                            margin: 0 0.425rem 0 1rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            transform: translateX(1.1rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 2.35rem;
                            height: 14.1rem;
                        }
                    }

                    @media (min-width: 500px) {
                        .ProfileInfoPane-label {
                            width: 6.2rem;
                        }

                        .ProfileInfoPane-input {
                            width: 12rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(2, 2) translateY(0.07rem);
                            margin: 0 0.5rem 0 1rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            width: 5rem;
                            transform: translateX(1.55rem) translateY(-1rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 2.55rem;
                            height: 14.4rem;
                        }
                    }

                    @media (min-width: 550px) {
                        .ProfileInfoPane-label {
                            width: 6.55rem;
                        }

                        .ProfileInfoPane-input {
                            width: 13.5rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(2, 2) translateY(0.07rem);
                            margin: 0 0.5rem 0 1.25rem;
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 2.7rem;
                            height: 14.45rem;
                        }
                    }

                    @media (min-width: 750px) {
                        .ProfileInfoPane-label {
                            width: 6.9rem;
                        }

                        .ProfileInfoPane-input {
                            width: 23.5rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(2.25, 2.25) translateY(0.06rem);
                            margin: 0 0.55rem 0 1.25rem;
                        }

                        #ProfileInfoPane-visibleSign::after {
                            top: 1.5rem;
                            height: 14.9rem;
                        }
                    }

                    @media (min-width: 1000px) {
                        .ProfileInfoPane-label {
                            width: 7.2rem;
                        }

                        .ProfileInfoPane-input {
                            width: 35.5rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(2.4, 2.4) translateY(0.05rem);
                            margin: 0 0.6rem 0 1.25rem;
                        }

                        #ProfileInfoPane-visibleSign::after {
                            height: 15.1rem;
                        }
                    }

                    @media (min-width: 1250px) {
                        .ProfileInfoPane-label {
                            width: 8rem;
                        }

                        .ProfileInfoPane-input {
                            width: 43rem;
                            margin-bottom: 0.75rem;
                        }

                        .ProfileInfoPane-visibility {
                            transform: scale(2.5, 2.5) translateY(-0.05rem);
                            margin: 0 0.75rem 0 1.25rem;
                        }

                        #ProfileInfoPane-visibleSign::after {
                            height: 16.7rem;
                        }
                    }

                    @media (min-width: 1500px) {
                        .ProfileInfoPane-label {
                            width: 8.75rem;
                        }

                        .ProfileInfoPane-input {
                            width: 57rem;
                        }

                        #ProfileInfoPane-visibleSign {
                            width: 6rem;
                            transform: translateX(1.55rem) translateY(-1rem);
                        }

                        #ProfileInfoPane-visibleSign::after {
                            height: 17.1rem;
                        }
                    }

                    @media (min-width: 1750px) {
                        .ProfileInfoPane-label {
                            width: 9.5rem;
                        }

                        .ProfileInfoPane-input {
                            width: 60.5rem;
                        }

                        .ProfileInfoPane-visibility {
                            margin: 0 0.9rem 0 1.75rem;
                        }

                        #ProfileInfoPane-visibleSign::after {
                            width: 0.1rem;
                            height: 17.6rem;
                        }
                    }

                    @media (min-width: 2000px) {
                        .ProfileInfoPane-label {
                            width: 10rem;
                        }

                        .ProfileInfoPane-input {
                            width: 59.5rem;
                        }

                        .ProfileInfoPane-visibility {
                            margin: 0 0.95rem 0 2rem;
                        }

                        #ProfileInfoPane-visibleSign::after {
                            height: 17.8rem;
                        }
                    }`
                }</style>
            </div>
        );
    }

    componentDidMount() {
        const rollback = deepCopy(this.props);
        delete rollback.changed;
        delete rollback.rollback;
        delete rollback.packages;
        delete rollback.csrfToken;

        this.props.dispatch(setProfileRollback(rollback));
    }

    handleDateCreatedVisibleChange(e) {
        this.props.dispatch(setProfileDateCreatedVisible(e.target.checked));
    }

    handleNameChange(e) {
        this.props.dispatch(setProfileName(e.target.value));
    }

    handleNameVisibleChange(e) {
        this.props.dispatch(setProfileNameVisible(e.target.checked));
    }

    handleDescriptionChange(e) {
        this.props.dispatch(setProfileDescription(e.target.value));
    }

    handleEmailChange(e) {
        this.props.dispatch(setProfileEmail(e.target.value));
    }

    handleEmailVisibleChange(e) {
        this.props.dispatch(setProfileEmailVisible(e.target.checked));
    }

    handleHomepageChange(e) {
        this.props.dispatch(setProfileHomepage(e.target.value));
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

        this.props.dispatch(setProfileDateStyle(dateStyle));
    }

    handleTimeStyleChange(e) {
        this.props.dispatch(setProfileTimeStyle(e.target.value));
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

function mapStateToProps(state) {
    const rollback = state.profile.rollback;

    const current = deepCopy(state.profile);
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