/* react */
import React, { Component, } from 'react';

/* css */
import css from './Result.css';

export default class Result extends Component {
    constructor() {
        super();

        this.openResult = this.openResult.bind(this);
    }

    render() {
        let count = 0;
        const keywords = (this.props.keywords || '')
            .split(' ')
            .filter(aa => aa)
            .map(keyword => {
                return (<Keyword
                    key={count++}
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

                <style>{css}</style>
            </div>
        );
    }

    openResult() {
        // TODO
    }
}

export class Keyword extends Component {
    constructor() {
        super();

        this.openKeyword = this.openKeyword.bind(this);
    }

    render() {
        return (
            <div
                className="Keyword"
                onClick={this.openKeyword}>
                {this.props.keyword}
            </div>
        );
    }

    openKeyword() {
        
    }
}