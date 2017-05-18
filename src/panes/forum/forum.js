/* react */
import React, { Component, } from 'react';

/* redux */
import store from '../../store';
import { setSideBarVisible, } from '../../appActions';

/* css */
import './forum.css';

let forumPath = '';
let intervalID;
export class ForumPane extends Component {
    render() {
        return (
            <div className="Forum paneContainer">
                <iframe
                    id="forumIFrame"
                    src={'https://furkleindustries.com/twinepm/forum/' +
                        forumPath}
                    ref={iframe => this.iframe = iframe} />
            </div>
        );
    }

    componentDidMount() {
        store.dispatch(setSideBarVisible(false));

        window.addEventListener('message', this.receiveMessage);

        if (!localStorage.twinepmCSRFToken) {
            intervalID = setInterval(() => {
                this.iframe.contentWindow.postMessage({
                    type: 'tpmClientSignOut',
                }, '*');
            }, 100);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.receiveMessage);
        clearInterval(intervalID);
    }

    receiveMessage(message) {
        if (message.data && typeof message.data === 'object') {
            if (message.data.type === 'tpmForumPath' &&
                message.data.href)
            {
                const server = '/twinepm/forum/';
                forumPath = message.data.href.slice(server.length);
            } else if (message.data.type === 'tpmForumSignedOut') {
                clearInterval(intervalID);
            }
        }
    }
}

export default ForumPane;