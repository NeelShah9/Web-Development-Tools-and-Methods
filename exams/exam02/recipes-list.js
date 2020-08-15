const users = require('./users-list');

const counter = () =>  {
    let count = 5;
    return () => {
      count += 1;
      return count;
    };
};

const nextId = counter();

const recipes = {
    "1" : {
        id: "1",
        author: "Neel",
        title: "French Omlet",
        ingredients:  `
		2 Eggs
		Oil
		chives
		rosemary
		
         `,
        instructions: `
        Add butter to pan, let heat and then add 2 beaten eggs, add  finely chopped chives and rosemary
		stir before the eggs set, flip for proper cooking, enjoy!`
    }
};

function addRecipe( uId, recipe ) {
    const nextRecipeId = nextId();
    let errorMessage = '';
    if(!recipe.title){
        errorMessage = errorMessage + 'Title ';
    }
    if(!recipe.ingredients){
        errorMessage = errorMessage + 'Ingredients ';
    }
    if(!recipe.instructions){
        errorMessage = errorMessage + 'Instructions ';
    }
    if(errorMessage != ''){
        errorMessage = errorMessage + 'field empty';
        return {code: 406, result: errorMessage};
    }
    recipes[nextRecipeId] = { id: nextRecipeId, author: users.users[uId].username, title: recipe.title,
                              ingredients: recipe.ingredients, instructions: recipe.instructions};
    return {code: 0, result: recipes[nextRecipeId]};
}

function getList(){
    return recipes;
}

function getRecipe(recipeId){
    if(recipes[recipeId]) {
        return recipes[recipeId];
    } else {
        return null;
    }
}

module.exports = {
    addRecipe,
    getList,
    getRecipe,
    recipes,
};