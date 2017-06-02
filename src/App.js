/* react */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';

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
import NavBar from './components/NavBar/NavBar';

/* css */
/*import css from './App.css';*/

/* service worker */
import registerServiceWorker from './modules/offline-install';
registerServiceWorker();

export class App extends Component {
    constructor() {
        super();

        this.handleHashChange = this.handleHashChange.bind(this);
    }

    static contextTypes = {
        store: PropTypes.object,
    };

    render() {
        const store = this.context.store;

        const id = this.props.appSelectedPane;

        const appPanes = this.props.appPanes || {};
        const backgroundStyle = (appPanes[id] || {}).backgroundStyle;

        const sidebarPanes = this.props.sideBarPanes || {};

        let children;
        if (this.props.children) {
            children = React.cloneElement(this.props.children, { store, });
        }

        let modal;
        if (this.props.modal) {
            modal = React.cloneElement(this.props.modal, { store, });
        }

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
                
                {children}

                <Footer />

                <div className={"Modal-container" + (this.props.modal ? "" : " hidden")}>
                    {modal}
                </div>

                <style jsx global>{
                    `html,
                    body,
                    #root,
                    .App {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        font-family: 'Lato', 'Helvetica', sans-serif;
                    }

                    .App {
                        text-align: center;
                    }

                    .App-backgroundColor {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: rgb(255, 252, 252);
                        pointer-events: none;
                        z-index: -1;
                    }

                    .App-backgroundImage {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        pointer-events: none;
                        z-index: -1;
                    }

                    .paneContainer {
                        position: absolute;
                        left: 50%;
                        width: 80%;
                        max-width: 60rem;
                        bottom: 0;
                        padding: 2rem 1rem 1rem 1rem;
                        box-sizing: border-box;
                        background: rgba(255, 252, 252, 0.75);
                        overflow-x: hidden;
                        overflow-y: scroll;
                        -webkit-transform: translateX(-50%);
                        -moz-transform: translateX(-50%);
                        -o-transform: translateX(-50%);
                        transform: translateX(-50%);
                    }

                    .sideBar {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 10%;
                        border-left: 0.1rem solid rgba(0, 0, 0, 0.25);
                        background: rgba(255, 255, 255, 0.9);
                        font-family: Helvetica;
                    }

                    .sideBar .NavBarItem {
                        display: block;
                        width: 100%;
                        height: 1.5rem;
                        margin: -0.1rem auto auto auto;
                        border: 0;
                        border-top: 0.1rem solid rgba(25, 25, 25, 0.5);
                        border-bottom: 0.1rem solid rgba(25, 25, 25, 0.5);
                        color: black;
                        text-decoration: none;
                        background: transparent;
                        cursor: pointer;
                    }

                    .sideBar .NavBarItem:first-of-type {
                        margin-top: 1rem;
                    }

                    .sideBar .NavBarItem:not(.active):active,
                    .sideBar .NavBarItem:not(.active):hover {
                        border-radius: 0;
                        color: white;
                    }

                    .sideBar .NavBarItem.active {
                        border-radius: 0;
                        background: rgb(200, 0, 0);
                        color: rgb(250, 250, 250);
                        text-shadow: 0;
                    }

                    .Modal-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(50, 50, 50, 0.8275);
                        z-index: 1;
                        opacity: 0;
                        transition: 0.33s opacity;
                    }

                    .Modal-container.hidden {
                        display: none;
                    }

                    .header {
                        font-size: 200%;
                    }

                    .header:first-of-type {
                        margin-top: 0;
                    }

                    .subheader {
                        font-size: 140%;
                    }

                    .body {
                        font-size: 100%;
                    }

                    .footer {
                        font-size: 67%;
                    }

                    .footer:last-of-type {
                        margin-bottom: 0;
                    }

                    .wideButton {
                        display: block;
                        position: relative;
                        padding: 0.33rem;
                        margin-left: auto;
                        margin-right: auto;
                        border: 0.1rem solid rgb(200, 200, 200);
                        border-radius: 0.67rem;
                        color: rgb(245, 245, 245);
                        background: rgb(185, 0, 0);
                        cursor: pointer;
                    }

                    .wideButton span {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }

                    .wideButton:hover,
                    .wideButton:active {
                        background: rgb(200, 0, 0);
                    }

                    @media (min-width: 0px) {
                        .paneContainer,
                        .sideBar {
                            top: 1.5rem;
                            bottom: 2rem;
                        }

                        .sideBar .NavBarItem {
                            font-size: 20%;
                        }

                        .paneContainer {
                            padding-top: 0.9rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 0.33rem;
                        }

                        .wideButton {
                            width: 5.5rem;
                            height: 1rem;
                            margin-top: 0.25rem;
                            margin-bottom: 0.25rem;
                            font-size: 100%;
                        }
                    }

                    @media (min-width: 250px) {
                        .paneContainer,
                        .sideBar {
                            top: 1.5rem;
                            bottom: 1.75rem;
                        }

                        .sideBar .NavBarItem {
                            font-size: 25%;
                        }

                        .paneContainer {
                            padding-top: 0.95rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 0.48rem;
                        }

                        .wideButton {
                            width: 8rem;
                            height: 1.15rem;
                            margin-top: 0.3rem;
                            margin-bottom: 0.3rem;
                            font-size: 115%;
                        }
                    }

                    @media (min-width: 300px) {
                        .paneContainer,
                        .sideBar {
                            top: 1.5rem;
                            bottom: 1.8rem;
                        }

                        .sideBar .NavBarItem {
                            font-size: 35%;
                        }

                        .paneContainer {
                            padding-top: 1rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 0.625rem;
                        }

                        .wideButton {
                            width: 10.5rem;
                            height: 1.35rem;
                            margin-top: 0.35rem;
                            margin-bottom: 0.35rem;
                            font-size: 112%;
                        }
                    }

                    @media (min-width: 350px) {
                        .paneContainer,
                        .sideBar {
                            top: 1.75rem;
                            bottom: 2.5rem;
                        }

                        .paneContainer {
                            padding-top: 1.05rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 0.8rem;
                        }

                        .wideButton {
                            width: 13.25rem;
                            height: 1.65rem;
                            margin-top: 0.4rem;
                            margin-bottom: 0.4rem;
                            font-size: 107.5%;
                        }
                    }

                    @media (min-width: 400px) {
                        .paneContainer,
                        .sideBar {
                            top: 2rem;
                            bottom: 2.25rem;
                        }

                        .paneContainer {
                            padding-top: 1.1rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 0.85rem;
                        }

                        .wideButton {
                            width: 16.5rem;
                            height: 1.85rem;
                            margin-top: 0.45rem;
                            margin-bottom: 0.45rem;
                            font-size: 107.5%;
                        }
                    }

                    @media (min-width: 450px) {
                        .paneContainer,
                        .sideBar {
                            top: 2.25rem;
                            bottom: 2.35rem;
                        }

                        .paneContainer {
                            padding-top: 1.15rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 0.9rem;
                        }

                        .wideButton {
                            width: 17.5rem;
                            height: 2.25rem;
                            margin-top: 0.5rem;
                            margin-bottom: 0.5rem;
                            font-size: 110%;
                        }
                    }

                    @media (min-width: 500px) {
                        .paneContainer,
                        .sideBar {
                            top: 2.5rem;
                            bottom: 2.45rem;
                        }

                        .paneContainer {
                            padding-top: 1.2rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 0.95rem;
                        }

                        .wideButton {
                            width: 18.75rem;
                            height: 2.5rem;
                            margin-top: 0.55rem;
                            margin-bottom: 0.55rem;
                            font-size: 107.5%;
                        }
                    }

                    @media (min-width: 550px) {
                        .paneContainer,
                        .sideBar {
                            top: 2.75rem;
                            bottom: 2.55rem;
                        }

                        .paneContainer {
                            padding-top: 1.25rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 1rem;
                        }

                        .wideButton {
                            width: 19.5rem;
                            height: 2.75rem;
                            margin-top: 0.6rem;
                            margin-bottom: 0.6rem;
                            font-size: 107.5%;
                        }
                    }

                    @media (min-width: 750px) {
                        .paneContainer,
                        .sideBar {
                            top: 3rem;
                            bottom: 2.65rem;
                        }

                        .paneContainer {
                            padding-top: 1.55rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 1.05rem;
                        }

                        .wideButton {
                            width: 20.5rem;
                            height: 3rem;
                            margin-top: 0.65rem;
                            margin-bottom: 0.65rem;
                            font-size: 107.5%;
                        }
                    }

                    @media (min-width: 1000px) {
                        .paneContainer,
                        .sideBar {
                            top: 3.25rem;
                            bottom: 3rem;
                        }

                        .paneContainer {
                            padding-top: 1.85rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 1.1rem;
                        }

                        .wideButton {
                            width: 21.33rem;
                        }
                    }

                    @media (min-width: 1250px) {
                        .paneContainer,
                        .sideBar {
                            top: 3.5rem;
                            bottom: 3rem;
                        }

                        .paneContainer {
                            padding: 1.85rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 1.2rem;
                        }

                        .wideButton {
                            width: 23.5rem;
                        }
                    }

                    @media (min-width: 1500px) {
                        .paneContainer,
                        .sideBar {
                            top: 3.75rem;
                            bottom: 3rem;
                        }

                        .paneContainer {
                            max-width: 80rem;
                            padding: 2.25rem 2rem 2rem 2rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 1.3rem;
                        }

                        .wideButton {
                            width: 25rem;
                        }
                    }

                    @media (min-width: 1750px) {
                        .paneContainer,
                        .sideBar {
                            top: 4rem;
                            bottom: 3rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 1.4rem;
                        }

                        .wideButton {
                            width: 27.5rem;
                        }
                    }

                    @media (min-width: 2000px) {
                        .paneContainer,
                        .sideBar {
                            top: 4.25rem;
                            bottom: 3rem;
                        }

                        .paneContainer,
                        .Modal {
                            font-size: 1.475rem;
                        }

                        .wideButton {
                            width: 30rem;
                        }
                    }

                    .centerHorizontallyRelative {
                        position: relative;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .centerVerticallyRelative {
                        position: relative;
                        margin-top: auto;
                        margin-bottom: auto;
                    }

                    .centerHorizontallyAndVerticallyRelative {
                        position: relative;
                        margin: auto;
                    }

                    .centerHorizontallyAbsolute {
                        position: absolute;
                        left: 50%;
                        -webkit-transform: translateX(-50%);
                        -moz-transform: translateX(-50%);
                        -o-transform: translateX(-50%);
                        transform: translateX(-50%);
                    }

                    .centerVerticallyAbsolute {
                        position: absolute;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        -moz-transform: translateY(-50%);
                        -o-transform: translateY(-50%);
                        transform: translateY(-50%);   
                    }

                    .centerHorizontallyAndVerticallyAbsolute {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        -webkit-transform: translate(-50%, -50%);
                        -moz-transform: translate(-50%, -50%);
                        -o-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);   
                    }

                    .hidden {
                        display: none !important;
                    }

                    .disabled {
                        opacity: 0.5;
                        pointer-events: none;
                    }`
                }</style>
            </div>
        );
    }

    componentDidMount() {
        const antiCSRFToken = localStorage.twinepmCSRFToken;
        if (antiCSRFToken) {
            this.props.dispatch(setCSRFToken(antiCSRFToken));
            loginRender(this.context.store, antiCSRFToken, false);
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
            modalFactories.rules(this.props.dispatch);
        } else if (this.props.appSelectedPane === 'login' &&
            location.hash === '#createAccount')
        {
            modalFactories.accountCreate(this.props.dispatch);
        } else if (this.props.appSelectedPane === 'profile') {
            if (location.hash === '#deleteAccount') {
                modalFactories.accountDelete(this.props.dispatch);
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

                modalFactories.togglePackagePublish(
                    this.props.dispatch,
                    id);
                
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

                modalFactories.packageEdit(this.props.dispatch, id);

                return;
            }

            re = /^#deletePackage-(\d+)$/;
            match = location.hash.match(re);
            if (match && match[1]) {
                const id = Number(match[1]);
                this.props.dispatch(setPackageDeleting(id));

                modalFactories.packageDelete(this.props.dispatch, id);
                return;
            } else if (location.hash === '#createNewPackage') {
                modalFactories.packageCreate(this.props.dispatch);
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