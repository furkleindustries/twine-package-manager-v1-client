/* react */
import React, { Component, } from 'react';

/* redux */
import store from '../../store';
import { setSideBarVisible, } from '../../appActions';

/* modals */
import RulesModal from '../../modals/RulesModal/RulesModal.js';

/* modules */
import create from '../../modules/modals/create';

/* css */
import css from './about.css';

export class AboutPane extends Component {
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

                <style>{css}</style>
            </div>
        );
    }

    componentDidMount() {
        store.dispatch(setSideBarVisible(false));

        if (location.hash === '#rules') {
            this.modalCreateRules();
        }
    }

    modalCreateRules() {
        create(<RulesModal />);
        location.hash = 'rules';
    }
}

export default AboutPane;