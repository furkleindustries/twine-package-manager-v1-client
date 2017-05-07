// react
import React, { Component, } from 'react';

// redux
import { connect, } from 'react-redux';
import store from '../../../../store';

// components
import PackageOwned from '../../../../components/PackageOwned/PackageOwned';

// modules
import * as modalFactories from '../../../../modules/modals/factories';

// css
import './ProfilePackagesPane.css';

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
                {...pkg} />;
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
			</div>
		);
	}
}

function mapStateToProps() {
	const state = store.getState();

	return {
		packages: state.profile.packages,
	};
}

export default connect(mapStateToProps)(ProfilePackagesPane);