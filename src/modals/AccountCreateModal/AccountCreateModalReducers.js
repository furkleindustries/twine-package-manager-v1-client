export function accountCreatingNameReducer(previous = '', action) {
	if (action.type === 'setAccountCreatingName') {
		if (typeof(action.name) === 'string') {
			return action.name;
		}
	}

	return previous;
}

export function accountCreatingPasswordReducer(previous = '', action) {
	if (action.type === 'setAccountCreatingPassword') {
		if (typeof(action.password) === 'string') {
			return action.password;
		}
	}

	return previous;
}

export function accountCreatingEmailReducer(previous = '', action) {
	if (action.type === 'setAccountCreatingEmail') {
		if (typeof(action.email) === 'string') {
			return action.email;
		}
	}

	return previous;
}

export function accountCreatingErrorReducer(previous = '', action) {
	if (action.type === 'setAccountCreatingError') {
		if (typeof(action.error) === 'string') {
			return action.error;
		}
	}

	return previous;
}