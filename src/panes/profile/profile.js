// react
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// redux
import { connect, } from 'react-redux';
import store from '../../store';

import { setSelectedPane, } from '../../appActions';

import {
	setProfile,
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
	setProfileError,
	setProfileRollback,
} from './profileActions';

// components
import PackageOwned from '../../components/PackageOwned/PackageOwned';

// modules
import makeRequest from '../../modules/makeRequest';
import deepCopy from '../../modules/deepCopy';
import unixTimeToSettingsTime from '../../modules/unixTimeToSettingsTime';

// css
import './profile.css';

const baseUrl = process.env.PUBLIC_URL;

class ProfilePane extends Component {
	constructor() {
		super();

		this.updateProfile = this.updateProfile.bind(this);
		this.rollbackProfile = this.rollbackProfile.bind(this);
	}

	render() {
		const opts = {};
		const disabled = {};

		if (!this.props.editing) {
			 opts['readOnly'] = 'readOnly';
			 disabled['disabled'] = 'disabled'; 
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
							Visible
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
								onChange={e => this.setProfileDateCreatedVisible(e.target.checked)}
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
								onChange={e => this.setProfileName(e.target.value)}
								{...opts} />

							<input
								id="Profile-nameVisible"
								className={"Profile-visibility body" + (this.props.editing ? "" : " Profile-readonly")}
								type="checkbox"
								checked={this.props.nameVisible ? "checked" : null}
								onChange={e => this.setProfileNameVisible(e.target.checked)}
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
								onChange={e => this.setProfileDescription(e.target.value)}
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
								onChange={e => this.setProfileEmail(e.target.value)}
								{...opts} />

							<input
								id="Profile-emailVisible"
								className="Profile-visibility body"
								type="checkbox"
								checked={this.props.emailVisible ? "checked" : null}
								onChange={e => this.setProfileEmailVisible(e.target.checked)}
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
								onChange={e => this.setProfileHomepage(e.target.value)}
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
										this.setProfileDateStyle('mmdd');
									} else {
										this.setProfileDateStyle('ddmm');
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
									this.setProfileTimeStyle(e.target.value);
								}}
								{...disabled}>
								<option>12h</option>
								<option>24h</option>
							</select>
						</div>
					</div>

					<button
						className={"Profile-editAccount wideButton" + (this.props.editing ? " Profile-invisible" : "")}
						onClick={() => this.setProfileEditing(true)}>
						<span className="centerHorizontallyAndVerticallyAbsolute">
							Edit Profile Details
						</span>
					</button>

					<div className={"Profile-doubleButtonContainer wideButton" + (this.props.editing ? "" : " Profile-invisible")}>
						<button
							className="Profile-confirmEditAccount wideButton"
							onClick={this.updateProfile}>
							<span>Confirm</span>
						</button>

						<button
							className="Profile-cancelEditAccount wideButton"
							onClick={() => {
								this.rollbackProfile();
								this.setProfileEditing(false)
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

				<hr className="Profile-newSection" />

				<button
					className="Profile-logout wideButton"
					onClick={this.props.appLogout}>
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
	}

	updateProfile() {
		makeRequest({
			method: 'POST',
			url: 'https://furkleindustries.com/twinepm/userdata/',
			withCredentials: true,

			params: {
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
			},

			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
			},
		}).catch(xhr => {
			let error = 'Unknown error updating profile. Please contact ' +
				'webmaster.';
			try {
				const responseObj = JSON.parse(xhr.responseText);
				if (responseObj.error) {
					error = responseObj.error;
				}
			} catch (e) {
				error = 'Unknown error deserializing userdata response ' +
					'object. Please contact webmaster.';
			}

			this.setProfileError(error);

			setTimeout(() => {
				if (this.props.error === error) {
					this.setProfileError('');
				}
			}, 6000);

			return Promise.reject();
		}).then(xhr => {
			try {
				const responseObj = JSON.parse(xhr.responseText);
				if (responseObj.error || responseObj.status !== 200) {
					const error = responseObj.error || 'Unknown error ' +
						'updating profile. Please contact webmaster.';
					this.setProfileError(error);

					setTimeout(() => {
						if (this.props.error === error) {
							this.setProfileError('');
						}
					}, 6000);

					return;
				}
			} catch (e) {
				const error = 'Unknown error deserializing userdata ' +
					'response object. Please contact webmaster.';
				this.setProfileError(error);

				setTimeout(() => {
					if (this.props.error === error) {
						this.setProfileError('');
					}
				}, 6000);

				return;
			}

			const error = 'Profile updated successfully.';
			this.setProfileError(error);

			setTimeout(() => {
				if (this.props.error === error) {
					this.setProfileError('');
				}
			}, 6000);
		});
	}

	rollbackProfile() {
		store.dispatch(setProfile(this.props.rollback));
	}

	setProfileEditing(value) {
		// only save rollback when beginning an edit, not ending
		if (value === true) {
			const profileCopy = deepCopy(store.getState().profile);
			delete profileCopy.rollback;
			store.dispatch(setProfileRollback(profileCopy));
		}

		store.dispatch(setProfileEditing(value));
	}

	setProfileDateCreatedVisible(value) {
		store.dispatch(setProfileDateCreatedVisible(value));
	}

	setProfileName(value) {
		store.dispatch(setProfileName(value));
	}

	setProfileNameVisible(value) {
		store.dispatch(setProfileNameVisible(value));
	}

	setProfileDescription(value) {
		store.dispatch(setProfileDescription(value));
	}

	setProfileEmail(value) {
		store.dispatch(setProfileEmail(value));
	}

	setProfileEmailVisible(value) {
		store.dispatch(setProfileEmailVisible(value));
	}

	setProfileHomepage(value) {
		store.dispatch(setProfileHomepage(value));
	}

	setProfileDateStyle(value) {
		store.dispatch(setProfileDateStyle(value));
	}

	setProfileTimeStyle(value) {
		store.dispatch(setProfileTimeStyle(value));
	}

	setProfileError(value) {
		store.dispatch(setProfileError(value));
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