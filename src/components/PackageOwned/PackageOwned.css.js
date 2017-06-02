const css =
`.PackageOwned {
    text-align: left;
}

.PackageOwned-title {
    position: relative;
    display: inline-block;
    font-weight: bold;
    text-shadow:
        -2px -2px 5px white,
        -2px 2px 5px white,
        0 0 5px white,
        2px -2px 5px white,
        2px 2px 5px white;
    word-break: break-word;
}

.PackageOwned-title::after {
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 80rem;
    height: 0.1rem;
    background: black;
    opacity: 0.1;
    z-index: -1;
    content: '';
}

.PackageOwned-button {
    position: relative;
    float: right;
    padding: 0.33rem;
    color: white;
    background: rgb(185, 0, 0);
    border: 0.1rem solid rgb(200, 200, 200);
    border-radius: 0.25rem;
    cursor: pointer;
}

.PackageOwned-delete {
    clear: right;
}

.PackageOwned-button:hover,
.PackageOwned-button:active {
    background: rgb(200, 0, 0);
}

@media (min-width: 0px) {
    .PackageOwned-title {
        margin-bottom: 1rem;
        width: 2.75rem;
        font-size: 90%;
    }

    .PackageOwned-title::after {
        top: 0.15rem;
    }

    .PackageOwned-button {
        top: -0.2rem;
        width: 1.5rem;
        padding: 0.1rem;
        margin-left: 0.2rem;
        font-size: 40%;
        overflow-x: hidden;
    }
}

@media (min-width: 250px) {
    .PackageOwned-title {
        margin-bottom: 1rem;
        width: 4rem;
    }

    .PackageOwned-title::after {
        top: 0.25rem;
    }

    .PackageOwned-button {
        top: -0.2rem;
        width: 1.95rem;
        padding: 0.2rem;
        margin-left: 0.2rem;
        font-size: 60%;
    }
}

@media (min-width: 300px) {
    .PackageOwned-title {
        margin-bottom: 1.1rem;
        width: 4.25rem;
    }

    .PackageOwned-button {
        top: -0.2rem;
        width: auto;
        padding: 0.2rem;
        margin-left: 0.2rem;
        font-size: 60%;
    }
}

@media (min-width: 350px) {
    .PackageOwned-title {
        margin-bottom: 1.3rem;
        width: 6.1rem;
    }

    .PackageOwned-button {
        margin-left: 0.4rem;
        font-size: 65%;
    }
}

@media (min-width: 400px) {
    .PackageOwned-title {
        margin-bottom: 1.5rem;
        width: 6.25rem;
    }

    .PackageOwned-button {
        top: -0.5rem;
        padding: 0.4rem;
        margin-left: 0.6rem;
        font-size: 68%;
    }
}

@media (min-width: 450px) {
    .PackageOwned-title {
        margin-bottom: 2rem;
        width: 7.5rem;
    }

    .PackageOwned-button {
        padding: 0.5rem;
        margin-left: 0.65rem;
    }
}

@media (min-width: 500px) {
    .PackageOwned-title {
        margin-bottom: 2.5rem;
        width: 9rem;
    }

    .PackageOwned-button {
        font-size: 75%;
    }
}

@media (min-width: 550px) {
    .PackageOwned-title {
        width: 11.25rem;
    }
}

@media (min-width: 750px) {
    .PackageOwned-title {
        width: 14rem;
    }

    .PackageOwned-title::after {
        top: 0.6rem;
    }

    .PackageOwned-button {
        top: -0.9rem;
        padding: 0.75rem;
        margin-left: 1.5rem;
        font-size: 100%;
    }
}

@media (min-width: 1000px) {
    .PackageOwned-title {
        width: 26rem;
    }
}

@media (min-width: 1250px) {
    .PackageOwned-title {
        width: 33.5rem;
    }

    .PackageOwned-title::after {
        top: 0.7rem;
    }
}

@media (min-width: 1500px) {
    .PackageOwned-title {
        width: 47rem;
    }

    .PackageOwned-button {
        top: -1rem;
    }
}

@media (min-width: 1750px) {
    .PackageOwned-title {
        width: 51rem;
    }
}

@media (min-width: 2000px) {
    .PackageOwned-title {
        width: 50.5rem;
    }

    .PackageOwned-title::after {
        top: 0.8rem;
    }
}`;

export default css;