export function setAccountCreatingName(name) {
	return {
		name,
		type: 'setAccountCreatingName',
	};
}

export function setAccountCreatingPassword(password) {
	return {
		password,
		type: 'setAccountCreatingPassword',
	};
}

export function setAccountCreatingEmail(email) {
	return {
		email,
		type: 'setAccountCreatingEmail',
	};
}

export function setAccountCreatingMessage(message) {
	return {
		message,
		type: 'setAccountCreatingMessage',
	}
}