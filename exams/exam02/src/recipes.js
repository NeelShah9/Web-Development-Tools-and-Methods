import {
	fetchLogIn,
	fetchInitialPage,
	fetchRecipesList,
	fetchAddRecipe,
	fetchLogout,
	fetchRecipe,
} from './services';

const appState = {
		isLoggedIn: false,
		recipesList: {},
		recipe: {},
		error: '',
};

const startPage = document.querySelector('.start-page');
const loginPage = document.querySelector('.login-page');
const recipeList = document.querySelector('.recipe-list');
const startPageLoggedIn = document.querySelector('.start-page-logged-in');
const addRecipePage = document.querySelector('.add-new-recipe-page');
const recipeDetailsPage = document.querySelector('.recipe-details-page');
const backLink = document.querySelector('.back-link');
const errorPage = document.querySelector('.status');
const recipeTitle = document.querySelector('.recipe-title');

function renderErrors( text ) {
	errorPage.innerHTML = text;
}

function renderClearAllPage(){
	startPage.innerHTML = '';
	startPageLoggedIn.innerHTML = '';
	loginPage.innerHTML = '';
	recipeList.innerHTML = '';
	recipeDetailsPage.innerHTML = '';
	backLink.innerHTML = '';
	addRecipePage.innerHTML = '';
	errorPage.innerHTML = '';
	recipeTitle.innerHTML = '';
}

function renderPages(pageName){
	renderClearAllPage();
	renderErrors(appState.error);
	if(pageName === 'loginPage'){
		renderLoginPage();
		renderBackLink();
	}
	if(pageName === 'startPage'){
		renderHomePage();
		renderRecipeList();
	}
	if(pageName === 'startPageLoggedIn'){
		renderStartPageLoggedIn();
		renderRecipeList();
	}
	if(pageName === 'addRecipePage'){
		renderAddRecipePage();
		renderBackLink();
	}
	if(pageName === 'recipeDetailsPage'){
		renderDetailsPage(appState.recipe);
		renderBackLink();
	}
}

function renderLoginPage(){
	loginPage.innerHTML = `
			<label>Username: <input/></label>
			<button class="submit-button" type="button">Submit</button>`;
}

function renderHomePage(){
	startPage.innerHTML = `
		<div class="display-panel">
			
			<div>
				<button class="login-button" type="button">Login</button>
			</div>
		</div>`
}

function renderBackLink(){
	backLink.innerHTML = `
		<div class="back-home">
			<a class="back-to-home" href="https://www.backtostartpage.com" title="click to go back to home page">Go Back</a>
		</div> `;
}

function renderRecipeList(){
	const recipes = appState.recipesList;
	recipeList.innerHTML = `<ul class="recipes">` +
		Object.keys(recipes).map( (key) => {
			const recipe = recipes[key];
			return `
				<li class="recipe-list">
					<div class="recipe">
						<a data-id="${key}" class="recipe-title" href="https://www.recipe4You.com" title="click to get detailed recipe">${recipe.title}</a>
						<span data-id="${key}" class="recipe-author">${recipe.author}</span>
					</div>
				</li>
			`;
		}).join('\n') +
	`</ul>`;

	recipeTitle.innerHTML = `
			<h3 class = "recipe-title" > Recipes: </h3> `;
}

function renderStartPageLoggedIn(){
	startPageLoggedIn.innerHTML = `
		<div class="display-panel">
			
			<div class="add-a-recipe">
				<button class="add-recipe-button" type="button">Add Recipe</button>
			</div>
			<div>
				<button class="logout-button" type="button">Logout</button>
			</div>
		</div>`
}

function renderDetailsPage(recipe){
	if(recipe != null){
		recipeDetailsPage.innerHTML = `
			<div class="recipe-details-page">
				<div>
					<h2> Recipe Author: </h2>
					<div class="author"><span>${recipe.author}</span></div>
				</div>
				<div>
					<h2>Recipe Title: </h2>
					<div class="title"><span>${recipe.title}</span></div>
				</div>
				<div>
					<h2> Recipe Ingredients: </h2>
					<div class="ingredients"><span>${recipe.ingredients}</span></div>
				</div>
				<div>
					<h2>Recipe Instructions: </h2>
					<div class="instructions"><span>${recipe.instructions}</span></div>
				</div>
			</div>  `
	}
}

