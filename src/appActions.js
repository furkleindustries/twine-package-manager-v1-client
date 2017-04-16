export function setPanes(panes) {
	return {
		panes,
		type: 'setPanes',
	};
}

export function setSelectedPane(selectedPane) {
	return {
		selectedPane,
		type: 'setSelectedPane',
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