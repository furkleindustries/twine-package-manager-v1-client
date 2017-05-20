import 'whatwg-fetch';

export async function userdata(antiCSRFToken) {
	const url = 'https://furkleindustries.com/twinepm/userdata/' +
        `?csrfToken=${antiCSRFToken}`;
    return await fetch(url, {
        credentials: 'include',
    }).then(response => {
        return response.json();
    });
}

export async function search(paramStr, antiCSRFToken) {
    const url = `https://furkleindustries.com/twinepm/search/${paramStr}`;
    return await fetch(url).then(response => response.json());
}