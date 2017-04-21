// React
import React, { Component, } from 'react';

// css
import './HideableMenuItem.css';

export default class HideableMenuItem extends React.Component {
	constructor() {
		super();

		this.state = {
			hidden: true,
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
			</div>
		);
	}
}