// react
import React, { Component, } from 'react';
import { browserHistory, } from 'react-router';

// redux
import { connect, } from 'react-redux';
import store from './store';
window.store = store;

import {
	setPanes,
	setSelectedPane,
	setModal,
	setCSRFToken,
} from './appActions';

import {
	setUsername,
	setPassword,
	setLoginError,
} from './panes/login/loginActions';

import {
	setProfile,
} from './panes/profile/profileActions';

import {
	setPackagePublishing,
	setPackageEditing,
	setPackageRemoving,
} from './components/PackageOwned/PackageOwnedActions';

import { setSearchOptions, } from './panes/search/searchActions';

// css
import './App.css';

// modules
import makeRequest from './modules/makeRequest';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';

// modals
import RulesModal from './modals/RulesModal/RulesModal';
import CreateAccountModal from './modals/CreateAccountModal/CreateAccountModal';
import PackagePublishModal from './modals/PackagePublishModal/PackagePublishModal';
import PackageEditModal from './modals/PackageEditModal/PackageEditModal';
import PackageRemoveModal from './modals/PackageRemoveModal/PackageRemoveModal';

const baseUrl = process.env.PUBLIC_URL;

class App extends Component {
	constructor() {
		super();

		this.appLogin = this.appLogin.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.appLogout = this.appLogout.bind(this);
		this.navBarItemClick = this.navBarItemClick.bind(this);
		this.togglePackagePublish = this.togglePackagePublish.bind(this);
		this.editPackage = this.editPackage.bind(this);
		this.removePackage = this.removePackage.bind(this);
		this.createModal = this.createModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.removeListenerAndCloseModal =
			this.removeListenerAndCloseModal.bind(this);

		window.onhashchange = () => {
			if (this.props.selectedPane === 'about' &&
				location.hash === '#rules')
			{
				this.createModal(<RulesModal />);
			} else if (this.props.selectedPane === 'login' &&
				location.hash === '#register')
			{
				this.createModal(<CreateAccountModal />);
			} else if (this.props.selectedPane === 'profile') {
				let re = /^#togglePackagePublish-(\d+)$/;
				let match = location.hash.match(re);
				if (match && match[1] && this.props.id === Number(match[1])) {
					const id = Number(match[1]);
					const pkg = this.props.profile.packages.filter(pkg => {
						return pkg.id === id;
					})[0];

					if (!pkg) {
						console.log('Could not find package with id ' + id
							+ '.');
						return;
					}

					this.togglePackagePublish(id, pkg.published);
				}

				re = /^#editPackage-(\d+)$/;
				match = location.hash.match(re);
				if (match && match[1] && this.props.id === Number(match[1])) {
					this.editPackage(Number(match[1]));
				}

				re = /^#removePackage-(\d+)$/;
				match = location.hash.match(re);
				if (match && match[1] && this.props.id === Number(match[1])) {
					this.removePackage(Number(match[1]));
				}
			}
		};
	}

	render() {
		const id = this.props.selectedPane;
	
		let child = React.cloneElement(this.props.children, {
			appLogin: this.appLogin,
			appLogout: this.appLogout,
			createModal: this.createModal,
			closeModal: this.closeModal,
			togglePackagePublish: this.togglePackagePublish,
			editPackage: this.editPackage,
			removePackage: this.removePackage,
		});

		const backgroundStyle = (this.props.panes[id] || {}).style;

		return (
      		<div className="App">
	        	<div className="App-backgroundColor"></div>
	        	<div className="App-backgroundImage" style={backgroundStyle}></div>

	        	<Header
	        		panes={this.props.panes}
	        		selectedPane={this.props.selectedPane}
	        		navBarItemClick={this.navBarItemClick} />

	        	{child}

				<Footer />

	        	<div className={"Modal-container" + (this.props.modal ? "" : " hidden")}>
	        		{this.props.modal}
	        	</div>
      		</div>
    	);
	}

	componentDidMount() {
		if (localStorage.twinepmCSRFToken) {
			store.dispatch(setCSRFToken(localStorage.twinepmCSRFToken));
			this.renderLogin();
		}

		if (localStorage.twinepmSearchOptions) {
			let searchOptions;
			try {
				searchOptions = JSON.parse(localStorage.twinepmSearchOptions);
			} catch (e) {
				console.log('There was an entry for saved search options, ' +
					'but it could not be deserialized.');
				return;
			}

			store.dispatch(setSearchOptions(searchOptions));
		}
	}

