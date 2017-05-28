const css =
`#Profile-infoContainer {
    display: inline-block;
    position: relative;
    text-align: left;
}

#Profile-id,
#Profile-dateCreated {
    display: inline-block;
    border: 2px solid transparent;
}

#Profile-description {
    height: 6rem;
    background: white;
    resize: none;
}

label[for="Profile-description"] {
    transform: translateY(-6rem);
}

#Profile-visibleSign {
    position: absolute;
    right: 0;
    width: 4rem;
    text-align: center;
}

#Profile-visibleSign::after {
    position: absolute;
    left: 50%;
    background: black;
    opacity: 0.1;
    transform: translateX(-50%);
    z-index: -1;
    content: '';
}

.Profile-label {
    position: relative;
    display: inline-block;
    margin-right: 0.5rem;
    font-weight: bold;
    z-index: -1;
}

.Profile-input {
    margin-bottom: 0.5rem;
    padding: 0.25rem;
    border: 2px double rgb(80, 80, 80);
    border-radius: 3px;
    box-sizing: content-box;
}

.Profile-visibility {
    margin: 0 0.65rem 0 0.95rem;
}

.Profile-newSection {
    margin: 1.1rem;
    border-top: 0.1rem solid rgba(0, 0, 0, 0.5);
}

.Profile-readonly {
    border: 2px solid rgba(0, 0, 0, 0.05);
    color: #6d6d6d;
}

.Profile-userdataError {
    display: inline-block;
    height: 0rem;
}

.Profile-doubleButtonContainer {
    padding: 0;
    border: 0;
    background: none;
}

.Profile-doubleButtonContainer:hover {
    background: transparent;
}

.Profile-doubleButtonContainer button {
    display: inline;
    width: 50%;
    margin: 0;
}

.Profile-invisible {
    display: none;
}

.Profile-logout {
    margin-left: auto;
    margin-right: auto;
}

@media (min-width: 0px) {
    .Profile-label {
        width: 1.67rem;
    }

    .Profile-input {
        width: 2.3rem;
    }

    .Profile-visibility {
        transform: scale(1, 1);
        margin: 0 -0.1rem 0 1rem;
    }

    #Profile-visibleSign {
        transform: translateX(1.8rem);
    }

    #Profile-visibleSign::after {
        top: 1.5rem;
        width: 0.09rem;
        height: 13.5rem;
    }

    .Profile-editAccount {
        padding: 1rem;
    }
}

@media (min-width: 250px) {
    .Profile-label {
        width: 2.6rem;
    }

    .Profile-input {
        width: 3.75rem;
    }

    .Profile-visibility {
        transform: scale(1.2, 1.2) translateY(0.2rem);
        margin: 0 0.025rem 0 1rem;
    }

    #Profile-visibleSign {
        transform: translateX(1.675rem);
    }

    #Profile-visibleSign::after {
        top: 1.67rem;
        width: 0.1rem;
        height: 13.6rem;
    }

    .Profile-editAccount {
        padding: inherit;
    }
}

@media (min-width: 300px) {
    .Profile-label {
        width: 3.4rem;
    }

    .Profile-input {
        width: 5.3rem;
    }

    .Profile-visibility {
        transform: scale(1.6, 1.6) translateY(0.12rem);
        margin: 0 0.2rem 0 1rem;
    }

    #Profile-visibleSign {
        transform: translateX(1.325rem);
    }

    #Profile-visibleSign::after {
        top: 1.8rem;
        height: 13.3rem;
    }
}

@media (min-width: 350px) {
    .Profile-label {
        width: 4.5rem;
    }

    .Profile-input {
        width: 6.55rem;
    }

    .Profile-visibility {
        transform: scale(1.7, 1.7) translateY(0.11rem);
        margin: 0 0.35rem 0 1rem;
    }

    #Profile-visibleSign {
        transform: translateX(1.2rem);
    }

    #Profile-visibleSign::after {
        top: 2.2rem;
        height: 13.9rem;
    }
}

@media (min-width: 400px) {
    .Profile-label {
        width: 4.8rem;
    }

    .Profile-input {
        width: 8.7rem;
        font-size: 95%;
    }

    .Profile-visibility {
        transform: scale(1.8, 1.8) translateY(0.11rem);
        margin: 0 0.4rem 0 1rem;
    }

    #Profile-visibleSign {
        transform: translateX(1.1rem);
    }

    #Profile-visibleSign::after {
        top: 2.3rem;
        height: 13.8rem;
    }

    .Profile-packagesHeader {
        margin-bottom: 2rem;
    }
}

@media (min-width: 450px) {
    .Profile-label {
        width: 6rem;
    }

    .Profile-input {
        width: 9.5rem;
    }

    .Profile-visibility {
        transform: scale(1.9, 1.9) translateY(0.1rem);
        margin: 0 0.425rem 0 1rem;
    }

    #Profile-visibleSign {
        transform: translateX(1.1rem);
    }

    #Profile-visibleSign::after {
        top: 2.35rem;
        height: 14.1rem;
    }
}

@media (min-width: 500px) {
    .Profile-label {
        width: 6.2rem;
    }

    .Profile-input {
        width: 12rem;
    }

    .Profile-visibility {
        transform: scale(2, 2) translateY(0.07rem);
        margin: 0 0.5rem 0 1rem;
    }

    #Profile-visibleSign {
        width: 5rem;
        transform: translateX(1.55rem) translateY(-1rem);
    }

    #Profile-visibleSign::after {
        top: 2.55rem;
        height: 14.4rem;
    }
}

@media (min-width: 550px) {
    .Profile-label {
        width: 6.55rem;
    }

    .Profile-input {
        width: 13.5rem;
    }

    .Profile-visibility {
        transform: scale(2, 2) translateY(0.07rem);
        margin: 0 0.5rem 0 1.25rem;
    }

    #Profile-visibleSign::after {
        top: 2.7rem;
        height: 14.45rem;
    }
}

@media (min-width: 750px) {
    .Profile-label {
        width: 6.9rem;
    }

    .Profile-input {
        width: 23.5rem;
    }

    .Profile-visibility {
        transform: scale(2.25, 2.25) translateY(0.06rem);
        margin: 0 0.55rem 0 1.25rem;
    }

    #Profile-visibleSign::after {
        top: 1.5rem;
        height: 14.9rem;
    }
}

@media (min-width: 1000px) {
    .Profile-label {
        width: 7.2rem;
    }

    .Profile-input {
        width: 35.5rem;
    }

    .Profile-visibility {
        transform: scale(2.4, 2.4) translateY(0.05rem);
        margin: 0 0.6rem 0 1.25rem;
    }

    #Profile-visibleSign::after {
        height: 15.1rem;
    }
}

@media (min-width: 1250px) {
    .Profile-label {
        width: 8rem;
    }

    .Profile-input {
        width: 43rem;
        margin-bottom: 0.75rem;
    }

    .Profile-visibility {
        transform: scale(2.5, 2.5) translateY(-0.05rem);
        margin: 0 0.75rem 0 1.25rem;
    }

    #Profile-visibleSign::after {
        height: 16.7rem;
    }
}

@media (min-width: 1500px) {
    .Profile-label {
        width: 8.75rem;
    }

    .Profile-input {
        width: 57rem;
    }

    #Profile-visibleSign {
        width: 6rem;
        transform: translateX(1.55rem) translateY(-1rem);
    }

    #Profile-visibleSign::after {
        height: 17.1rem;
    }
}

@media (min-width: 1750px) {
    .Profile-label {
        width: 9.5rem;
    }

    .Profile-input {
        width: 60.5rem;
    }

    .Profile-visibility {
        margin: 0 0.9rem 0 1.75rem;
    }

    #Profile-visibleSign::after {
        width: 0.1rem;
        height: 17.6rem;
    }
}

@media (min-width: 2000px) {
    .Profile-label {
        width: 10rem;
    }

    .Profile-input {
        width: 59.5rem;
    }

    .Profile-visibility {
        margin: 0 0.95rem 0 2rem;
    }

    #Profile-visibleSign::after {
        height: 17.8rem;
    }
}`;

export default css;