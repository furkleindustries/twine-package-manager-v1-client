/* react */
import React, { Component, } from 'react';
import { Link, } from 'react-router';

/* redux */
import store from '../../store';
import {
	setAppSelectedPane,
	setSideBarVisible,
} from '../../appActions';

/* css */
import css from './home.css';

/* icons */
const baseUrl = process.env.PUBLIC_URL;

/* https://c2.staticflickr.com/8/7319/8730255464_529c6aea39_z.jpg */
const maze = `${baseUrl}/static/maze_small.png`;
/* https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png/665px-PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png */
const atoms = `${baseUrl}/static/atoms_small.png`;

export class HomePane extends Component {
	render() {
		const baseUrl = process.env.PUBLIC_URL;

		return (
			<div className="Home paneContainer">
				<p className="header">
					TwinePM is a package manager designed to make Twine more powerful and fun.
				</p>

				<p className="subheader">
					Easily view and configure packages for Gately, Sugarcube, and Harlowe, and integrate them into your Twine project with no effort or hassle.
				</p>

				<img className="Home-image" src={maze} alt="home img one" />

				<img className="Home-image" src={atoms} alt="home img two" />

				<p className="body">
					Imagine thousands of other Twine authors' time and effort available to your project -- free of cost and in the touch of a button, with <em>TwinePM</em>.
				</p>

				<img className="Home-image" src={maze} alt="home img one" />

				<img className="Home-image" src={atoms} alt="home img two" />

				<p className="body">
					{"Click "}
					
					<Link
						id="about"
						to={baseUrl + "/about"}
						onClick={this.redirect}>
						About
					</Link>
					
					{" in the navbar to read more about what you can do with the package manager. Click "}
					
					<Link
						id="login"
						to={baseUrl + "/login"}
						onClick={this.redirect}>
						Login
					</Link>
					
					{" to create an account and get started sharing your own packages today!"}
				</p>

				<p className="footer">
					Opening late 2017.
				</p>
			</div>
		);
	}

    componentDidMount() {
        store.dispatch(setSideBarVisible(false));
    }

    redirect(e) {
    	store.dispatch(setAppSelectedPane(e.target.id));
    }
}

export default HomePane;