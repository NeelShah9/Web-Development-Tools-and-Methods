const convertNetworkError = (err) => {
    return {
        code: 'NETWORK-ERROR',
        err
    };
};

const checkServerResponse = (response) => {
    if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
    }
    return response.json();
}

export const fetchLoginStatus = (username) => {
    return fetch('/session', {
        method: 'GET',
    })
        .catch(convertNetworkError)
        .then((checkServerResponse))
};

export const fetchLogin = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(convertNetworkError)
        .then((checkServerResponse))
};

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
        .catch(convertNetworkError)
        .then((checkServerResponse))
};

export const fetchUserList = () => {
    return fetch('/users', {
        method: 'GET',
    })
        .catch(convertNetworkError)
        .then(checkServerResponse)
};

export const fetchMessage = () => {
    return fetch('/chats', {
        method: 'GET',
    })
        .catch(convertNetworkError)
        .then(checkServerResponse)
};

export const fetchAddMessage = (textMsg, timestamp) => {
    return fetch('/chats', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ text: textMsg, timestamp }),
    })
        .catch(convertNetworkError)
        .then(checkServerResponse)
};