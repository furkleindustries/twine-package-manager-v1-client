/* react */
import React, { Component, } from 'react';
import { browserHistory, } from 'react-router';

/* redux */
import { connect, } from 'react-redux';
import store from '../../store';

/* actions */
import {
    setAppSelectedPane,
    setSideBarVisible,
    setSideBarPanes,
    setSideBarSelectedPane,
} from '../../appActions';

/* components */
import PaneControl from '../../components/PaneControl/PaneControl';

/* modules */
import * as modalFactories from '../../modules/modals/factories';

/* css */
import css from './profile.css';

/* sidebar pane metadata */
import panesSourceProfile from '../../panesSourceProfile'; 

const baseUrl = process.env.PUBLIC_URL;

export class ProfilePane extends Component {
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
            store.dispatch(setAppSelectedPane('login'));
            browserHistory.push(baseUrl + '/login');
            return;
        }

        store.dispatch(setSideBarVisible(true));
        store.dispatch(setSideBarPanes(panesSourceProfile));

        const pane = localStorage.twinepmProfileLocation || 'info';
        store.dispatch(setSideBarSelectedPane(pane));

        if (location.hash === '#deleteAccount') {
            modalFactories.accountDelete();
        } else if (location.hash === '#createNewPackage') {
            modalFactories.packageCreate();
        }
    }
}

function mapStateToProps() {
    const state = store.getState();
    
    return {
        ...state.profile,
        selectedPane: state.sideBarSelectedPane,
    };
}

export default connect(mapStateToProps)(ProfilePane);