/* react */
import React, { Component, } from 'react';

/* next */
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';

/* redux */
import initStore from '../src/store';
import { connect, } from 'react-redux';
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../src/appActions';

/* components */
import App from '../src/App';

/* css */
/*import css from '../src/panes/home/home.css';*/

/* icons */
/* https://c2.staticflickr.com/8/7319/8730255464_529c6aea39_z.jpg */
const maze = 'static/images/maze';
/* https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png/665px-PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png */
const atoms = 'static/images/atoms';

export class HomePage extends Component {
    constructor() {
        super();

        this.redirect = this.redirect.bind(this);
    }

    render() {
        return (
            <div className="Home paneContainer">
                <p className="header">
                    TwinePM is a package manager designed to make Twine more powerful and fun.
                </p>

                <p className="subheader">
                    Easily view and configure packages for Gately, Sugarcube, and Harlowe, and integrate them into your Twine project with no effort or hassle.
                </p>

                <img
                    className="Home-image"
                    alt="home img one"
                    src={`${maze}_200w.jpg`}
                    sizes="20vw"
                    srcSet={`${maze}_200w.jpg 200w,
                            ${maze}_296w.jpg 296w,
                            ${maze}_385w.jpg 385w,
                            ${maze}_456w.jpg 456w,
                            ${maze}_536w.jpg 536w,
                            ${maze}_615w.jpg 615w,
                            ${maze}_640w.jpg 640w`} />

                <img
                    className="Home-image"
                    alt="home img two"
                    src={`${atoms}_200w.jpg`}
                    sizes="20vw"
                    srcSet={`${atoms}_200w.jpg 200w,
                            ${atoms}_534w.jpg 534w,
                            ${atoms}_665w.jpg 665w`} />

                <p className="body">
                    Imagine thousands of other Twine authors' time and effort available to your project -- free of cost and in the touch of a button, with <em>TwinePM</em>.
                </p>

                <img
                    className="Home-image"
                    alt="home img one"
                    src={`${maze}_200w.jpg`}
                    sizes="20vw"
                    srcSet={`${maze}_200w.jpg 200w,
                            ${maze}_296w.jpg 296w,
                            ${maze}_385w.jpg 385w,
                            ${maze}_456w.jpg 456w,
                            ${maze}_536w.jpg 536w,
                            ${maze}_615w.jpg 615w,
                            ${maze}_640w.jpg 640w`} />

                <img
                    className="Home-image"
                    alt="home img two"
                    src={`${atoms}_200w.jpg`}
                    sizes="20vw"
                    srcSet={`${atoms}_200w.jpg 200w,
                            ${atoms}_534w.jpg 534w,
                            ${atoms}_665w.jpg 665w`} />

                <p className="body">
                    {"Click "}
                    
                    <Link
                        prefetch
                        href="/about"
                        as="about"
                        id="about"
                        onClick={this.redirect}>
                        <a>About</a>
                    </Link>
                    
                    {" in the navbar to read more about what you can do with the package manager. Click "}
                    
                    <Link
                        prefetch
                        href="/login"
                        as="login"
                        id="login"
                        onClick={this.redirect}>
                        <a>Login</a>
                    </Link>
                    
                    {" to create an account and get started sharing your own packages today!"}
                </p>

                <p className="footer">
                    Opening late 2017.
                </p>

                <style jsx>{
                    `.Home-intro {
                        margin-top: 0;
                    }

                    .Home-headerBanner {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        left: 1rem;
                        padding: 0.5rem;
                    }

                    .Home-image {
                        width: 20%;
                        padding: 0.5rem;
                    }

                    .Home-subheader {
                        margin-top: 0;
                    }`
                }</style>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(setSideBarVisible(false));
    }

    redirect(e) {
        this.props.dispatch(setAppSelectedPane(e.target.id));
    }
}

const ConnectedPage = connect()(HomePage);

const wrapped = () => (
    <App>
        <ConnectedPage />
    </App>
);

export async function getInitialProps({ req, store, }) {
    /* req only exists on server side */
    if (req) {
        store.dispatch(setAppSelectedPane(req.url.slice(1)));
    }
}

wrapped.getInitialProps = getInitialProps;

export default withRedux(initStore, null, null)(wrapped);