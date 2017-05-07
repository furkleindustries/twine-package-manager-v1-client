// react
import React, { Component, } from 'react';
import { Link, } from 'react-router';

// redux
import store from '../../store';
import {
	setAppSelectedPane,
	setSideBarVisible,
} from '../../appActions';

//css
import './home.css';

/* https://c2.staticflickr.com/8/7319/8730255464_529c6aea39_z.jpg */
import maze from '../../images/maze_small.jpg';
/* https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png/665px-PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png */
import atoms from '../../images/atoms_small.jpg';

class HomePane extends Component {
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
						onClick={e => store.dispatch(setAppSelectedPane(e.target.id))}>
						About
					</Link>
					
					{" in the navbar to read more about what you can do with the package manager. Click "}
					
					<Link
						id="login"
						to={baseUrl + "/login"}
						onClick={e => store.dispatch(setAppSelectedPane(e.target.id))}>
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
}

export default HomePane;