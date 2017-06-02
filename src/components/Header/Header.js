/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';
import store from '../../store';

/* components */
import NavBar from '../NavBar/NavBar';

/* modules */
import topBarClick from '../../modules/navBar/topBarClick';

/* css */
/*import css from './Header.css';*/

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
                    class="topNavBar"
                    panes={this.props.panes}
                    selectedPane={this.props.selectedPane}
                    visible={true}
                    useRouterLink={true}
                    navBarItemClick={topBarClick} />

                <style jsx>{
                    `.Header {
                        display: flex;
                        align-items: center;
                        position: fixed;
                        width: 100%;
                        background-color: rgb(170, 0, 0);
                        font-family: Helvetica;
                        color: white;
                        box-shadow: 0 0 1rem rgba(20, 20, 20, 0.67);
                        z-index: 1;
                        box-sizing: border-box;
                        text-align: left;
                    }

                    .Header-title {
                        display: inline;
                        margin-left: 1rem;
                    }

                    .Header-noise {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        /* https://upload.wikimedia.org/wikipedia/commons/0/03/Pink.noise.col.png */
                        background-image: url('static/noise2.png');
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        opacity: 0.25;
                        pointer-events: none;
                        z-index: -1;
                        filter: saturate(0.25);
                    }

                    /* unsure why this :global is necessary */
                    :global(.topNavBar) {
                        display: flex;
                        position: absolute;
                        right: 0;
                        margin-right: 1rem;
                    }

                    :global(.topNavBar) :global(.NavBarItem) {
                        display: inline-block;
                        border-radius: 0.25rem;
                        text-decoration: none;
                        color: white;
                        cursor: pointer;
                        transition:
                            0.33s color,
                            0.33s text-shadow,
                            0.33s background,
                            0.33s border-radius;
                    }

                    @media (min-width: 0px) {
                        .Header {
                            height: 1.5rem;
                        }

                        .Header-title {
                            font-size: 30%;
                            margin-right: 0.25rem;
                        }
                    }

                    @media (min-width: 250px) {
                        .Header {
                            height: 1.5rem;
                        }

                        .Header-title {
                            font-size: 40%;
                            margin-right: 0.5rem;
                        }
                    }

                    @media (min-width: 300px) {
                        .Header {
                            height: 1.5rem;
                        }

                        .Header-title {
                            font-size: 50%;
                            margin-right: 0.55rem;
                        }
                    }

                    @media (min-width: 350px) {
                        .Header {
                            height: 1.75rem;
                        }

                        .Header-title {
                            font-size: 60%;
                            margin-right: 0.6rem;
                        }
                    }

                    @media (min-width: 400px) {
                        .Header {
                            height: 2rem;
                        }

                        .Header-title {
                            font-size: 65%;
                            margin-right: 0.65rem;
                        }
                    }

                    @media (min-width: 450px) {
                        .Header {
                            height: 2.25rem;
                        }

                        .Header-title {
                            font-size: 50%;
                            margin-right: 0.5rem;
                        }
                    }

                    @media (min-width: 500px) {
                        .Header {
                            height: 2.5rem;
                        }

                        .Header-title {
                            font-size: 60%;
                        }
                    }

                    @media (min-width: 550px) {
                        .Header {
                            height: 2.75rem;
                        }

                        .Header-title {
                            font-size: 70%;
                            margin-right: 3.25rem;
                        }
                    }

                    @media (min-width: 750px) {
                        .Header {
                            height: 3rem;
                        }

                        .Header-title {
                            font-size: 95%;
                            margin-right: 6.5rem;
                        }
                    }

                    @media (min-width: 1000px) {
                        .Header {
                            height: 3.25rem;
                        }

                        .Header-title {
                            font-size: 100%;
                            margin-right: 15.5rem;
                        }
                    }

                    @media (min-width: 1250px) {
                        .Header {
                            height: 3.5rem;
                        }

                        .Header-title {
                            font-size: 110%;
                            margin-right: 22rem;
                        }
                    }

                    @media (min-width: 1500px) {
                        .Header {
                            height: 3.75rem;
                        }

                        .Header-title {
                            font-size: 130%;
                            margin-right: 31rem;
                        }
                    }

                    @media (min-width: 1750px) {
                        .Header {
                            height: 4rem;
                        }

                        .Header-title {
                            font-size: 150%;
                            margin-right: 30rem;
                        }
                    }

                    @media (min-width: 2000px) {
                        .Header {
                            height: 4.25rem;
                        }

                        .Header-title {
                            font-size: 170%;
                            margin-right: 25rem;
                        }
                    }`
                }</style>
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