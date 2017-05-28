/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';
import store from '../../store';

/* components */
import { NavBar, } from '../NavBar/NavBar';

/* modules */
import topBarClick from '../../modules/navBar/topBarClick';

/* css */
import css from './Header.css';

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
					class={"topNavBar"}
					panes={this.props.panes}
					selectedPane={this.props.selectedPane}
					visible={true}
					useRouterLink={true}
					navBarItemClick={topBarClick} />

				<style dangerouslySetInnerHTML={{ __html: css, }} />
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
    	panes: state.appPanes,
	    selectedPane: state.appSelectedPane,
	};
}

export default connect(mapStateToProps)(Header);