/* react */
import React, { Component, } from 'react';

/* modules */
import modalClose from '../../modules/modals/close';

/* css */
/*import css from './Modal.css';*/

export class Modal extends Component {
    constructor() {
        super();

        this.doModalClose = this.doModalClose.bind(this);
    }

    render() {
        let content;
        if (this.props.content) {
            content = React.cloneElement(this.props.content, {
                store: this.props.store,
            });
        }

        return (
            <div className="Modal">
                <button
                    className="Modal-close"
                    onClick={this.doModalClose}>
                    ✖
                </button>

                <div className="Modal-contentContainer">
                    {content}
                </div>

                <style jsx>{
                    `.Modal {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        width: 80%;
                        max-width: 80rem;
                        max-height: 80%;
                        border-radius: 0.67rem;
                        background: rgb(250, 250, 250);
                        z-index: 1;
                        border: 0.1rem solid rgb(128, 128, 128);
                        box-shadow: 0 0 0.2rem black;
                        transform: translate(-50%, -50%);
                        overflow-y: scroll;
                        user-select: text;
                    }

                    .Modal-close {
                        position: absolute;
                        right: 0.1rem;
                        top: -0.225rem;
                        border: none;
                        font-size: 2rem;
                        font-weight: bold;
                        background: none;
                        cursor: pointer;
                    }

                    @media (min-width: 0px) {
                        .Modal-contentContainer {
                            padding: 1.75rem;
                        }

                        .Modal-close {
                            right: 0.15rem;
                            top: 0.2rem;
                            font-size: 0.75rem;
                        }
                    }

                    @media (min-width: 360px) {
                        .Modal-contentContainer {
                            padding: 1.85rem;
                        }

                        .Modal-close {
                            right: 0.15rem;
                            top: 0;
                            font-size: 1rem;
                        }
                    }

                    @media (min-width: 412px) {
                        .Modal-contentContainer {
                            padding: 1.95rem;
                        }

                        .Modal-close {
                            right: 0.15rem;
                            top: 0;
                            font-size: 1.15rem;
                        }
                    }

                    @media (min-width: 768px) {
                        .Modal-contentContainer {
                            padding: 2.05rem;
                        }

                        .Modal-close {
                            right: 0.15rem;
                            top: 0;
                            font-size: 1.75rem;
                        }
                    }

                    @media (min-width: 1024px) {
                        .Modal-contentContainer {
                            padding: 2.15rem;
                        }

                        .Modal-close {
                            right: 0.15rem;
                            top: 0;
                            font-size: 2rem;
                        }
                    }`
                }</style>
            </div>
        );
    }

    doModalClose() {
        modalClose(this.props.store.dispatch);
    }
}

export default Modal;