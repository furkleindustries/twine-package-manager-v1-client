/* react */
import React, { Component } from 'react';

/* components */
import NavBarItem from './NavBarItem';

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

        const className = 'NavBar' +
                (this.props.class ? ` ${this.props.class}` : '') +
                (this.props.visible ? '' : ' hidden')
        return (
            <div className={className}>
                {list}
            </div>
        );
    }
}

export default NavBar;