const css = 
`.AccountCreateModal {
    text-align: left;
}

.AccountCreateModal-fieldContainer {
    text-align: center;
}

.AccountCreateModal-infoPairContainer {
    display: inline-block;
    text-align: left;
}

.AccountCreateModal-title {
    text-align: center;
}

.AccountCreateModal-label {
    display: inline-block;
    text-align: left;
}

.AccountCreateModal-button:hover,
.AccountCreateModal-button:active {
    background: rgb(200, 0, 0);
}

.AccountCreateModal-message {
    text-align: center;
    height: 1rem;
}

@media (min-width: 0px) {
    .AccountCreateModal-input {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .AccountCreateModal-input:last-of-type {
        margin-bottom: 0.75rem;
    }
}

@media (min-width: 550px) {
    .AccountCreateModal-label {
        width: 7rem;
    }

    .AccountCreateModal-input {
        width: 15.25rem;
        margin-bottom: 0.75rem;
    }

    .AccountCreateModal-input:last-of-type {
        margin-bottom: 1.125rem;
    }
}

@media (min-width: 750px) {
    .AccountCreateModal-label {
        width: 7.5rem;
    }

    .AccountCreateModal-input {
        width: 24.5rem;
    }
}

@media (min-width: 1000px) {
    .AccountCreateModal-label {
        width: 8rem;
    }

    .AccountCreateModal-input {
        width: 36.5rem;
    }
}

@media (min-width: 1250px) {
    .AccountCreateModal-label {
        width: 8.75rem;
    }

    .AccountCreateModal-input {
        width: 48rem;
    }
}

@media (min-width: 1500px) {
    .AccountCreateModal-label {
        width: 9.5rem;
    }

    .AccountCreateModal-input {
        width: 59.5rem;
    }
}

@media (min-width: 1750px) {
    .AccountCreateModal-label {
        width: 10.5rem;
    }

    .AccountCreateModal-input {
        width: 63.5rem;
    }
}`;

export default css;