export const fetchLogIn = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( result => Promise.reject(result) );
        }
        return;
    });
};

export const fetchInitialPage = () => {
    return fetch('/session', {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( result => Promise.reject(result) );
        }
        return;
    })
};

export const fetchRecipesList = () => {
    return fetch('/recipes', {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( result => Promise.reject(result) );
        }
        return response.json();
    });
};

export const fetchRecipe = (recipeId) => {
    return fetch(`/recipe/${recipeId}`, {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( result => Promise.reject(result) );
        }
        return response.json();
    });
};

export const fetchAddRecipe = (recipeTitle, recipeIngredients, recipeInstructions) => {
    const recipe = {
        title: recipeTitle,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
    };
    return fetch('/recipe', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({recipe}),
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( result => Promise.reject(result) );
        }
        return response.json();
    });
};

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE'
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( result => Promise.reject(result) );
        }
        return;
    });
};