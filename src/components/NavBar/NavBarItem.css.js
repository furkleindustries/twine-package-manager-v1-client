const css =
`.NavBarItem.active {
    color: black;
    border-radius: 0.33rem;
    background: rgb(245, 245, 245);
}

.NavBarItem:not(.active):hover,
.NavBarItem:not(.active):active {
    text-shadow: 0 0 0.125rem white;
    background: rgb(90, 0, 0);
    border-radius: 0.33rem;
}

.NavBarItem.hidden {
    display: none;
}

@media (min-width: 0px) {
    .NavBarItem {
        padding: 0.2rem;
        margin: 0.1rem;
        font-size: 27.5%;
    }
}

@media (min-width: 250px) {
    .NavBarItem {
        padding: 0.2rem;
        margin: 0.15rem;
        font-size: 35%;
    }
}

@media (min-width: 300px) {
    .NavBarItem {
        padding: 0.135rem;
        margin: 0.135rem;
        font-size: 35%;
    }
}

@media (min-width: 350px) {
    .NavBarItem {
        padding: 0.155rem;
        margin: 0.155rem;
        font-size: 37.5%;
    }
}

@media (min-width: 400px) {
    .NavBarItem {
        padding: 0.2rem;
        margin: 0.2rem;
        font-size: 45%;
    }
}

@media (min-width: 450px) {
    .NavBarItem {
        padding: 0.25rem;
        margin: 0.25rem;
        font-size: 55%;
    }
}

@media (min-width: 500px) {
    .NavBarItem {
        padding: 0.3rem;
        margin: 0.3rem;
        font-size: 60%;
    }
}

@media (min-width: 750px) {
    .NavBarItem {
        padding: 0.40rem;
        margin: 0.40rem;
        font-size: 72.5%;
    }
}

@media (min-width: 1000px) {
    .NavBarItem {
        padding: 0.45rem;
        margin: 0.45rem;
        font-size: 80%;
    }
}

@media (min-width: 1250px) {
    .NavBarItem {
        padding: 0.5rem;
        margin: 0.5rem;
        font-size: 87.5%;
    }
}

@media (min-width: 1500px) {
    .NavBarItem {
        padding: 0.6rem;
        margin: 0.6rem;
        font-size: 102.5%;
    }
}

@media (min-width: 1750px) {
    .NavBarItem {
        padding: 0.7rem;
        margin: 0.7rem;
        font-size: 110%;
    }
}

@media (min-width: 2000px) {
    .NavBarItem {
        padding: 0.8rem;
        margin: 0.8rem;
        font-size: 117.5%;
    }
}`;

export default css;