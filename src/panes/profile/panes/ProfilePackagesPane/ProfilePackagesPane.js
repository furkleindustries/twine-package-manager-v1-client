/* react */
import React, { Component, } from 'react';

/* redux */
import { connect, } from 'react-redux';

/* components */
import PackageOwned from '../../../../components/PackageOwned/PackageOwned';

/* modules */
import * as modalFactories from '../../../../modules/modals/factories';

/* css */
/*import css from './ProfilePackagesPane.css';*/

export class ProfilePackagesPane extends Component {
    render() {
        const list = (this.props.packages || []).map(pkg => {
            return <PackageOwned
                key={pkg.name}
                createModal={this.props.createModal}
                closeModal={this.props.closeModal}
                togglePackagePublish={this.props.togglePackagePublish}
                editPackage={this.props.editPackage}
                removePackage={this.props.removePackage}
                package={pkg}
                store={this.props.store} />;
        });

        return (
            <div className="ProfilePackagesPane">
                <h1 className="header">My Packages</h1>

                {list.length ? list : "No packages."}

                <button
                    className="Profile-newPackage wideButton"
                    onClick={modalFactories.packageCreate}>
                    Create New Package
                </button>

                <style jsx>{
                    ``
                }</style>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        packages: state.profile.packages,
    };
}

export default connect(mapStateToProps)(ProfilePackagesPane);