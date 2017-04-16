import React, { Component } from 'react';
import './news.css';

class NewsPane extends Component {
	render() {
		return (
			<div className="News paneContainer">
				<p className="News-opening body">Today there is no news!</p>
			</div>
		);
	}
}

export default NewsPane;