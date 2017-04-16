import React, { Component } from 'react';
import './PaneControl.css';

// panes
import HomePane from '../../panes/home/home.js';
import NewsPane from '../../panes/news/news.js';
import CurrentPane from '../../panes/current/current.js';
import PreviousPane from '../../panes/previous/previous.js';
import AboutPane from '../../panes/about/about.js';
import EnterPane from '../../panes/enter/enter.js';
import LoginPane from '../../panes/login/login.js';
import ProfilePane from '../../panes/profile/profile.js';

class PaneControl extends Component {
	render() {
		const list = [];
		Object.getOwnPropertyNames(this.props.panes).forEach(name => {
			if (name === 'home') {
				list.push(<HomePane
					key={name}
					visible={this.props.selectedPane === name} />);
			} else if (name === 'news') {
				list.push(<NewsPane
					key={name}
					visible={this.props.selectedPane === name} />);
			} else if (name === 'current') {
				list.push(<CurrentPane
					key={name}
					visible={this.props.selectedPane === name} />);
			} else if (name === 'previous') {
				list.push(<PreviousPane
					key={name}
					visible={this.props.selectedPane === name} />);
			} else if (name === 'about') {
				list.push(<AboutPane
					key={name}
					visible={this.props.selectedPane === name} />);
			} else if (name === 'enter') {
				list.push(<EnterPane
					key={name}
					visible={this.props.selectedPane === name}
					createModal={this.props.createModal} />);
			} else if (name === 'login') {
				list.push(<LoginPane
					key={name}
					visible={this.props.selectedPane === name}
					appLogin={this.props.appLogin}
					createModal={this.props.createModal} />);
			} else if (name === 'profile') {
				list.push(<ProfilePane
					key={name}
					visible={this.props.selectedPane === name}
					profile={this.props.profile}
					appLogout={this.props.appLogout}
					currentYearEntries={this.props.currentYearEntries} />);
			}
		});

		return (
			<div className="PaneControl centerHorizontallyAbsolute">
				{list}
			</div>
		);
	}
}

export default PaneControl;