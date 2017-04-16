export function setLoginError(error) {
	return {
		error,
		type: 'setLoginError',
	};
}

export function setCreateAccountError(error) {
	return {
		error,
		type: 'setCreateAccountError',
	};
}

export function setUsername(username) {
	return {
		username,
		type: 'setUsername',
	};
}

export function setPassword(password) {
	return {
		password,
		type: 'setPassword',
	};
}