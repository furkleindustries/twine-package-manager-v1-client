// react
import React, { Component } from 'react';
import { Link } from 'react-router';

// css
import './NavBar.css';

export class NavBar extends Component {
	render() {
		const list = [];
		Object.getOwnPropertyNames(this.props.panes).forEach(name => {
			list.push(
				<NavBarItem id={name}
					key={name}
					title={this.props.panes[name].title}
					active={this.props.selectedPane === name}
					visible={this.props.panes[name].visible}
					useRouterLink={this.props.useRouterLink}
					navBarItemClick={this.props.navBarItemClick} />
			);
		});

		return (
			<div className={"NavBar" +
				(this.props.class ? " " + this.props.class : "") +
				(this.props.visible ? "" : " hidden")}>
				{list}
			</div>
		);
	}
}

export class NavBarItem extends Component {
	render() {
		const baseUrl = process.env.PUBLIC_URL;
		
		const to = this.props.id === 'home' ? '' : this.props.id;

		if (this.props.useRouterLink !== false) {
			return (
				<Link
					to={`${baseUrl}/${to}`}
					id={this.props.id}
					className={"NavBarItem" +
						(this.props.active ? " active" : "") +
						(this.props.visible ? "" : " hidden")}
					onClick={this.props.navBarItemClick}>
					{this.props.title}
				</Link>
			);
		} else {
			return (
				<button
					id={this.props.id}
					className={"NavBarItem" +
						(this.props.active ? " active" : "") +
						(this.props.visible ? "" : " hidden")}
					onClick={this.props.navBarItemClick}>
					{this.props.title}
				</button>
			);
		}
	}
}