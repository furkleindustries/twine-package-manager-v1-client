import React, { Component, } from 'react';

// css
import './Header.css';

// components
import { NavBar, } from '../NavBar/NavBar';

class Header extends Component {
	render() {
		return (
			<div className="Header">
				<h1 className="Header-title">
					<span className="centerHorizontallyRelative">
						Twine Package Manager
					</span>
				</h1>

				<NavBar
					panes={this.props.panes}
					selectedPane={this.props.selectedPane}
					navBarItemClick={this.props.navBarItemClick}  />
			</div>
		);
	}
}

export default Header;