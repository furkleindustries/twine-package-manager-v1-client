/* React */
import React, { Component, } from 'react';

/* css */
/*import css from './HideableMenuItem.css';*/

export default class HideableMenuItem extends Component {
    constructor(props) {
        super(props);

        let hidden = this.props.hiddenDefault;
        if (typeof hidden === 'undefined') {
            hidden = true;
        }

        this.state = {
            hidden,
        };
    }

    render() {
        return (
            <div className="HideableMenuItem">
                <label
                    className="HideableMenuItem-title"
                    onClick={() => this.setState({ hidden: !this.state.hidden })}>
                    {this.props.title}
                </label>

                <button
                    className="HideableMenuItem-button"
                    onClick={() => this.setState({ hidden: !this.state.hidden })}>
                    {this.state.hidden ? '◀' : '▼'}
                </button>

                <div className={"HideableMenuItem-container" + (this.state.hidden ? " hidden" : "")}>
                    {this.props.content}
                </div>

                <style jsx>{
                    `.HideableMenuItem {
                        position: relative;
                        width: 100%;
                    }

                    .HideableMenuItem-title {
                        font-size: 100%;
                        font-weight: bold;
                    }

                    .HideableMenuItem-button {
                        float: right;
                        border: 0;
                        background: transparent;
                        cursor: pointer;
                    }

                    .HideableMenuItem-container {
                        margin: 1rem;
                    }`
                }</style>
            </div>
        );
    }
}