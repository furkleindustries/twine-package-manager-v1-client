export function accountDeletingEnteredIdReducer(previous = '', action) {
	if (action.type === 'setAccountDeletingEnteredId') {
		if (typeof action.enteredId === 'string') {
			return action.enteredId;
		}
	}

	return previous;
}

export function accountDeletingMessageReducer(previous = '', action) {
	if (action.type === 'setAccountDeletingMessage') {
		if (typeof action.message === 'string') {
			return action.message;
		}
	}

	return previous;
}