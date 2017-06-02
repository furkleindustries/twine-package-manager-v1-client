/* react */
import React, { Component, } from 'react';

/* next */
import withRedux from 'next-redux-wrapper';

/* redux */
import initStore from '../src/store';
import { connect, } from 'react-redux';
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../src/appActions';

/* modals */
import RulesModal from '../src/modals/RulesModal/RulesModal.js';

/* modules */
import create from '../src/modules/modals/create';

/* components */
import App from '../src/App';

/* css */
/*import css from '../src/panes/about/about.css';*/

export class AboutPage extends Component {
    render() {
        return (
            <div className="About paneContainer">
                <p className="About-opener subheader">
                    A package manager made specifically for Twine.
                </p>

                <p className="body">
                    Features macros for Sugarcane, Sugarcube, Harlowe, and Gately.
                </p>

                <button
                    className="wideButton"
                    onClick={this.modalCreateRules}>
                    <span>Rules</span>
                </button>
                
                <p className="About-attribution body">
                    A Furkle Industries production.
                </p>

                <style jsx>{
                    ``
                }</style>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(setSideBarVisible(false));

        if (location.hash === '#rules') {
            this.modalCreateRules();
        }
    }

    modalCreateRules() {
        create(<RulesModal />);
        location.hash = 'rules';
    }
}

const ConnectedPage = connect()(AboutPage);

const wrapped = () => (
    <App>
        <ConnectedPage />
    </App>
);

export async function getInitialProps({ req, store, }) {
    /* req only exists on server side */
    if (req) {
        store.dispatch(setAppSelectedPane(req.url.slice(1)));
    }
}

wrapped.getInitialProps = getInitialProps;

export default withRedux(initStore, null, null)(wrapped);