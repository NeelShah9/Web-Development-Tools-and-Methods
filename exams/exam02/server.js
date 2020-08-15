const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const recipes = require('./recipes-list');
const users = require('./users-list');
const { v4: uuidv4 } = require('uuid');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/session', (req, res) => {
	const uId = req.cookies.uid;
	if(!uId) {
		res.status(401).json({ code: 'Initial Login'});
		return;
	}
	if(!users.checkUIdExit(uId) ) {
		res.clearCookie('uid');
		res.status(403).json({ code: 'Initial Login'});
		return;
	}
	res.sendStatus(200);
});

app.post('/session', express.json(), (req, res) => {
	const username = req.body.username;
	const uId = uuidv4();
	if(!uId) {
		res.status(401).json({ code: 'UID missing'});
		return;
	}
	if(users.checkUIdExit(uId)) {
		res.clearCookie('uid');
		res.status(403).json({ code: 'Bad Login: Duplicate UID'});
		return;
	}
	const errorCode = users.addUser(username, uId);
	if(errorCode === 406) {
		res.status(406).json({ code: 'Login Failed : Invalid username'});
		return;
	}
	res.cookie('uid', uId);
	res.sendStatus(200);
});

app.get('/recipes', (req, res) => {
	const uId = req.cookies.uid;
	let errorMessage = '';
	if(!uId) {
		errorMessage = 'UID missing';
		res.status(401);
	}else if(!users.checkUIdExit(uId)) {
		errorMessage = 'Unknown UID';
		res.clearCookie('uid');
		res.status(403);
	}
	res.json({recipeList: recipes.getList(), code: errorMessage });
});

app.get('/recipe/:recipeId', (req, res) => {
	const recipeId = req.params.recipeId;
	const uId = req.cookies.uid;
	let errorMessage = '';
	if(!uId) {
		errorMessage = 'UID missing';
		res.status(401);
	}else if(!users.checkUIdExit(uId)) {
		errorMessage = 'Unknown UID';
		res.clearCookie('uid');
		res.status(403);
	}
	const recipe = recipes.getRecipe(recipeId);
	if(recipe != null) {
		res.json({recipe : recipe, code: errorMessage });
	} else {
		res.status(404).json({recipe : recipe, code: 'No recipe found' });
	}
});

app.post('/recipe', express.json(), (req, res) => {
	const uId = req.cookies.uid;
	if(!uId) {
		res.status(401).json({ code: 'UID missing'});
		return;
	}
	if(!users.checkUIdExit(uId)) {
		res.clearCookie('uid');
		res.status(403).json({ code: 'Unknown UID'});
		return;
	}
	const recipe = req.body.recipe;
	const output = recipes.addRecipe(uId, recipe);
	if(output.code == 406){
		res.status(406).json({ code: output.result});
		return;
	}
	res.json(output.result);
});

app.delete('/session', (req, res) => {
	const uId = req.cookies.uid;
	if(!uId) {
		res.status(401).json({ code: 'UID missing'});
		return;
	}
	if(!users.checkUIdExit(uId)) {
		res.clearCookie('uid');
		res.status(403).json({ code: 'Unknown UID'});
		return;
	}
	users.removeUser(uId);
	res.clearCookie('uid');
	res.sendStatus(200);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );