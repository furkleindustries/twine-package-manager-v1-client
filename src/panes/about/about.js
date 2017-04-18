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
					Have you ever wanted to create a story that responds to its user?
				</p>

				<p className="body">
					One which branches outwardly, or distantly, depending on which links are
					clicked by the user or where they've been before? Do you want to join others
					in a competition for new, groundbreaking hypertext fiction?
				</p>

				<p className="subheader">
					Welcome to HYPERCOMP.
				</p>

				<p className="subheader">
					<button
						className="wideButton"
						onClick={this.modalCreateRules}>
						<span>Rules</span>
					</button>
				</p>
				
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