	appLogin() {
		makeRequest({
			method: 'POST',
			url: 'https://furkleindustries.com/twinepm/login/login.php',
			withCredentials: true,
			
			params: {
				username: this.props.username,
				password: this.props.password,
			},

			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
			},
		}).catch(xhr => {
			try {
				const responseObj = JSON.parse(xhr.responseText);
				store.dispatch(setLoginError(responseObj.error || 'Unknown error.'));

				setTimeout(() => {
					const loginError = this.props.loginError;
					if (loginError === responseObj.error ||
						loginError === 'Unknown error')
					{
						store.dispatch(setLoginError(''));
					}
				}, 6000);
			} catch (err) {
				store.dispatch(setLoginError('Unknown error.'));

				setTimeout(() => {
					if (this.props.loginError === 'Unknown error.') {
						store.dispatch(setLoginError(''));
					}
				}, 6000);
			}

			// don't allow execution to continue
			return Promise.reject();
		}).then(xhr => {
			try {
				const responseObj = JSON.parse(xhr.responseText);

				store.dispatch(setCSRFToken(responseObj.csrfToken));

				localStorage.twinepmCSRFToken = responseObj.csrfToken;
			} catch (e) {
				const message = 'Error deserializing anti-CSRF token. ' +
					e.message;
				store.dispatch(setLoginError(message));

				setTimeout(() => {
					if (this.props.loginError === message) {
						store.dispatch(setLoginError(''));
					}
				}, 6000);
			}

			this.renderLogin(true);
		});
	}

	renderLogin(gotoProfile) {
		this.getProfile().catch(xhr => {
			delete localStorage.twinepmCSRFToken;

			// don't allow execution to continue
			return Promise.reject();
		}).then(xhr => {
			try {
				const responseObj = JSON.parse(xhr.responseText);

				const panesCopy = JSON.parse(JSON.stringify(this.props.panes));
				panesCopy.login.visible = false;
				panesCopy.profile.visible = true;
				store.dispatch(setPanes(panesCopy));

				if (responseObj.error || responseObj.status !== 200) {
					console.log('When getting the profile, a JSON object ' +
						'containing an error was received. ' +
						responseObj.error);
					return;
				}

				store.dispatch(setProfile(responseObj.userdata));
				
				// delete username and password for security reasons
				store.dispatch(setUsername(''));
				store.dispatch(setPassword(''));

				// redirect to the profile page
				if (gotoProfile) {
					store.dispatch(setSelectedPane('profile'));
					browserHistory.push(baseUrl + '/profile');
				}
			} catch (e) {
				console.log('Couldn\'t deserialize profile. ' + e.message);
				return Promise.reject();
			}
		});
	}

	getProfile() {
		return makeRequest({
			method: 'GET',
			url: 'https://furkleindustries.com/twinepm/userdata/?csrfToken=' +
				localStorage.twinepmCSRFToken,
			withCredentials: true,
		});
	}

	appLogout() {
		const panesCopy = JSON.parse(JSON.stringify(this.props.panes));
		panesCopy.login.visible = true;
		panesCopy.profile.visible = false;

		store.dispatch(setPanes(panesCopy));

		store.dispatch(setProfile({}));
		store.dispatch(setCSRFToken(null));

		delete localStorage.twinepmCSRFToken;

		store.dispatch(setSelectedPane('login'));

		// redirect to the login page
		browserHistory.push(baseUrl + '/login');
	}

	navBarItemClick(id) {
		store.dispatch(setSelectedPane(id));
	}

	togglePackagePublish(id, currentState) {
		location.hash = 'togglePackagePublish-' + id;

		store.dispatch(setPackagePublishing({
			id,
			published: currentState,
		}));

		this.createModal(<PackagePublishModal />);
	}

	editPackage(id) {
		const packages = this.props.profile.packages;
		const pkg = packages.filter(pkg => pkg.id === id)[0];

		if (!pkg) {
			console.log('Could not find package with id ' + id);
			return;
		}

		location.hash = 'editPackage-' + pkg.id;
		
		store.dispatch(setPackageEditing(pkg));
		
		this.createModal(<PackageEditModal />);
	}

	removePackage(id) {
		location.hash = 'removePackage-' + id;

		store.dispatch(setPackageRemoving({ id }));
		
		this.createModal(<PackageRemoveModal />);
	}

	createModal(content) {
		const modal = <Modal content={content} closeModal={this.closeModal} />;
		store.dispatch(setModal(modal));

		setTimeout(() => {
			document.querySelector('.Modal-container').style.opacity = 1;
		});

		document.body.addEventListener(
			'keydown',
			this.removeListenerAndCloseModal,
			false);

		document.body.addEventListener(
			'click',
			this.removeListenerAndCloseModal,
			false);
	}

	closeModal(content) {
		document.querySelector('.Modal-container').style.opacity = 0;

		setTimeout(() => {
			location.hash = '';

			store.dispatch(setModal(null));

			document.body.removeEventListener(
				'keydown',
				this.removeListenerAndCloseModal,
				false);
			document.body.removeEventListener(
				'click',
				this.removeListenerAndCloseModal,
				false);
		}, 330);
	}

	removeListenerAndCloseModal(e, override) {
		const remove = () => {
			document.body.removeEventListener(
				'keydown',
				this.removeListenerAndCloseModal,
				false);
			document.body.removeEventListener(
				'click',
				this.removeListenerAndCloseModal,
				false);
			this.closeModal();
		};

		if (override === 'override') {
			remove();
		} else if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				remove();
			}	
		} else if (e.type === 'click') {
			const modalNode = document.querySelector('.Modal');
			if (e.target !== modalNode && !modalNode.contains(e.target)) {	
				remove();
			}
		}
	};
}

function mapStateToProps() {
	const state = store.getState();

	return {
		panes: state.panes,
		selectedPane: state.selectedPane,
		profile: state.profile,
		profileEditing: state.profileEditing,
		username: state.username,
		password: state.password,
		csrfToken: state.csrfToken,
		modal: state.modal,
	};
}

export default connect(mapStateToProps)(App);
