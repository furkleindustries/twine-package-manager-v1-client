/* react */
import React, { Component, } from 'react';

/* components */
import Pane from '../Pane/Pane';

/* css */
/*import css from './PaneControl.css';*/

export default class PaneControl extends Component {
    render() {
        let list = [];

        if (this.props.panes) {
            list = Object.keys(this.props.panes).map(name => {
                    let pane = (
                        <Pane
                            key={name}
                            visible={this.props.selectedPane === name}
                            content={this.props.panes[name].content} />
                    );

                    if (this.props.store) {
                        pane = React.cloneElement(pane, {
                            store: this.props.store,
                        });
                    }

                    return pane;
            });
        }

        const className = "PaneControl" +
                (this.props.class ? ` ${this.props.class}` : "");
        return (
            <div className={className}>
                {list}
                <style jsx>{
                    `.PaneControl {
                        width: 100%;
                        overflow-x: hidden;
                    }`
                }</style>
            </div>
        );
    }
}
