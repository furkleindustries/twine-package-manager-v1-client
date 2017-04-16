export function usernameReducer(previous = '', action) {
	if (action.type === 'setUsername') {
		if (typeof(action.username) === 'string') {
			return action.username;
		}
	}

	return previous;
}

export function passwordReducer(previous = '', action) {
	if (action.type === 'setPassword') {
		if (typeof(action.password) === 'string') {
			return action.password;
		}
	}

	return previous;
}

export function loginErrorReducer(previous = '', action) {
	if (action.type === 'setLoginError') {
		if (typeof(action.error) === 'string') {
			return action.error;
		}
	}

	return previous;
}

export function createAccountErrorReducer(previous = '', action) {
	if (action.type === 'setCreateAccountError') {
		if (typeof(action.error) === 'string') {
			return action.error;
		}
	}

	return previous;
}