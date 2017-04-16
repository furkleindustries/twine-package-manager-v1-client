/// react
import React, { Component } from 'react';

// css
import './Result.css';

class Result extends Component {
	constructor() {
		super();

		this.openResult = this.openResult.bind(this);
	}

	render() {
		let count = 0;
		const keywords = this.props.keywords
			.split(' ')
			.filter(aa => aa)
			.map(keyword => {
				return (<Keyword
					key={count++}
					className="Result-keyword"
					keyword={keyword} />);
			});

		return (
			<div className="Result">
				<strong
					className="Result-title body"
					onClick={this.openResult}>
					{this.props.name}
				</strong>

				<div
					className="Result-authorName body"
					onClick={this.openResult}>
					{this.props.authorName}
				</div>

				<div className="Result-description body">
					{this.props.description}
				</div>

				<div className="Result-keywordsContainer body">
					{keywords}
				</div>
			</div>
		);
	}

	componentDidMount() {
		/*let re = /^#togglePackagePublish-(\d+)$/;
		let match = location.hash.match(re);
		if (match && match[1] && this.props.id === Number(match[1])) {
			this.props.togglePackagePublish(this.props.id);
		}

		re = /^#editPackage-(\d+)$/;
		match = location.hash.match(re);
		if (match && match[1] && this.props.id === Number(match[1])) {
			this.props.editPackage(this.props.id);
		}

		re = /^#removePackage-(\d+)$/;
		match = location.hash.match(re);
		if (match && match[1] && this.props.id === Number(match[1])) {
			this.props.removePackage(this.props.id);
		}*/
	}

	openResult() {
		// TODO
	}
}

export default Result;

class Keyword extends Component {
	render() {
		return (
			<div className="Keyword">
				{this.props.keyword}
			</div>
		);
	}
}