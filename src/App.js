// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from './store';
// REMOVE IN PRODUCTION
window.store = store;

import {
    setCSRFToken,
} from './appActions';

import { setSearchOptions, } from './panes/search/searchActions';

import {
    setPackagePublishing,
    setPackageEditing,
    setPackageDeleting,
} from './components/PackageOwned/PackageOwnedActions';

// modules
import loginRender from './modules/loginRender';
import * as modalFactories from './modules/modals/factories';
import sideBarClick from './modules/navBar/sideBarClick';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { NavBar, } from './components/NavBar/NavBar';

// css
import './App.css';

export class App extends Component {
    render() {
        const id = this.props.appSelectedPane;

        const appPanes = this.props.appPanes || {};
        const backgroundStyle = (appPanes[id] || {}).backgroundStyle;

        const sidebarPanes = this.props.sideBarPanes || {};

        return (
            <div className="App">
                <div className="App-backgroundColor"></div>
                
                <div
                    className="App-backgroundImage"
                    style={backgroundStyle}></div>

                <Header />

                {this.props.children}

                <NavBar
                    class="sideBar"
                    panes={sidebarPanes}
                    selectedPane={this.props.sideBarSelectedPane}
                    visible={this.props.sideBarVisible}
                    useRouterLink={false}
                    navBarItemClick={sideBarClick} />

                <Footer />

                <div className={"Modal-container" + (this.props.modal ? "" : " hidden")}>
                    {this.props.modal}
                </div>
            </div>
        );
    }

    componentDidMount() {
        const antiCSRFToken = localStorage.twinepmCSRFToken;
        if (antiCSRFToken) {
            store.dispatch(setCSRFToken(antiCSRFToken));
            loginRender(antiCSRFToken, false);
        }

        let searchOptions = localStorage.twinepmSearchOptions; 
        if (searchOptions) {
            try {
                searchOptions = JSON.parse(searchOptions);
                store.dispatch(setSearchOptions(searchOptions));
            } catch (e) {
                console.log('There was an entry for saved search options, ' +
                    'but it could not be deserialized.');
            }
        }

        window.onhashchange = () => {
            if (this.props.selectedPane === 'about' &&
                location.hash === '#rules')
            {
                modalFactories.rules();
            } else if (this.props.selectedPane === 'login' &&
                location.hash === '#createAccount')
            {
                modalFactories.accountCreate();
            } else if (this.props.selectedPane === 'profile') {
                if (location.hash === '#deleteAccount') {
                    modalFactories.accountDelete();
                    return;
                }

                let re = /^#togglePackagePublish-(\d+)$/;
                let match = location.hash.match(re);
                if (match && match[1]) {
                    const id = Number(match[1]);
                    const packages = store.getState().profile.packages;
                    const pkg = packages.filter(pkg => pkg.id === id)[0];

                    if (!pkg) {
                        console.log(`Could not find package with id: ${id}.`);
                        return;
                    }

                    store.dispatch(setPackagePublishing({
                        id: pkg.id,
                        published: pkg.published,
                    }));

                    modalFactories.togglePackagePublish(Number(match[1]));
                    
                    return;
                }

                re = /^#editPackage-(\d+)$/;
                match = location.hash.match(re);
                if (match && match[1]) {
                    const id = Number(match[1]);

                    const state = store.getState();
                    const packages = state.profile.packages;
                    const pkg = packages.filter(pkg => pkg.id === id)[0];

                    if (!pkg) {
                        return;
                    }
                    
                    store.dispatch(setPackageEditing(pkg));

                    modalFactories.packageEdit();

                    return;
                }

                re = /^#deletePackage-(\d+)$/;
                match = location.hash.match(re);
                if (match && match[1]) {
                    store.dispatch(setPackageDeleting(Number(match[1])));

                    modalFactories.packageDelete();
                    return;
                }

                if (location.hash === '#createNewPackage') {
                    modalFactories.packageCreate();
                    return;
                }
            }
        };
    }
}

function mapStateToProps() {
    const state = store.getState();

    return {
        appPanes: state.appPanes,
        appSelectedPane: state.appSelectedPane,
        sideBarVisible: state.sideBarVisible,
        sideBarPanes: state.sideBarPanes,
        sideBarSelectedPane: state.sideBarSelectedPane,
        profile: state.profile,
        profileEditing: state.profileEditing,
        username: state.username,
        password: state.password,
        csrfToken: state.csrfToken,
        modal: state.modal,
    };
}

export default connect(mapStateToProps)(App);