/* react */
import React, { Component, } from 'react';

/* modules */
import modalClose from '../../modules/modals/close';

/* css */
import css from './Modal.css';

export class Modal extends Component {
    render() {
        return (
            <div className="Modal">
                <button
                    className="Modal-close"
                    onClick={modalClose}>
                    ✖
                </button>

                <div
                    className="Modal-contentContainer">
                    {this.props.content}
                </div>

                <style>{css}</style>
            </div>
        );
    }
}

export default Modal;