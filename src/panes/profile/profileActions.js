export function setProfile(profile) {
	return {
		profile,
		type: 'setProfile',
	};
}
export function setProfileId(id) {
	return {
		id,
		type: 'setProfileId',
	};
}

export function setProfileDateCreated(dateCreated) {
	return {
		dateCreated,
		type: 'setProfileDateCreated',
	};
}

export function setProfileDateCreatedVisible(visible) {
	return {
		visible,
		type: 'setProfileDateCreatedVisible',
	};
}

export function setProfileName(name) {
	return {
		name,
		type: 'setProfileName',
	};
}

export function setProfileNameVisible(visible) {
	return {
		visible,
		type: 'setProfileNameVisible',
	};
}

export function setProfileDescription(description) {
	return {
		description,
		type: 'setProfileDescription',
	};
}

export function setProfileEmail(email) {
	return {
		email,
		type: 'setProfileEmail',
	};
}

export function setProfileEmailVisible(visible) {
	return {
		visible,
		type: 'setProfileEmailVisible',
	};
}

export function setProfileHomepage(homepage) {
	return {
		homepage,
		type: 'setProfileHomepage',
	};
}

export function setProfilePackages(packages) {
	return {
		packages,
		type: 'setProfilePackages',
	};
}

export function setProfileDateStyle(dateStyle) {
	return {
		dateStyle,
		type: 'setProfileDateStyle',
	};
}

export function setProfileTimeStyle(timeStyle) {
	return {
		timeStyle,
		type: 'setProfileTimeStyle',
	};
}

export function setProfileMessage(message) {
	return {
		message,
		type: 'setProfileMessage',
	};
}

export function setProfileRollback(rollback) {
	return {
		rollback,
		type: 'setProfileRollback',
	}
}