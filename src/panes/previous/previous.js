import React, { Component } from 'react';
import './previous.css';

import PreviousYear from '../../components/PreviousYear/PreviousYear.js';

const startYear = 2014;

class PreviousPane extends Component {
	render() {
		const currentYear = new Date().getFullYear();
		if (currentYear < startYear) {
			throw new Error('How did we travel back in time?');
		}

		const previousYears = [];
		for (let ii = startYear; ii < currentYear; ii++) {
			previousYears.push(ii);
		}

		const list = previousYears.map(previousYear => {
			return (
				<PreviousYear key={previousYear} year={previousYear} entries={[]} />
			);
		});

		return (
			<div className="Previous paneContainer">
				{list}
				<p className="body">This is test data. No hypercomps have been held yet.</p>
			</div>
		);
	}
}

export default PreviousPane;