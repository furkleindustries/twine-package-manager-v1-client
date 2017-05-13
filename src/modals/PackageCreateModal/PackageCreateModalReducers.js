import { combineReducers, } from 'redux';

export const packageCreatingReducer = combineReducers({
    name: packageCreatingNameReducer,
    type: packageCreatingTypeReducer,
    version: packageCreatingVersionReducer,
    description: packageCreatingDescriptionReducer,
    homepage: packageCreatingHomepageReducer,
    js: packageCreatingJsReducer,
    css: packageCreatingCssReducer,
    keywords: packageCreatingKeywordsReducer,
    tag: packageCreatingTagReducer,
});

export function packageCreatingNameReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingName') {
        if (typeof action.name === 'string') {
            return action.name;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof action.creating.name === 'string') {
            return action.creating.name;
        }
    }

    return previous;
}

const allTypes = [
    'macros',
    'scripts',
    'styles',
    'storythemes',
    'passagethemes',
];
export function packageCreatingTypeReducer(previous = 'macros', action) {
    if (action.type === 'setPackageCreatingType') {
        if (allTypes.indexOf(action.creatingType) !== -1) {
            return action.creatingType;
        }
    } else if (action.type === 'setPackageCreating') {
        if (allTypes.indexOf(action.creating.type) !== -1) {
            return action.creating.type;
        }
    }

    return previous;
}

export function packageCreatingVersionReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingVersion') {
        if (typeof action.version === 'string') {
            return action.version;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof action.creating.version === 'string') {
            return action.creating.version;
        }
    }

    return previous;
}

export function packageCreatingDescriptionReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingDescription') {
        if (typeof action.description === 'string') {
            return action.description;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof action.creating.description === 'string') {
            return action.creating.description;
        }
    }

    return previous;
}

export function packageCreatingHomepageReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingHomepage') {
        if (typeof action.homepage === 'string') {
            return action.homepage;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof action.creating.homepage === 'string') {
            return action.creating.homepage;
        }
    }

    return previous;
}

export function packageCreatingJsReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingJs') {
        if (typeof action.js === 'string') {
            return action.js;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof(action.creating.js) === 'string') {
            return action.creating.js;
        }
    }

    return previous;
}

export function packageCreatingCssReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingCss') {
        if (typeof action.css === 'string') {
            return action.css;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof action.creating.css === 'string') {
            return action.creating.css;
        }
    }

    return previous;
}

export function packageCreatingKeywordsReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingKeywords') {
        if (typeof action.keywords === 'string') {
            return action.keywords;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof action.creating.keywords === 'string') {
            return action.creating.keywords;
        }
    }

    return previous;
}

export function packageCreatingTagReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingTag') {
        if (typeof action.tag === 'string') {
            return action.tag;
        }
    } else if (action.type === 'setPackageCreating') {
        if (typeof action.creating.tag === 'string') {
            return action.creating.tag;
        }
    }

    return previous;
}

export function packageCreatingMessageReducer(previous = '', action) {
    if (action.type === 'setPackageCreatingMessage') {
        if (typeof action.message === 'string') {
            return action.message;
        }
    }

    return previous;
}