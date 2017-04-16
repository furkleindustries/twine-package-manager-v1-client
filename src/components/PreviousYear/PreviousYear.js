import React, { Component } from 'react';
import './PreviousYear.css';

import PackageOwned from '../PackageOwned/PackageOwned';

class PreviousYear extends Component {
	render() {
		const entries = this.props.entries;
		const list = entries.map(aa => <PackageOwned modifiable={false} />);

		return (
			<div className="PreviousYear">
				<div className="header">{this.props.year}</div>
				{list}
			</div>
		);
	}
}

export default PreviousYear;