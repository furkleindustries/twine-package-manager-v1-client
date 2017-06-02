/* react */
import React, { Component, } from 'react';

/* css */
/*import css from './Keyword.css';*/

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
                <style jsx>{
                    `.Keyword {
                        display: inline-block;
                        padding: 0.5rem;
                        margin-right: 1rem;
                        border: 1.5px solid black;
                        border-radius: 1rem;
                        font-size: 90%;
                        cursor: pointer;
                        background: rgb(185, 0, 0);
                        color: white;
                    }

                    .Keyword:hover {
                        background: rgb(200, 0, 0);
                    }`
                }</style>
            </div>
        );
    }

    openKeyword() {
        
    }
}

export default Keyword;