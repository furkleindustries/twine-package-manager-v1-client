/// react
import React, { Component } from 'react';

// redux
import store from '../../store';

import {
    setPackagePublishing,
    setPackageEditing,
    setPackageDeleting,
} from './PackageOwnedActions';

// modules
import * as modalFactories from '../../modules/modals/factories';

// css
import './PackageOwned.css';

class PackageOwned extends Component {
    render() {
        return (
            <div className="PackageOwned">
                <em className="PackageOwned-title">
                    {this.props.name}
                </em>
                
                {/*
                    These are float-right and so they must be included in reverse order
                */}
                <button
                    className="PackageOwned-delete PackageOwned-button body"
                    onClick={() => {
                        store.dispatch(setPackageDeleting({
                            id: this.props.id,
                            name: this.props.name,
                        }));

                        modalFactories.packageDelete(this.props.id);
                    }}>
                    Delete
                </button>

                <button
                    className="PackageOwned-edit PackageOwned-button body"
                    onClick={() => {
                        const state = store.getState();
                        const packages = state.profile.packages;
                        const pkg = packages.filter(pkg => {
                            return pkg.id === this.props.id;
                        })[0];

                        if (!pkg) {
                            console.log(`Could not find package with id: ` +
                                `${this.props.id}`);
                            return;
                        }
                        
                        store.dispatch(setPackageEditing(pkg));

                        modalFactories.packageEdit(pkg.id);
                    }}>
                    Edit
                </button>

                {/*
                    Should be furthest left so that it doesn't break vertical
                    lines when it toggles
                */}
                <button
                    className="PackageOwned-togglePublish PackageOwned-button body"
                    onClick={() => {
                        store.dispatch(setPackagePublishing({
                            id: this.props.id,
                            published: this.props.published,
                        }));

                        modalFactories.togglePackagePublish(this.props.id);
                    }}>
                    {this.props.published ? "Unpublish" : "Publish"}
                </button>
            </div>
        );
    }

    componentDidMount() {
        let re = /^#togglePackagePublish-(\d+)$/;
        let match = location.hash.match(re);

        if (match && match[1] && Number(match[1]) === this.props.id) {
            store.dispatch(setPackagePublishing({
                id: this.props.id,
                published: this.props.published,
            }));

            modalFactories.togglePackagePublish(this.props.id);
        }

        re = /^#editPackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.id) {
            const state = store.getState();
            const packages = state.profile.packages;
            const pkg = packages.filter(pkg => {
                return pkg.id === this.props.id;
            })[0];

            if (!pkg) {
                return;
            }
            
            store.dispatch(setPackageEditing(pkg));

            modalFactories.packageEdit(this.props.id);
        }

        re = /^#deletePackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.id) {
            store.dispatch(setPackageDeleting(this.props.id));

            modalFactories.packageDelete(this.props.id);
        }
    }
}

export default PackageOwned;