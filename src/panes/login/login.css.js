const css =
`.Login {
    text-align: left;
}

.Login-fieldContainer {
    text-align: center;
}

.Login-infoPairContainer {
    display: inline-block;
    text-align: left;
}

.Login-title {
    text-align: center;
}

.Login-label {
    display: inline-block;
    text-align: left;
}

.Login-button:hover,
.Login-button:active {
    background: rgb(200, 0, 0);
}

.Login-message {
    height: 1rem;
    text-align: center;
}

@media (min-width: 0px) {
    .Login-input {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .Login-input:last-of-type {
        margin-bottom: 0.75rem;
    }
}

@media (min-width: 550px) {
    .Login-label {
        width: 7rem;
    }

    .Login-input {
        width: 15.25rem;
    }

    .Login-input {
        margin-bottom: 0.75rem;
    }

    .Login-input:last-of-type {
        margin-bottom: 1.125rem;
    }
}

@media (min-width: 750px) {
    .Login-label {
        width: 7.5rem;
    }

    .Login-input {
        width: 24.5rem;
    }
}

@media (min-width: 1000px) {
    .Login-label {
        width: 8rem;
    }

    .Login-input {
        width: 36.5rem;
    }
}

@media (min-width: 1250px) {
    .Login-label {
        width: 8.75rem;
    }

    .Login-input {
        width: 46rem;
    }
}

@media (min-width: 1500px) {
    .Login-label {
        width: 9.5rem;
    }

    .Login-input {
        width: 59.5rem;
    }
}

@media (min-width: 1750px) {
    .Login-label {
        width: 10.5rem;
    }

    .Login-input {
        width: 63.5rem;
    }
}`;

export default css;