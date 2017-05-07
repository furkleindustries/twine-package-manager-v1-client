// metadata for each app pane
import appPanesSource from './panesSourceApp';

export function appPanesReducer(previous = appPanesSource, action) {
    if (action.type === 'setAppPanes') {
        if (action.panes && typeof action.panes === 'object') {
            return action.panes;
        }
    }

    return previous;
}

const startPane =
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1) ||
    'home';

export function appSelectedPaneReducer(previous = startPane, action) {
    if (action.type === 'setAppSelectedPane') {
        if (action.selectedPane && typeof action.selectedPane === 'string') {
            return action.selectedPane;
        }
    }

    return previous;
}

export function sideBarVisibleReducer(previous = false, action) {
    if (action.type === 'setSideBarVisible') {
        if (typeof action.visible === 'boolean') {
            return action.visible;
        }
    }

    return previous;
}

export function sideBarPanesReducer(previous = null, action) {
    if (action.type === 'setSideBarPanes') {
        if (action.panes === null ||
            (typeof action.panes === 'object' && action.panes))
        {
            return action.panes;
        }
    }

    return previous;
}

export function sideBarSelectedPaneReducer(previous = null, action) {
    if (action.type === 'setSideBarSelectedPane') {
        if (action.selectedPane === null ||
            typeof action.selectedPane === 'string')
        {
            return action.selectedPane;
        }
    }

    return previous;
}

export function csrfTokenReducer(previous = null, action) {
    if (action.type === 'setCSRFToken') {
        if (action.csrfToken && typeof action.csrfToken === 'string') {
            return action.csrfToken;
        }
    }

    return previous;
}

export function modalReducer(previous = null, action) {
    if (action.type === 'setModal') {
        if (typeof action.modal === 'object') {
            return action.modal;
        }
    }

    return previous;
}