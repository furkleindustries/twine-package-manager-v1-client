/* react */
import React, { Component, } from 'react';

/* css */
import css from './Footer.css';

/* icons */
const baseUrl = process.env.PUBLIC_URL;
/* https://pixabay.com/p-1366218/ */
const twitterIcon = '/static/images/twitter_icon';
/* https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Email_Shiny_Icon.svg/1024px-Email_Shiny_Icon.svg.png */
const emailIcon = '/static/images/email_icon';

export class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <a className="Footer-content" href="https://twitter.com/hypercomporg">
                    <img
                        className="Footer-twitterIcon Footer-icon"
                        alt="footer twitter icon"
                        src={`${twitterIcon}_64w.png`}
                        sizes={`(min-width: 0px) 1.25rem,
                            (min-width: 250px) 1.1rem,
                            (min-width: 300px) 1.25rem,
                            (min-width: 350px) 1.4rem,
                            (min-width: 400px) 1.5rem,
                            (min-width: 450px) 1.6rem,
                            (min-width: 500px) 1.7rem,
                            (min-width: 550px) 1.8rem,
                            (min-width: 750px) 1.9rem,
                            (min-width: 1000px) 2rem`}
                        srcset={`${twitterIcon}_64w.png 64w,
                                ${twitterIcon}_542w.png 542w,
                                ${twitterIcon}_960w.png 960w`} />
                </a>

                <a className="Footer-content" href="mailto:hypercomporg@gmail.com">
                    <img
                        className="Footer-emailIcon Footer-icon"
                        alt="footer email icon"
                        src={`${emailIcon}_64w.png`}
                        sizes={`(min-width: 0px) 1.25rem,
                            (min-width: 250px) 1.1rem,
                            (min-width: 300px) 1.25rem,
                            (min-width: 350px) 1.4rem,
                            (min-width: 400px) 1.5rem,
                            (min-width: 450px) 1.6rem,
                            (min-width: 500px) 1.7rem,
                            (min-width: 550px) 1.8rem,
                            (min-width: 750px) 1.9rem,
                            (min-width: 1000px) 2rem`}
                        srcset={`${emailIcon}_64w.png 64w,
                                ${emailIcon}_420w.png 420w,
                                ${emailIcon}_650w.png 650w,
                                ${emailIcon}_958w.png 958w`} />
                </a>

                <span className="Footer-message Footer-content">
                    All TwinePM code is open source under the GPL. All packages, unless otherwise marked, are subject to the license on their package page.
                </span>

                <style>{css}</style>
            </div>
        );
    }
}

export default Footer;