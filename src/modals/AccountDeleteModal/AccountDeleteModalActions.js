export function setAccountDeletingEnteredId(enteredId) {
	return {
		enteredId,
		type: 'setAccountDeletingEnteredId',
	}
}

export function setAccountDeletingMessage(message) {
	return {
		message,
		type: 'setAccountDeletingMessage',
	}
}