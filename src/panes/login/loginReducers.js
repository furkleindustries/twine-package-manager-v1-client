export function usernameReducer(previous = '', action) {
	if (action.type === 'setUsername') {
		if (typeof action.username === 'string') {
			return action.username;
		}
	}

	return previous;
}

export function passwordReducer(previous = '', action) {
	if (action.type === 'setPassword') {
		if (typeof action.password === 'string') {
			return action.password;
		}
	}

	return previous;
}

export function loginMessageReducer(previous = '', action) {
	if (action.type === 'setLoginMessage') {
		if (typeof action.message === 'string') {
			return action.message;
		}
	}

	return previous;
}