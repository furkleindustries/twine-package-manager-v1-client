import React, { Component } from 'react';
import './enter.css';

class EnterPane extends Component {
	render() {
		return (
			<div className="Enter paneContainer">
				<p className="Enter-opener body">Here is where you learn about entering, and, if logged in, and the comp is in session, you can make an entry.</p>
			</div>
		);
	}
}

export default EnterPane;