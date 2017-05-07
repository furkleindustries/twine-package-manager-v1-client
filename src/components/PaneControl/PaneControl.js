// react
import React, { Component } from 'react';

// components
import Pane from '../Pane/Pane';

// css
import './PaneControl.css';

export default class PaneControl extends Component {
	render() {
		let list = [];

		if (this.props.panes) {
			list = Object.getOwnPropertyNames(this.props.panes).map(name => {
					return (
						<Pane
							key={name}
							visible={this.props.selectedPane === name}
							content={this.props.panes[name].content} />
					);
			});
		}

		return (
			<div className={"PaneControl" +
				(this.props.class ? " " + this.props.class : "")}>
				{list}
			</div>
		);
	}
}
