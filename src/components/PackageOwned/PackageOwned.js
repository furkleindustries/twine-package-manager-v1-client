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
    constructor() {
        super();

        this.makeDeleteModal = this.makeDeleteModal.bind(this);
        this.makeEditModal = this.makeEditModal.bind(this);
        this.makePublishModal = this.makePublishModal.bind(this);
    }

    render() {
        return (
            <div className="PackageOwned">
                <em className="PackageOwned-title">
                    {this.props.package.name}
                </em>
                
                {/*
                    These are float-right and so they must be included in reverse order
                */}
                <button
                    className="PackageOwned-delete PackageOwned-button body"
                    onClick={this.makeDeleteModal}>
                    Delete
                </button>

                <button
                    className="PackageOwned-edit PackageOwned-button body"
                    onClick={this.makeEditModal}>
                    Edit
                </button>

                {/*
                    Should be furthest left so that it doesn't break vertical
                    lines when it toggles
                */}
                <button
                    className="PackageOwned-togglePublish PackageOwned-button body"
                    onClick={this.makePublishModal}>
                    {this.props.package.published ? "Unpublish" : "Publish"}
                </button>
            </div>
        );
    }

    componentDidMount() {
        let re = /^#togglePackagePublish-(\d+)$/;
        let match = location.hash.match(re);

        if (match && match[1] && Number(match[1]) === this.props.package.id) {
            this.makePublishModal();
        }

        re = /^#editPackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.package.id) {
            this.makeEditModal();
        }

        re = /^#deletePackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.package.id) {
            this.makeDeleteModal();
        }
    }

    makePublishModal() {
        store.dispatch(setPackagePublishing({
            id: this.props.package.id,
            published: this.props.package.published,
        }));

        modalFactories.togglePackagePublish(
            this.props.package.id);
    }

    makeEditModal() {
        store.dispatch(setPackageEditing(this.props.package));

        modalFactories.packageEdit(this.props.package.id);
    }

    makeDeleteModal() {
        store.dispatch(setPackageDeleting({
            id: this.props.package.id,
            name: this.props.package.name,
        }));

        modalFactories.packageDelete(this.props.package.id);
    }
}

export default PackageOwned;