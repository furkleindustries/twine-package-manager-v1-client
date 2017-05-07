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

export function setLoginMessage(message) {
	return {
		message,
		type: 'setLoginMessage',
	};
}