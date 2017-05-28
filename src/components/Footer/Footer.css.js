const css =
`.Footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.33rem;
    background-color: rgb(170, 0, 0);
    font-family: Helvetica;
    color: white;
    box-shadow: 0 0 1rem rgba(20, 20, 20, 0.67);
    box-sizing: border-box;
}

.Footer-content {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

.Footer-icon {
    height: 100%;
    border-radius: 25%;
}

.Footer-twitterIcon {
    filter: saturate(0);
}

.Footer-emailIcon {
    filter: saturate(0) brightness(1.3);
}

.Footer-message {
    margin-right: 1rem;
    color: white;
    font-size: 67%;
}

@media (min-width: 0px) {
    .Footer {
        height: 2rem;
        font-size: 35%;
    }

    .Footer-icon {
        width: 1.25rem;
        height: 1.25rem;
    }
}

@media (min-width: 250px) {
    .Footer {
        height: 1.75rem;
        font-size: 40%;
    }

    .Footer-icon {
        width: 1.1rem;
        height: 1.1rem;
    }
}

@media (min-width: 300px) {
    .Footer {
        height: 1.8rem;
    }

    .Footer-icon {
        width: 1.25rem;
        height: 1.25rem;
    }
}

@media (min-width: 350px) {
    .Footer {
        height: 2.5rem;
        font-size: 45%;
    }

    .Footer-icon {
        width: 1.4rem;
        height: 1.4rem;
    }
}

@media (min-width: 400px) {
    .Footer {
        height: 2.25rem;
        font-size: 50%;
    }

    .Footer-icon {
        width: 1.5rem;
        height: 1.5rem;
    }
}

@media (min-width: 450px) {
    .Footer {
        height: 2.35rem;
        font-size: 50%;
    }

    .Footer-icon {
        width: 1.6rem;
        height: 1.6rem;
    }
}

@media (min-width: 500px) {
    .Footer {
        height: 2.45rem;
        font-size: 55%;
    }

    .Footer-icon {
        width: 1.7rem;
        height: 1.7rem;
    }
}

@media (min-width: 550px) {
    .Footer {
        height: 2.55rem;
        font-size: 65%;
    }

    .Footer-icon {
        width: 1.8rem;
        height: 1.8rem;
    }
}

@media (min-width: 750px) {
    .Footer {
        height: 2.65rem;
        font-size: 92.5%;
    }

    .Footer-icon {
        width: 1.9rem;
        height: 1.9rem;
    }
}

@media (min-width: 1000px) {
    .Footer {
        height: 3rem;
        font-size: 125%;
    }

    .Footer-icon {
        width: 2rem;
        height: 2rem;
    }
}`;

export default css;