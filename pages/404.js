/* react */
import React, { Component, } from 'react';

/* next */
import withRedux from 'next-redux-wrapper';

/* redux */
import initStore from '../src/store';
import { connect, } from 'react-redux';
import { setSideBarVisible, } from '../src/appActions';

/* components */
import App from '../src/App';

/* css */
import css from '../src/panes/404/404.css';

export class FourOhFourPage extends Component {
    render() {
        return (
            <div className="FourOhFour paneContainer">
                Sorry, there's nothing here!
                <style>{css}</style>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(setSideBarVisible(false));
    }
}

const ConnectedPage = connect()(FourOhFourPage);

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

export default withRedux(initStore, null, null)(wrapped);