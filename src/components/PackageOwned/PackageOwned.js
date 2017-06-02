/* react */
import React, { Component, } from 'react';

/* redux */
import {
    setPackagePublishing,
    setPackageEditing,
    setPackageDeleting,
} from './PackageOwnedActions';

/* modules */
import * as modalFactories from '../../modules/modals/factories';

/* css */
/*import css from './PackageOwned.css';*/

export class PackageOwned extends Component {
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

                <style jsx>{
                    `.PackageOwned {
                        text-align: left;
                    }

                    .PackageOwned-title {
                        position: relative;
                        display: inline-block;
                        font-weight: bold;
                        text-shadow:
                            -2px -2px 5px white,
                            -2px 2px 5px white,
                            0 0 5px white,
                            2px -2px 5px white,
                            2px 2px 5px white;
                        word-break: break-word;
                    }

                    .PackageOwned-title::after {
                        position: absolute;
                        left: 0;
                        top: 0.5rem;
                        width: 80rem;
                        height: 0.1rem;
                        background: black;
                        opacity: 0.1;
                        z-index: -1;
                        content: '';
                    }

                    .PackageOwned-button {
                        position: relative;
                        float: right;
                        padding: 0.33rem;
                        color: white;
                        background: rgb(185, 0, 0);
                        border: 0.1rem solid rgb(200, 200, 200);
                        border-radius: 0.25rem;
                        cursor: pointer;
                    }

                    .PackageOwned-delete {
                        clear: right;
                    }

                    .PackageOwned-button:hover,
                    .PackageOwned-button:active {
                        background: rgb(200, 0, 0);
                    }

                    @media (min-width: 0px) {
                        .PackageOwned-title {
                            margin-bottom: 1rem;
                            width: 2.75rem;
                            font-size: 90%;
                        }

                        .PackageOwned-title::after {
                            top: 0.15rem;
                        }

                        .PackageOwned-button {
                            top: -0.2rem;
                            width: 1.5rem;
                            padding: 0.1rem;
                            margin-left: 0.2rem;
                            font-size: 40%;
                            overflow-x: hidden;
                        }
                    }

                    @media (min-width: 250px) {
                        .PackageOwned-title {
                            margin-bottom: 1rem;
                            width: 4rem;
                        }

                        .PackageOwned-title::after {
                            top: 0.25rem;
                        }

                        .PackageOwned-button {
                            top: -0.2rem;
                            width: 1.95rem;
                            padding: 0.2rem;
                            margin-left: 0.2rem;
                            font-size: 60%;
                        }
                    }

                    @media (min-width: 300px) {
                        .PackageOwned-title {
                            margin-bottom: 1.1rem;
                            width: 4.25rem;
                        }

                        .PackageOwned-button {
                            top: -0.2rem;
                            width: auto;
                            padding: 0.2rem;
                            margin-left: 0.2rem;
                            font-size: 60%;
                        }
                    }

                    @media (min-width: 350px) {
                        .PackageOwned-title {
                            margin-bottom: 1.3rem;
                            width: 6.1rem;
                        }

                        .PackageOwned-button {
                            margin-left: 0.4rem;
                            font-size: 65%;
                        }
                    }

                    @media (min-width: 400px) {
                        .PackageOwned-title {
                            margin-bottom: 1.5rem;
                            width: 6.25rem;
                        }

                        .PackageOwned-button {
                            top: -0.5rem;
                            padding: 0.4rem;
                            margin-left: 0.6rem;
                            font-size: 68%;
                        }
                    }

                    @media (min-width: 450px) {
                        .PackageOwned-title {
                            margin-bottom: 2rem;
                            width: 7.5rem;
                        }

                        .PackageOwned-button {
                            padding: 0.5rem;
                            margin-left: 0.65rem;
                        }
                    }

                    @media (min-width: 500px) {
                        .PackageOwned-title {
                            margin-bottom: 2.5rem;
                            width: 9rem;
                        }

                        .PackageOwned-button {
                            font-size: 75%;
                        }
                    }

                    @media (min-width: 550px) {
                        .PackageOwned-title {
                            width: 11.25rem;
                        }
                    }

                    @media (min-width: 750px) {
                        .PackageOwned-title {
                            width: 14rem;
                        }

                        .PackageOwned-title::after {
                            top: 0.6rem;
                        }

                        .PackageOwned-button {
                            top: -0.9rem;
                            padding: 0.75rem;
                            margin-left: 1.5rem;
                            font-size: 100%;
                        }
                    }

                    @media (min-width: 1000px) {
                        .PackageOwned-title {
                            width: 26rem;
                        }
                    }

                    @media (min-width: 1250px) {
                        .PackageOwned-title {
                            width: 33.5rem;
                        }

                        .PackageOwned-title::after {
                            top: 0.7rem;
                        }
                    }

                    @media (min-width: 1500px) {
                        .PackageOwned-title {
                            width: 47rem;
                        }

                        .PackageOwned-button {
                            top: -1rem;
                        }
                    }

                    @media (min-width: 1750px) {
                        .PackageOwned-title {
                            width: 51rem;
                        }
                    }

                    @media (min-width: 2000px) {
                        .PackageOwned-title {
                            width: 50.5rem;
                        }

                        .PackageOwned-title::after {
                            top: 0.8rem;
                        }
                    }`
                }</style>
            </div>
        );
    }

    componentDidMount() {
        let re = /^#togglePackagePublish-(\d+)$/;
        let match = location.hash.match(re);

        if (match && match[1] && Number(match[1]) === this.props.package.id) {
            this.makePublishModal(this.props.store.dispatch);
        }

        re = /^#editPackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.package.id) {
            this.makeEditModal(this.props.store.dispatch);
        }

        re = /^#deletePackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.package.id) {
            this.makeDeleteModal(this.props.store.dispatch);
        }
    }

    makePublishModal() {
        this.props.store.dispatch(setPackagePublishing({
            id: this.props.package.id,
            published: this.props.package.published,
        }));

        modalFactories.togglePackagePublish(
            this.props.store.dispatch,
            this.props.package.id);
    }

    makeEditModal() {
        this.props.store.dispatch(setPackageEditing(this.props.package));

        modalFactories.packageEdit(
            this.props.store.dispatch,
            this.props.package.id);
    }

    makeDeleteModal() {
        this.props.store.dispatch(setPackageDeleting({
            id: this.props.package.id,
            name: this.props.package.name,
        }));

        modalFactories.packageDelete(
            this.props.store.dispatch,
            this.props.package.id);
    }
}

export default PackageOwned;