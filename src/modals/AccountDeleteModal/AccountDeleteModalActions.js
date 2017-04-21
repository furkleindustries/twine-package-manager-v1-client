export function setAccountDeletingEnteredId(enteredId) {
	return {
		enteredId,
		type: 'setAccountDeletingEnteredId',
	}
}

export function setAccountDeletingError(error) {
	return {
		error,
		type: 'setAccountDeletingError',
	}
}