const css =
`.Search-bar {
    width: 50%;
    height: 2rem;
    box-sizing: border-box;
    font-size: 80%;
}

.Search-options,
.Search-button {
    width: 15%;
    height: 2rem;
    margin-left: 1rem;
    border-radius: 0.5rem;
    color: white;
    background: rgb(185, 0, 0);
    cursor: pointer;
}

.Search-options:hover,
.Search-options:active,
.Search-button:hover,
.Search-button:active {
    background: rgb(200, 0, 0);
}

.Search-resultsContainer {
    margin-top: 3rem;
}

.Search-optionsContainer {
    position: absolute;
    left: 0;
    top: 5rem;
    width: 100%;
    min-height: 100%;
    min-height: calc(100% - 5rem);
    padding: 2rem;
    background: rgba(254, 250, 250, 0.975);
    text-align: left;
    box-sizing: border-box;
}

.Search-optionsClose {
    position: absolute;
    right: 0.33rem;
    top: 0;
    cursor: pointer;
}

.Search-option:not(:first-of-type) {
    margin-top: 1.25rem;
}

.Search-label {
    display: block;
    font-weight: bold;
}

.Search-checkboxLabel {
    position: relative;
    display: inline-block;
    font-weight: normal;
    font-style: italic;
    text-shadow:
        -2px -2px 2px white,
        -2px -2px 2px white,
        -2px 2px 2px white,
        -2px 2px 2px white,
        0 0 5px white,
        0 0 5px white,
        2px -2px 2px white,
        2px -2px 2px white,
        2px 2px 2px white,
        2px 2px 2px white;
    z-index: 1;
}

.Search-checkboxLabel[for="Search-filterTargetHomepage"] {
    margin-bottom: 0;
}

.Search-checkboxLabel::after {
    position: absolute;
    left: 1.25rem;
    width: 80rem;
    height: 1.5px;
    background: rgba(0, 0, 0, 0.1);
    transform: translateY(10px);
    z-index: -1;
    content: '';
}

.Search-checkbox {
    position: absolute;
    right: 1rem;
    z-index: 1;
}

.Search-italicLabel {
    display: block;
    font-weight: normal;
    font-style: italic;
    margin-bottom: 0.33rem;
}

.Search-select {
    width: 100%;
}

.Search-rangeSlider {
    display: block;
    left: 0;
    width: 100%;
}

.Search-input {
    width: 100%;
}

.Search-rangeSliderOutput {
    margin-bottom: 1rem;
}

@media (min-width: 0) {
    .Search-bar {
        width: 35%;
        height: 1rem;
    }

    .Search-options,
    .Search-button {
        width: 25%;
        height: 1rem;
        font-size: 60%;
        margin-left: 0.5rem;
        transform: translateY(-2px);
    }

    .Search-label {
        margin-bottom: 0.5rem;
    }

    .Search-checkbox {
        transform: translateY(-133%);
    }
}

@media (min-width: 250px) {
    .Search-bar {
        width: 42.5%;
    }

    .Search-options,
    .Search-button {
        width: 22.5%;
        font-size: 65%;
        transform: translateY(-3px);
    }

    .Search-checkbox {
        transform: scale(1.25, 1.25);
    }
}

@media (min-width: 500px) {
    .Search-bar {
        width: 60%;
        height: 1.5rem;
    }

    .Search-options,
    .Search-button {
        width: 17.5%;
        height: 1.5rem;
        font-size: 70%;
        transform: translateY(-4px);
    }

    .Search-label {
        margin-bottom: 0.75rem;
    }

    .Search-checkbox {
        transform: scale(1.5, 1.5);
    }
}

@media (min-width: 750px) {
    .Search-bar {
        font-size: 140%;
    }

    .Search-bar {
        width: 60%;
        height: 2rem;
    }

    .Search-options,
    .Search-button {
        width: 13.3%;
        height: 2rem;
        font-size: 70%;
        transform: translateY(-4px);
    }

    .Search-label {
        margin-bottom: 0.75rem;
    }

    .Search-checkbox {
        transform: scale(1.75, 1.75);
    }
}

@media (min-width: 1000px) {
    .Search-checkbox {
        transform: scale(2, 2);
    }
}`;

export default css;