function renderAddRecipePage(){
	addRecipePage.innerHTML = `
		<div class="new-recipe">
			<div class="new-title">
				RECIPE-TITLE: <textarea class="new-recipe-title" id="title" name="title" ></textarea>
			</div>
			<div class="new-ingredients">
				RECIPE-INGREDIENTS: <textarea class="new-recipe-ingredients" id="ingredients" name="ingredients"> </textarea>
			</div>
			<div class="new-instructions">
				RECIPE-INSTRUCTIONS: <textarea class="new-recipe-instructions" id="instructions" name="instructions" ></textarea>
			</div>
			<button class="recipe-submit-button" type="submit">SUBMIT RECIPE</button>
		</div>   `
}

function getRecipeList(){
	fetchRecipesList()
	.then((result) => {
		appState.error = '';
		appState.recipesList  = result.recipeList;
		if(appState.isLoggedIn){
			renderPages('startPageLoggedIn');
		}else{
			renderPages('startPage');
		}
	})
	.catch( (result) => {
		appState.recipesList = result.recipeList;
		appState.error = '';
		renderPages('startPage');
	});
}

function getRecipe(recipeId){
	fetchRecipe(recipeId)
	.then((result) => {
		appState.error = '';
		appState.recipe = result.recipe;
		renderPages('recipeDetailsPage');
	})
	.catch( (result) => {
		if(result.code === 'No recipe found'){
			appState.recipe = null;
			appState.error = result.code;
		}else{
			appState.recipe = result.recipe;
			appState.error = '';
		}
		renderPages('recipeDetailsPage');
	});
}

backLink.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('back-to-home')) {
		getRecipeList();
	}
});

startPage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('login-button')) {
		renderPages('loginPage');
	}
});

loginPage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('submit-button')) {
		const username = loginPage.querySelector('input').value;
		fetchLogIn(username)
		.then( () => {
			appState.isLoggedIn = true;
			getRecipeList();
		})
		.catch( (err) => {
			appState.isLoggedIn = false;
			appState.error = err.code;
			renderPages('loginPage');
		});
	}
});

recipeList.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('recipe-title')) {
		const recipeId = e.target.dataset.id;
		getRecipe(recipeId);
	}
});

addRecipePage.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('recipe-submit-button')) {
		const recipeTitle = addRecipePage.querySelector('.new-recipe-title').value;
		const recipeIngredients = addRecipePage.querySelector('.new-recipe-ingredients').value;
		const recipeInstructions = addRecipePage.querySelector('.new-recipe-instructions').value;
		fetchAddRecipe(recipeTitle, recipeIngredients, recipeInstructions)
		.then( (recipe) => {
			appState.error = '';
			appState.isLoggedIn = true;
			appState.recipe = recipe;
			renderPages('recipeDetailsPage');
		})
		.catch( (err) => {
			appState.error = err.code;
			appState.isLoggedIn = true;
			renderPages('addRecipePage');
		});
	}
});

startPageLoggedIn.addEventListener('click', (e) => {
	e.preventDefault();
	if(e.target.classList.contains('add-recipe-button')) {
		renderPages('addRecipePage');
	}
});

startPageLoggedIn.addEventListener('click', (e) => {
	e.preventDefault();
	if(!e.target.classList.contains('logout-button')) {
		return;
	}
	fetchLogout()
	.then( () => {
		appState.error = '';
		appState.isLoggedIn = false;
		getRecipeList();
	})
	.catch( (err) => {
		appState.isLoggedIn = false;
		appState.error = err.code;
		renderPages('startPage');
	});
});

fetchInitialPage()
.then( () => {
	appState.isLoggedIn = true;
	getRecipeList();
})
.catch( (err) => {
	if(err.code == 'Initial Login'){
		appState.isLoggedIn = false;
		getRecipeList();
	}else{
		appState.isLoggedIn = false;
		appState.error = err.code;
		renderPages('startPage');
	}
});