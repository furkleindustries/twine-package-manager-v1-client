import { combineReducers } from 'redux';

export function packagePublishingReducer(previous = null, action) {
    if (action.type === 'setPackagePublishing') {
        if (typeof(action.packagePublishing) === 'object') {
            return action.packagePublishing;
        }
    }

    return previous;
}

export function packagePublishingErrorReducer(previous = '', action) {
    if (action.type === 'setPackagePublishingError') {
        if (typeof(action.packagePublishingError) === 'string') {
            return action.packagePublishingError;
        }
    }

    return previous;
}

export const packageEditingReducer = combineReducers({
    id: packageEditingIdReducer,
    dateCreated: packageEditingDateCreatedReducer,
    dateModified: packageEditingDateModifiedReducer,    
    name: packageEditingNameReducer,
    version: packageEditingVersionReducer,
    description: packageEditingDescriptionReducer,
    homepage: packageEditingHomepageReducer,
    js: packageEditingJsReducer,
    css: packageEditingCssReducer,
    keywords: packageEditingKeywordsReducer,
    tag: packageEditingTagReducer,
    error: packageEditingErrorReducer,
});

export function packageEditingErrorReducer(previous = '', action) {
    if (action.type === 'setPackageEditingError') {
        if (typeof(action.error) === 'string') {
            return action.error;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.error) === 'string') {
            return action.packageEditing.error;
        }
    }

    return previous;
}

export function packageRemovingReducer(previous = null, action) {
    if (action.type === 'setPackageRemoving') {
        if (typeof(action.packageRemoving) === 'object') {
            return action.packageRemoving;
        }
    }

    return previous;
}

export function packageRemovingErrorReducer(previous = '', action) {
    if (action.type === 'setPackageRemovingError') {
        if (typeof(action.packageRemovingError) === 'string') {
            return action.packageRemovingError;
        }
    }

    return previous;
}

export function packageEditingIdReducer(previous = '', action) {
    if (action.type === 'setPackageEditingId') {
        if (action.id === '' || action.id > 0) {
            return action.id;
        }
    } else if (action.type === 'setPackageEditing') {
        if (action.packageEditing.id === '' || action.packageEditing.id > 0) {
            return action.packageEditing.id;
        }
    }

    return previous;
}

export function packageEditingDateCreatedReducer(previous = 0, action) {
    if (action.type === 'setPackageEditingDateCreated') {
        if (action.dateCreated >= 0) {
            return action.dateCreated;
        }
    } else if (action.type === 'setPackageEditing') {
        if (action.packageEditing.dateCreated >= 0) {
            return action.packageEditing.dateCreated;
        }
    }

    return previous;
}

export function packageEditingDateModifiedReducer(previous = 0, action) {
    if (action.type === 'setPackageEditingDateModified') {
        if (action.dateModified >= 0) {
            return action.dateModified;
        }
    } else if (action.type === 'setPackageEditing') {
        if (action.packageEditing.dateModified >= 0) {
            return action.packageEditing.dateModified;
        }
    }

    return previous;
}

export function packageEditingNameReducer(previous = '', action) {
    if (action.type === 'setPackageEditingName') {
        if (typeof(action.name) === 'string') {
            return action.name;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.name) === 'string') {
            return action.packageEditing.name;
        }
    }

    return previous;
}

export function packageEditingVersionReducer(previous = '', action) {
    if (action.type === 'setPackageEditingVersion') {
        if (typeof(action.version) === 'string') {
            return action.version;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.version) === 'string') {
            return action.packageEditing.version;
        }
    }

    return previous;
}

export function packageEditingDescriptionReducer(previous = '', action) {
    if (action.type === 'setPackageEditingDescription') {
        if (typeof(action.description) === 'string') {
            return action.description;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.description) === 'string') {
            return action.packageEditing.description;
        }
    }

    return previous;
}

export function packageEditingHomepageReducer(previous = '', action) {
    if (action.type === 'setPackageEditingHomepage') {
        if (typeof(action.homepage) === 'string') {
            return action.homepage;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.homepage) === 'string') {
            return action.packageEditing.homepage;
        }
    }

    return previous;
}

export function packageEditingJsReducer(previous = '', action) {
    if (action.type === 'setPackageEditingJs') {
        if (typeof(action.js) === 'string') {
            return action.js;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.js) === 'string') {
            return action.packageEditing.js;
        }
    }

    return previous;
}

export function packageEditingCssReducer(previous = '', action) {
    if (action.type === 'setPackageEditingCss') {
        if (typeof(action.css) === 'string') {
            return action.css;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.css) === 'string') {
            return action.packageEditing.css;
        }
    }

    return previous;
}

export function packageEditingKeywordsReducer(previous = '', action) {
    if (action.type === 'setPackageEditingKeywords') {
        if (typeof(action.keywords) === 'string') {
            return action.keywords;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.keywords) === 'string') {
            return action.packageEditing.keywords;
        }
    }

    return previous;
}

export function packageEditingTagReducer(previous = '', action) {
    if (action.type === 'setPackageEditingTag') {
        if (typeof(action.tag) === 'string') {
            return action.tag;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof(action.packageEditing.tag) === 'string') {
            return action.packageEditing.tag;
        }
    }

    return previous;
}