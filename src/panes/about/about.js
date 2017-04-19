// react
import React, { Component } from 'react';

// modals
import RulesModal from '../../modals/RulesModal/RulesModal.js';

// modules
import modalCreate from '../../modules/modalCreate';

// css
import './about.css';

class AboutPane extends Component {
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
			</div>
		);
	}

	componentDidMount() {
		if (location.hash === '#rules') {
			this.modalCreateRules();
		}
	}

	modalCreateRules() {
		modalCreate(<RulesModal />);
		location.hash = 'rules';
	}
}

export default AboutPane;