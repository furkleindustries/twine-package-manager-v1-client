import React, { Component } from 'react';

// css
import './Footer.css';

// icons
/* https://pixabay.com/p-1366218/ */
import twitterIcon from '../../images/twitter_icon.png';
/* https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Email_Shiny_Icon.svg/1024px-Email_Shiny_Icon.svg.png */
import emailIcon from '../../images/email_icon.png';

class Footer extends Component {
	render() {
		return (
			<div className="Footer">
				<a className="Footer-content" href="https://twitter.com/hypercomporg">
					<img className="Footer-twitterIcon Footer-icon" src={twitterIcon} alt="@hypercomporg" />
				</a>

        		<a className="Footer-content" href="mailto:hypercomporg@gmail.com">
        			<img className="Footer-emailIcon Footer-icon" src={emailIcon} alt="hypercomporg@gmail.com" />
        		</a>

        		<span className="Footer-message Footer-content">
        			All TwinePM code is open source under the GPL. All packages, unless otherwise marked, are subject to the license on their package page.
        		</span>
        	</div>
		);
	}
}

export default Footer;