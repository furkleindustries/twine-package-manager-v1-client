import 'whatwg-fetch';

export async function accountCreation(name, password, email) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('email', email);

    const url = 'https://furkleindustries.com/twinepm/login/createAccount.php';
    return await fetch(url, {
        method: 'POST',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function accountUpdate(profile, csrfToken) {
    const formData = new FormData();
    Object.keys(profile).forEach(name => {
        formData.append(name, profile[name]);
    });

    formData.append('csrfToken', csrfToken);

    return await fetch('https://furkleindustries.com/twinepm/userdata/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return await fetch('https://furkleindustries.com/twinepm/login/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function logout(csrfToken) {
    const formData = new FormData();
    formData.append('csrfToken', csrfToken);

    const url = 'https://furkleindustries.com/twinepm/login/logout.php';
    return await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packageCreation(pkg, csrfToken) {
    const formData = new FormData();
    Object.keys(pkg).forEach(key => {
        formData.append(key, pkg[key]);
    });

    formData.append('csrfToken', csrfToken);

    const url = 'https://furkleindustries.com/twinepm/package/' +
        'createPackage.php';
    return await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packageOwnershipTransfer(packageId, newOwner, csrfToken) {
    const formData = new FormData();
    formData.append('packageId', packageId);
    formData.append('newOwner', newOwner);
    formData.append('csrfToken', csrfToken);

    const url = 'https://furkleindustries.com/twinepm/package/' +
        'ownershipTransfer.php';
    return await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packageUpdate(pkg, csrfToken) {
    const formData = new FormData();
    Object.keys(pkg).forEach(key => {
        formData.append(key, pkg[key]);
    });

    formData.append('csrfToken', csrfToken);

    fetch('https://furkleindustries.com/twinepm/package/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}

export async function packagePublish(id, published, csrfToken) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('published', published);
    formData.append('csrfToken', csrfToken);

    return await fetch('https://furkleindustries.com/twinepm/package/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        return response.json();
    });
}