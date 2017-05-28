/* react */
import React, { Component } from 'react';
import Link from 'next/link';

/* css */
import css from './NavBar.css';

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

        const className = "NavBar" +
                (this.props.class ? ` ${this.props.class}` : "") +
                (this.props.visible ? "" : " hidden")
        return (
            <div className={className}>
                {list}
                <style>{css}</style>
            </div>
        );
    }
}

export class NavBarItem extends Component {
    render() {        
        const to = this.props.id === 'home' ? '' : this.props.id;

        if (this.props.useRouterLink !== false) {
            return (
                <Link
                    href={`/${to}`}>
                    <span>
                        <a
                            id={this.props.id}
                            onClick={this.props.navBarItemClick}
                            className={"NavBarItem" +
                                (this.props.active ? " active" : "") +
                                (this.props.visible ? "" : " hidden")}>
                                {this.props.title}
                        </a>
                        <style>{css}</style>
                    </span>
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
                    <style>{css}</style>
                </button>
            );
        }
    }
}