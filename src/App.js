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
import { setSearchOptions } from './panes/search/searchActions';

// modules
import renderLogin from './modules/renderLogin';
import createModal from './modules/modalCreate';
import modalCreateEditPackage from './modules/modalCreateEditPackage';
import modalCreateRemovePackage from './modules/modalCreateRemovePackage';
import modalCreateTogglePackagePublish from './modules/modalCreateTogglePackagePublish';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// modals
import RulesModal from './modals/RulesModal/RulesModal';
import CreateAccountModal from './modals/CreateAccountModal/CreateAccountModal';

// css
import './App.css';

export class App extends Component {
    render() {
        const id = this.props.selectedPane;

        const panes = this.props.panes || {};
        const backgroundStyle = (panes[id] || {}).style;

        return (
            <div className="App">
                <div className="App-backgroundColor"></div>
                <div className="App-backgroundImage" style={backgroundStyle}></div>

                <Header
                    panes={this.props.panes}
                    selectedPane={this.props.selectedPane}
                    navBarItemClick={this.navBarItemClick} />

                {this.props.children}

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
            renderLogin();
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

        window.onhashchange = () => {
            if (this.props.selectedPane === 'about' &&
                location.hash === '#rules')
            {
                createModal(<RulesModal />);
            } else if (this.props.selectedPane === 'login' &&
                location.hash === '#createAccount')
            {
                createModal(<CreateAccountModal />);
            } else if (this.props.selectedPane === 'profile') {
                let re = /^#togglePackagePublish-(\d+)$/;
                let match = location.hash.match(re);
                if (match && match[1]) {
                    modalCreateTogglePackagePublish(Number(match[1]));
                }

                re = /^#editPackage-(\d+)$/;
                match = location.hash.match(re);
                if (match && match[1]) {
                    modalCreateEditPackage(Number(match[1]));
                }

                re = /^#removePackage-(\d+)$/;
                match = location.hash.match(re);
                if (match && match[1]) {
                    modalCreateRemovePackage(Number(match[1]));
                }
            }
        };
    }
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