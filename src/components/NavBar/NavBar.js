// react
import React, { Component } from 'react';
import { Link } from 'react-router';

// redux
import store from '../../store';
import { setSelectedPane } from '../../appActions';

// css
import './NavBar.css';

class NavBar extends Component {
	render() {
		const list = [];
		Object.getOwnPropertyNames(this.props.panes).forEach(name => {
			list.push(
				<NavBarItem id={name}
					key={name}
					title={this.props.panes[name].title}
					active={this.props.selectedPane === name}
					visible={this.props.panes[name].visible} />
			);
		});

		return (
			<div className="NavBar">
				{list}
			</div>
		);
	}
}

class NavBarItem extends Component {
	render() {
		const baseUrl = process.env.PUBLIC_URL;
		
		let to = this.props.id;
		if (to === 'home') {
			to = '';
		}

		return (
			<Link
				to={baseUrl + '/' + to}
				id={this.props.id}
				className={"NavBarItem" +
					(this.props.active ? " active" : "") +
					(this.props.visible ? "" : " hidden")}
				onClick={e => store.dispatch(setSelectedPane(e.target.id))}>
				{this.props.title}
			</Link>
		);
	}
}

export { NavBar, NavBarItem };