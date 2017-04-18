import 'whatwg-fetch';

export default function getProfile() {
    return fetch(`https://furkleindustries.com/twinepm/userdata/?csrfToken=${localStorage.twinepmCSRFToken}`, {
        credentials: 'include',
    });
}