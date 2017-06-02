/* react */
import React, { Component, } from 'react';

/* css */
/*import css from './Pane.css';*/

export default class Pane extends Component {
	render() {
        let content = this.props.content;
        if (content && this.props.store) {
            content = React.cloneElement(this.props.content, {
                store: this.props.store,
            });
        }

		return (
			<div className={"Pane" + (this.props.visible ? "" : " hidden")}>
				{content}
                <style jsx>{
                    ``
                }</style>
			</div>
		);
	}
} 