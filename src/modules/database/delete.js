import 'whatwg-fetch';

export async function account(id, csrfToken) {
	const params = {
		id,
		csrfToken,
	};

	return await fetch('https://furkleindustries.com/twinepm/userdata/', {
		method: 'DELETE',
		body: JSON.stringify(params),
		credentials: 'include',
	}).then(response => {
		return response.json();
	});
}

export async function _package(id, csrfToken) {
	const params = {
		id,
		csrfToken,
	};

	return await fetch('https://furkleindustries.com/twinepm/package/', {
		method: 'DELETE',
		credentials: 'include',
		body: JSON.stringify(params),
	}).then(response => {
		return response.json();
	});
}