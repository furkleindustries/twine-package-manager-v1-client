/* react */
import React, { Component, } from 'react';

/* css */
import css from './Pane.css';

export default class Pane extends Component {
	render() {
		return (
			<div className={"Pane" + (this.props.visible ? "" : " hidden")}>
				{this.props.content}
                <style>{css}</style>
			</div>
		);
	}
} 