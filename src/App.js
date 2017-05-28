/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';

import isRunningNodeJs from './modules/isRunningNodeJs';

import {
    setCSRFToken,
} from './appActions';

import { setSearchOptions, } from './panes/search/searchActions';

import {
    setPackagePublishing,
    setPackageEditing,
    setPackageDeleting,
} from './components/PackageOwned/PackageOwnedActions';

/* modules */
import loginRender from './modules/loginRender';
import * as modalFactories from './modules/modals/factories';
import sideBarClick from './modules/navBar/sideBarClick';

/* components */
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { NavBar, } from './components/NavBar/NavBar';

/* css */
import css from './App.css';

/* service worker */
import './modules/offline-install';

export class App extends Component {
    constructor() {
        super();

        this.handleHashChange = this.handleHashChange.bind(this);
    }

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

                <NavBar
                    class="sideBar"
                    panes={sidebarPanes}
                    selectedPane={this.props.sideBarSelectedPane}
                    visible={this.props.sideBarVisible}
                    useRouterLink={false}
                    navBarItemClick={sideBarClick} />
                
                {this.props.children}

                <Footer />

                <div className={"Modal-container" + (this.props.modal ? "" : " hidden")}>
                    {this.props.modal}
                </div>

                <style dangerouslySetInnerHTML={{ __html: css, }}></style>
            </div>
        );
    }

    componentDidMount() {
        const antiCSRFToken = localStorage.twinepmCSRFToken;
        if (antiCSRFToken) {
            this.props.dispatch(setCSRFToken(antiCSRFToken));
            loginRender(this.store, antiCSRFToken, false);
        }

        let searchOptions = localStorage.twinepmSearchOptions; 
        if (searchOptions) {
            try {
                searchOptions = JSON.parse(searchOptions);
                this.props.dispatch(setSearchOptions(searchOptions));
            } catch (e) {
                console.log('There was an entry for saved search options, ' +
                    'but it could not be deserialized.');
            }
        }

        if (!isRunningNodeJs()) {
            window.onhashchange = this.handleHashChange;
        }
    }

    handleHashChange() {
        if (this.props.appSelectedPane === 'about' &&
            location.hash === '#rules')
        {
            modalFactories.rules();
        } else if (this.props.appSelectedPane === 'login' &&
            location.hash === '#createAccount')
        {
            modalFactories.accountCreate();
        } else if (this.props.appSelectedPane === 'profile') {
            if (location.hash === '#deleteAccount') {
                modalFactories.accountDelete();
                return;
            }

            let re = /^#togglePackagePublish-(\d+)$/;
            let match = location.hash.match(re);
            if (match && match[1]) {
                const id = Number(match[1]);
                const packages = this.props.profile.packages;
                const pkg = packages.filter(pkg => pkg.id === id)[0];

                if (!pkg) {
                    console.log(`Could not find package with id: ${id}.`);
                    return;
                }

                this.props.dispatch(setPackagePublishing({
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

                const packages = this.props.profile.packages;
                const pkg = packages.filter(pkg => pkg.id === id)[0];

                if (!pkg) {
                    console.log(`Could not find package with id: ${id}.`);
                    return;
                }
                
                this.props.dispatch(setPackageEditing(pkg));

                modalFactories.packageEdit();

                return;
            }

            re = /^#deletePackage-(\d+)$/;
            match = location.hash.match(re);
            if (match && match[1]) {
                this.props.dispatch(setPackageDeleting(Number(match[1])));

                modalFactories.packageDelete();
                return;
            } else if (location.hash === '#createNewPackage') {
                modalFactories.packageCreate();
                return;
            }
        }
    }
}

function mapStateToProps(state) {
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