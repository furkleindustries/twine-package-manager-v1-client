import { combineReducers, } from 'redux';

export function packagePublishingReducer(previous = null, action) {
    if (action.type === 'setPackagePublishing') {
        if (typeof action.publishing === 'object') {
            return action.publishing;
        }
    }

    return previous;
}

export function packagePublishingMessageReducer(previous = '', action) {
    if (action.type === 'setPackagePublishingMessage') {
        if (typeof action.message === 'string') {
            return action.message;
        }
    }

    return previous;
}

export function packageEditingNewOwnerReducer(previous = '', action) {
    if (action.type === 'setPackageEditingNewOwner') {
        if (typeof action.newOwner === 'string') {
            return action.newOwner;
        }
    }

    return previous;
}

export const packageEditingReducer = combineReducers({
    id: packageEditingIdReducer,
    dateCreated: packageEditingDateCreatedReducer,
    dateModified: packageEditingDateModifiedReducer,    
    name: packageEditingNameReducer,
    type: packageEditingTypeReducer,
    version: packageEditingVersionReducer,
    description: packageEditingDescriptionReducer,
    homepage: packageEditingHomepageReducer,
    js: packageEditingJsReducer,
    css: packageEditingCssReducer,
    keywords: packageEditingKeywordsReducer,
    tag: packageEditingTagReducer,
});

export function packageEditingIdReducer(previous = null, action) {
    if (action.type === 'setPackageEditingId') {
        if (action.id === null || action.id > 0) {
            return action.id;
        }
    } else if (action.type === 'setPackageEditing') {
        if (action.editing.id === null || action.editing.id > 0) {
            return action.editing.id;
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
        if (action.editing.dateCreated >= 0) {
            return action.editing.dateCreated;
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
        if (action.editing.dateModified >= 0) {
            return action.editing.dateModified;
        }
    }

    return previous;
}

export function packageEditingNameReducer(previous = '', action) {
    if (action.type === 'setPackageEditingName') {
        if (typeof action.name === 'string') {
            return action.name;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.name === 'string') {
            return action.editing.name;
        }
    }

    return previous;
}

const allTypes = [
    'macros',
    'scripts',
    'styles',
    'passagethemes',
    'storythemes',
];
export function packageEditingTypeReducer(previous = 'macros', action) {
    if (action.type === 'setPackageEditingType') {
        if (allTypes.indexOf(action.editingType) !== -1) {
            return action.editingType;
        }
    } else if (action.type === 'setPackageEditing') {
        if (allTypes.indexOf(action.editing.type) !== -1) {
            return action.editing.type;
        }
    }

    return previous;
}

export function packageEditingVersionReducer(previous = '', action) {
    if (action.type === 'setPackageEditingVersion') {
        if (typeof action.version === 'string') {
            return action.version;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.version === 'string') {
            return action.editing.version;
        }
    }

    return previous;
}

export function packageEditingDescriptionReducer(previous = '', action) {
    if (action.type === 'setPackageEditingDescription') {
        if (typeof action.description === 'string') {
            return action.description;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.description === 'string') {
            return action.editing.description;
        }
    }

    return previous;
}

export function packageEditingHomepageReducer(previous = '', action) {
    if (action.type === 'setPackageEditingHomepage') {
        if (typeof action.homepage === 'string') {
            return action.homepage;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.homepage === 'string') {
            return action.editing.homepage;
        }
    }

    return previous;
}

export function packageEditingJsReducer(previous = '', action) {
    if (action.type === 'setPackageEditingJs') {
        if (typeof action.js === 'string') {
            return action.js;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.js === 'string') {
            return action.editing.js;
        }
    }

    return previous;
}

export function packageEditingCssReducer(previous = '', action) {
    if (action.type === 'setPackageEditingCss') {
        if (typeof action.css === 'string') {
            return action.css;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.css === 'string') {
            return action.editing.css;
        }
    }

    return previous;
}

export function packageEditingKeywordsReducer(previous = '', action) {
    if (action.type === 'setPackageEditingKeywords') {
        if (typeof action.keywords === 'string') {
            return action.keywords;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.keywords === 'string') {
            return action.editing.keywords;
        }
    }

    return previous;
}

export function packageEditingTagReducer(previous = '', action) {
    if (action.type === 'setPackageEditingTag') {
        if (typeof action.tag === 'string') {
            return action.tag;
        }
    } else if (action.type === 'setPackageEditing') {
        if (typeof action.editing.tag === 'string') {
            return action.editing.tag;
        }
    }

    return previous;
}

export function packageEditingMessageReducer(previous = '', action) {
    if (action.type === 'setPackageEditingMessage') {
        if (typeof action.message === 'string') {
            return action.message;
        }
    }

    return previous;
}

export function packageDeletingReducer(previous = null, action) {
    if (action.type === 'setPackageDeleting') {
        if (typeof action.deleting === 'object') {
            return action.deleting;
        }
    }

    return previous;
}

export function packageDeletingMessageReducer(previous = '', action) {
    if (action.type === 'setPackageDeletingMessage') {
        if (typeof action.message === 'string') {
            return action.message;
        }
    }

    return previous;
}