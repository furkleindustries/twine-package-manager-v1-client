/// react
import React, { Component } from 'react';

// css
import './PackageOwned.css';

// modules
import modalCreateTogglePackagePublish from '../../modules/modalCreateTogglePackagePublish';
import modalCreateRemovePackage from '../../modules/modalCreateRemovePackage';
import modalCreateEditPackage from '../../modules/modalCreateEditPackage';

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
                    className="PackageOwned-remove PackageOwned-button body"
                    onClick={() => modalCreateRemovePackage(this.props.id, this.props.name)}>
                    Remove
                </button>

                <button
                    className="PackageOwned-edit PackageOwned-button body"
                    onClick={() => modalCreateEditPackage(this.props.id)}>
                    Edit
                </button>

                {/*
                    Should be furthest left so that it doesn't break vertical
                    lines when it toggles  
                */}
                <button
                    className="PackageOwned-togglePublish PackageOwned-button body"
                    onClick={() => {
                        modalCreateTogglePackagePublish(this.props.id,
                            this.props.published);
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
            modalCreateTogglePackagePublish(this.props.id);
        }

        re = /^#editPackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.id) {
            modalCreateEditPackage(this.props.id);
        }

        re = /^#removePackage-(\d+)$/;
        match = location.hash.match(re);
        if (match && match[1] && Number(match[1]) === this.props.id) {
            modalCreateRemovePackage(this.props.id, this.props.name);
        }
    }
}

export default PackageOwned;