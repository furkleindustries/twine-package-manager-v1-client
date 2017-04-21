export function accountDeletingEnteredIdReducer(previous = '', action) {
	if (action.type === 'setAccountDeletingEnteredId') {
		if (typeof(action.enteredId) === 'string') {
			return action.enteredId;
		}
	}

	return previous;
}

export function accountDeletingErrorReducer(previous = '', action) {
	if (action.type === 'setAccountDeletingError') {
		if (typeof(action.error) === 'string') {
			return action.error;
		}
	}

	return previous;
}