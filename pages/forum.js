/* react */
import React, { Component, } from 'react';

/* next */
import initStore from '../src/store';
import withRedux from 'next-redux-wrapper';

/* redux */
import { connect, } from 'react-redux';
import {
    setAppSelectedPane, 
    setSideBarVisible,
} from '../src/appActions';

/* components */
import App from '../src/App';

/* css */
import css from '../src/panes/forum/forum.css';


export class ForumPage extends Component {
    constructor() {
        super();

        this.forumPath = '';
        this.intervalID = null;
    }

    render() {
        return (
            <div className="Forum paneContainer">
                <iframe
                    id="forumIFrame"
                    src={'https://furkleindustries.com/twinepm/forum/' +
                        this.forumPath}
                    ref={iframe => this.iframe = iframe} />
                <style>{css}</style>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(setSideBarVisible(false));

        window.addEventListener('message', this.receiveMessage);

        if (!localStorage.twinepmCSRFToken) {
            this.intervalID = setInterval(() => {
                this.iframe.contentWindow.postMessage({
                    type: 'tpmClientSignOut',
                }, '*');
            }, 100);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.receiveMessage);
        clearInterval(this.intervalID);
    }

    receiveMessage(message) {
        if (message.data && typeof message.data === 'object') {
            if (message.data.type === 'tpmForumPath' &&
                message.data.href)
            {
                const server = '/twinepm/forum/';
                this.forumPath = message.data.href.slice(server.length);
            } else if (message.data.type === 'tpmForumSignedOut') {
                clearInterval(intervalID);
            }
        }
    }
}

const ConnectedPage = connect()(ForumPage);

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