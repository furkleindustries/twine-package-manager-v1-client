/* react */
import React, { Component, } from 'react';

/* components */
import Keyword from './Keyword';

/* css */
/*import css from './Result.css';*/

export class Result extends Component {
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

                <style jsx>{
                    `.Result {
                        position: relative;
                        text-align: left;
                        padding: 1rem;
                        border: 1px solid black;
                        border-radius: 5px;
                        margin: 1rem;
                        background: rgb(248, 248, 248);
                    }

                    .Result:hover,
                    .Result:active {
                        background: white;
                    }

                    .Result + .Result {
                        margin-top: 0.5rem;
                    }

                    .Result-title {
                        position: relative;
                        display: inline-block;
                        font-size: 120%;
                        margin-right: 1rem;
                        margin-bottom: 0.67rem;
                        cursor: pointer;
                        word-break: break-word;
                    }

                    .Result-authorName {
                        position: absolute;
                        right: 1rem;
                        top: 1rem;
                        cursor: pointer;
                    }

                    .Result-description {
                        font-size: 90%;
                        margin-bottom: 0.67rem;
                    }

                    .Result-keywordsContainer {
                        word-break: break-word;
                    }`
                }</style>
            </div>
        );
    }

    openResult() {
        // TODO
    }
}

export default Result;