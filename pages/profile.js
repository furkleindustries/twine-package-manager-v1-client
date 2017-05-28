/* react */
import React, { Component, } from 'react';
import { browserHistory, } from 'react-router';

/* next */
import withRedux from 'next-redux-wrapper';

/* redux */
import initStore from '../src/store';
import { connect, } from 'react-redux';
import {
    setAppSelectedPane,
    setSideBarVisible,
    setSideBarPanes,
    setSideBarSelectedPane,
} from '../src/appActions';

/* components */
import PaneControl from '../src/components/PaneControl/PaneControl';

/* modules */
import * as modalFactories from '../src/modules/modals/factories';

/* components */
import App from '../src/App';

/* css */
import css from '../src/panes/profile/profile.css';

/* sidebar pane metadata */
import panesSourceProfile from '../src/panesSourceProfile'; 

const baseUrl = process.env.PUBLIC_URL;

export class ProfilePage extends Component {
    render() {
        return (
            <div className="Profile paneContainer">
                <PaneControl
                    panes={panesSourceProfile}
                    selectedPane={this.props.selectedPane || 'info'} />
                <style>{css}</style>
            </div>
        );
    }

    componentDidMount() {
        if (!localStorage.twinepmCSRFToken) {
            this.props.dispatch(setAppSelectedPane('login'));
            browserHistory.push(baseUrl + '/login');
            return;
        }

        this.props.dispatch(setSideBarVisible(true));
        this.props.dispatch(setSideBarPanes(panesSourceProfile));

        const pane = localStorage.twinepmProfileLocation || 'info';
        this.props.dispatch(setSideBarSelectedPane(pane));

        if (location.hash === '#deleteAccount') {
            modalFactories.accountDelete();
        } else if (location.hash === '#createNewPackage') {
            modalFactories.packageCreate();
        }
    }
}

function mapStateToProps(state) {    
    return {
        ...state.profile,
        selectedPane: state.sideBarSelectedPane,
    };
}

const ConnectedPage = connect()(ProfilePage);

const wrapped = () => (
    <App>
        <ConnectedPage />
    </App>
);

wrapped.getInitialProps = ({ req, store }) => {
    if (req) {
        store.dispatch(setAppSelectedPane(req.url.slice(1)));
    }
};

export default withRedux(initStore, mapStateToProps, null)(wrapped);