// React
import React, { Component, } from 'react';

// css
import './HideableMenuItem.css';

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
			</div>
		);
	}
}