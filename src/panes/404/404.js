/* react */
import React, { Component, } from 'react';

/* redux */
import store from '../../store';
import { setSideBarVisible, } from '../../appActions';

/* css */
import './404.css';

export class FourOhFourPane extends Component {
    render() {
        return (
            <div className="FourOhFour paneContainer">
                Sorry, there's nothing here!
            </div>
        );
    }

    componentDidMount() {
        store.dispatch(setSideBarVisible(false));
    }
}

export default FourOhFourPane;