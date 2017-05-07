export function setAppPanes(panes) {
    return {
        panes,
        type: 'setAppPanes',
    };
}

export function setAppSelectedPane(selectedPane) {
    return {
        selectedPane,
        type: 'setAppSelectedPane',
    };
}

export function setSideBarVisible(visible) {
    return {
        visible,
        type: 'setSideBarVisible',
    }
}

export function setSideBarPanes(panes) {
    return {
        panes,
        type: 'setSideBarPanes',
    };
}

export function setSideBarSelectedPane(selectedPane) {
    return {
        selectedPane,
        type: 'setSideBarSelectedPane',
    };
}

export function setModal(modal) {
    return {
        modal,
        type: 'setModal',
    };
}

export function setCSRFToken(csrfToken) {
    return {
        csrfToken,
        type: 'setCSRFToken',
    };
}