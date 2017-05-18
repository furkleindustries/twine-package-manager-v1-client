// redux
import { combineReducers, } from 'redux';

export const profileReducer = combineReducers({
    id: profileIdReducer,
    dateCreated: profileDateCreatedReducer,
    dateCreatedVisible: profileDateCreatedVisibleReducer,
    name: profileNameReducer,
    nameVisible: profileNameVisibleReducer,
    description: profileDescriptionReducer,
    email: profileEmailReducer,
    emailVisible: profileEmailVisibleReducer,
    homepage: profileHomepageReducer,
    dateStyle: profileDateStyleReducer,
    timeStyle: profileTimeStyleReducer,
    packages: profilePackagesReducer,
    rollback: profileRollbackReducer,
});

export function profileIdReducer(previous = null, action) {
    if (action.type === 'setProfileId') {
        if ((action.id > 0 && action.id % 1 === 0) || action.id === null) {
            return action.id;
        }
    } else if (action.type === 'setProfile') {
        if ((action.profile.id > 0 && action.profile.id % 1 === 0) ||
                action.profile.id === null) {
            return action.profile.id;
        }
    }

    return previous;
}

export function profileNameReducer(previous = '', action) {
    if (action.type === 'setProfileName') {
        if (typeof action.name === 'string') {
            return action.name;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.name === 'string') {
            return action.profile.name;
        }
    }

    return previous;
}

export function profileNameVisibleReducer(previous = false, action) {
    if (action.type === 'setProfileNameVisible') {
        if (typeof action.visible === 'boolean') {
            return action.visible;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.nameVisible === 'boolean') {
            return action.profile.nameVisible;
        }
    }

    return previous;
}

export function profileDescriptionReducer(previous = '', action) {
    if (action.type === 'setProfileDescription') {
        if (typeof action.description === 'string') {
            return action.description;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.description === 'string') {
            return action.profile.description;
        }
    }

    return previous;
}

export function profileDateCreatedReducer(previous = null, action) {
    if (action.type === 'setProfileDateCreated') {
        if (action.dateCreated >= 0 || action.dateCreated === null) {
            return action.dateCreated;
        }
    } else if (action.type === 'setProfile') {
        if (action.profile.dateCreated >= 0 || action.dateCreated === null) {
            return action.profile.dateCreated;
        }
    }

    return previous;
}

export function profileDateCreatedVisibleReducer(previous = false, action) {
    if (action.type === 'setProfileDateCreatedVisible') {
        if (typeof action.visible === 'boolean') {
            return action.visible;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.dateCreatedVisible === 'boolean') {
            return action.profile.dateCreatedVisible;
        }
    }
    
    return previous;
}

export function profileEmailReducer(previous = '', action) {
    if (action.type === 'setProfileEmail') {
        if (typeof action.email === 'string') {
            return action.email;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.email === 'string') {
            return action.profile.email;
        }
    }
     
    return previous;
}

export function profileEmailVisibleReducer(previous = false, action) {
    if (action.type === 'setProfileEmailVisible') {
        if (typeof action.visible === 'boolean') {
            return action.visible;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.emailVisible === 'boolean') {
            return action.profile.emailVisible;
        }
    }
     
    return previous;
}

export function profileHomepageReducer(previous = '', action) {
    if (action.type === 'setProfileHomepage') {
        if (typeof action.homepage === 'string') {
            return action.homepage;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.homepage === 'string') {
            return action.profile.homepage;
        }
    }

    return previous;
}

export function profileDateStyleReducer(previous = 'mmdd', action) {
    if (action.type === 'setProfileDateStyle') {
        if (/^(mmdd|ddmm)$/.test(action.dateStyle)) {
            return action.dateStyle;
        }
    } else if (action.type === 'setProfile') {
        if (/^(mmdd|ddmm)$/.test(action.profile.dateStyle)) {
            return action.profile.dateStyle;
        }
    }

    return previous;
}

export function profileTimeStyleReducer(previous = '12h', action) {
    if (action.type === 'setProfileTimeStyle') {
        if (/^(12h|24h)$/.test(action.timeStyle)) {
            return action.timeStyle;
        }
    } else if (action.type === 'setProfile') {
        if (/^(12h|24h)$/.test(action.profile.timeStyle)) {
            return action.profile.timeStyle;
        }
    }

    return previous;
}

export function profilePackagesReducer(previous = [], action) {
    if (action.type === 'setProfilePackages') {
        if (action.packages &&
            typeof(action.packages) === 'object' &&
            'length' in action.packages)
        {
            return action.packages;
        }
    } else if (action.type === 'setProfile') {
        if (action.profile.packages &&
            typeof action.profile.packages === 'object' &&
            'length' in action.profile.packages)
        {
            return action.profile.packages;
        }
    }
     
    return previous;
}

export function profileMessageReducer(previous = '', action) {
    if (action.type === 'setProfileMessage') {
        if (typeof action.message === 'string') {
            return action.message;
        }
    }

    return previous;
}

export function profileRollbackReducer(previous = null, action) {
    if (action.type === 'setProfileRollback') {
        if (typeof action.rollback === 'object') {
            return action.rollback;
        }
    } else if (action.type === 'setProfile') {
        if (typeof action.profile.rollback === 'object') {
            return action.profile.rollback;
        }
    }

    return previous;
}