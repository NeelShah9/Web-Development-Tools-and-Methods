/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recipes.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/recipes.js":
/*!************************!*\
  !*** ./src/recipes.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var appState = {
  isLoggedIn: false,
  recipesList: {},
  recipe: {},
  error: ''
};
var startPage = document.querySelector('.start-page');
var loginPage = document.querySelector('.login-page');
var recipeList = document.querySelector('.recipe-list');
var startPageLoggedIn = document.querySelector('.start-page-logged-in');
var addRecipePage = document.querySelector('.add-new-recipe-page');
var recipeDetailsPage = document.querySelector('.recipe-details-page');
var backLink = document.querySelector('.back-link');
var errorPage = document.querySelector('.status');
var recipeTitle = document.querySelector('.recipe-title');

function renderErrors(text) {
  errorPage.innerHTML = text;
}

function renderClearAllPage() {
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

function renderPages(pageName) {
  renderClearAllPage();
  renderErrors(appState.error);

  if (pageName === 'loginPage') {
    renderLoginPage();
    renderBackLink();
  }

  if (pageName === 'startPage') {
    renderHomePage();
    renderRecipeList();
  }

  if (pageName === 'startPageLoggedIn') {
    renderStartPageLoggedIn();
    renderRecipeList();
  }

  if (pageName === 'addRecipePage') {
    renderAddRecipePage();
    renderBackLink();
  }

  if (pageName === 'recipeDetailsPage') {
    renderDetailsPage(appState.recipe);
    renderBackLink();
  }
}

function renderLoginPage() {
  loginPage.innerHTML = "\n\t\t\t<label>Username: <input/></label>\n\t\t\t<button class=\"submit-button\" type=\"button\">Submit</button>";
}

function renderHomePage() {
  startPage.innerHTML = "\n\t\t<div class=\"display-panel\">\n\t\t\t\n\t\t\t<div>\n\t\t\t\t<button class=\"login-button\" type=\"button\">Login</button>\n\t\t\t</div>\n\t\t</div>";
}

function renderBackLink() {
  backLink.innerHTML = "\n\t\t<div class=\"back-home\">\n\t\t\t<a class=\"back-to-home\" href=\"https://www.backtostartpage.com\" title=\"click to go back to home page\">Go Back</a>\n\t\t</div> ";
}

function renderRecipeList() {
  var recipes = appState.recipesList;
  recipeList.innerHTML = "<ul class=\"recipes\">" + Object.keys(recipes).map(function (key) {
    var recipe = recipes[key];
    return "\n\t\t\t\t<li class=\"recipe-list\">\n\t\t\t\t\t<div class=\"recipe\">\n\t\t\t\t\t\t<a data-id=\"".concat(key, "\" class=\"recipe-title\" href=\"https://www.recipe4You.com\" title=\"click to get detailed recipe\">").concat(recipe.title, "</a>\n\t\t\t\t\t\t<span data-id=\"").concat(key, "\" class=\"recipe-author\">").concat(recipe.author, "</span>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t");
  }).join('\n') + "</ul>";
  recipeTitle.innerHTML = "\n\t\t\t<h3 class = \"recipe-title\" > Recipes: </h3> ";
}

function renderStartPageLoggedIn() {
  startPageLoggedIn.innerHTML = "\n\t\t<div class=\"display-panel\">\n\t\t\t\n\t\t\t<div class=\"add-a-recipe\">\n\t\t\t\t<button class=\"add-recipe-button\" type=\"button\">Add Recipe</button>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<button class=\"logout-button\" type=\"button\">Logout</button>\n\t\t\t</div>\n\t\t</div>";
}

function renderDetailsPage(recipe) {
  if (recipe != null) {
    recipeDetailsPage.innerHTML = "\n\t\t\t<div class=\"recipe-details-page\">\n\t\t\t\t<div>\n\t\t\t\t\t<h2> Recipe Author: </h2>\n\t\t\t\t\t<div class=\"author\"><span>".concat(recipe.author, "</span></div>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h2>Recipe Title: </h2>\n\t\t\t\t\t<div class=\"title\"><span>").concat(recipe.title, "</span></div>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h2> Recipe Ingredients: </h2>\n\t\t\t\t\t<div class=\"ingredients\"><span>").concat(recipe.ingredients, "</span></div>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h2>Recipe Instructions: </h2>\n\t\t\t\t\t<div class=\"instructions\"><span>").concat(recipe.instructions, "</span></div>\n\t\t\t\t</div>\n\t\t\t</div>  ");
  }
}

function renderAddRecipePage() {
  addRecipePage.innerHTML = "\n\t\t<div class=\"new-recipe\">\n\t\t\t<div class=\"new-title\">\n\t\t\t\tRECIPE-TITLE: <textarea class=\"new-recipe-title\" id=\"title\" name=\"title\" ></textarea>\n\t\t\t</div>\n\t\t\t<div class=\"new-ingredients\">\n\t\t\t\tRECIPE-INGREDIENTS: <textarea class=\"new-recipe-ingredients\" id=\"ingredients\" name=\"ingredients\"> </textarea>\n\t\t\t</div>\n\t\t\t<div class=\"new-instructions\">\n\t\t\t\tRECIPE-INSTRUCTIONS: <textarea class=\"new-recipe-instructions\" id=\"instructions\" name=\"instructions\" ></textarea>\n\t\t\t</div>\n\t\t\t<button class=\"recipe-submit-button\" type=\"submit\">SUBMIT RECIPE</button>\n\t\t</div>   ";
}

function getRecipeList() {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipesList"])().then(function (result) {
    appState.error = '';
    appState.recipesList = result.recipeList;

    if (appState.isLoggedIn) {
      renderPages('startPageLoggedIn');
    } else {
      renderPages('startPage');
    }
  })["catch"](function (result) {
    appState.recipesList = result.recipeList;
    appState.error = '';
    renderPages('startPage');
  });
}

function getRecipe(recipeId) {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipe"])(recipeId).then(function (result) {
    appState.error = '';
    appState.recipe = result.recipe;
    renderPages('recipeDetailsPage');
  })["catch"](function (result) {
    if (result.code === 'No recipe found') {
      appState.recipe = null;
      appState.error = result.code;
    } else {
      appState.recipe = result.recipe;
      appState.error = '';
    }

    renderPages('recipeDetailsPage');
  });
}

backLink.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('back-to-home')) {
    getRecipeList();
  }
});
startPage.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('login-button')) {
    renderPages('loginPage');
  }
});
loginPage.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('submit-button')) {
    var username = loginPage.querySelector('input').value;
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(username).then(function () {
      appState.isLoggedIn = true;
      getRecipeList();
    })["catch"](function (err) {
      appState.isLoggedIn = false;
      appState.error = err.code;
      renderPages('loginPage');
    });
  }
});
recipeList.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('recipe-title')) {
    var recipeId = e.target.dataset.id;
    getRecipe(recipeId);
  }
});
addRecipePage.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('recipe-submit-button')) {
    var _recipeTitle = addRecipePage.querySelector('.new-recipe-title').value;
    var recipeIngredients = addRecipePage.querySelector('.new-recipe-ingredients').value;
    var recipeInstructions = addRecipePage.querySelector('.new-recipe-instructions').value;
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchAddRecipe"])(_recipeTitle, recipeIngredients, recipeInstructions).then(function (recipe) {
      appState.error = '';
      appState.isLoggedIn = true;
      appState.recipe = recipe;
      renderPages('recipeDetailsPage');
    })["catch"](function (err) {
      appState.error = err.code;
      appState.isLoggedIn = true;
      renderPages('addRecipePage');
    });
  }
});
startPageLoggedIn.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('add-recipe-button')) {
    renderPages('addRecipePage');
  }
});
startPageLoggedIn.addEventListener('click', function (e) {
  e.preventDefault();

  if (!e.target.classList.contains('logout-button')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogout"])().then(function () {
    appState.error = '';
    appState.isLoggedIn = false;
    getRecipeList();
  })["catch"](function (err) {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPages('startPage');
  });
});
Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchInitialPage"])().then(function () {
  appState.isLoggedIn = true;
  getRecipeList();
})["catch"](function (err) {
  if (err.code == 'Initial Login') {
    appState.isLoggedIn = false;
    getRecipeList();
  } else {
    appState.isLoggedIn = false;
    appState.error = err.code;
    renderPages('startPage');
  }
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchInitialPage, fetchRecipesList, fetchRecipe, fetchAddRecipe, fetchLogout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogIn", function() { return fetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchInitialPage", function() { return fetchInitialPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipesList", function() { return fetchRecipesList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipe", function() { return fetchRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAddRecipe", function() { return fetchAddRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogout", function() { return fetchLogout; });
var fetchLogIn = function fetchLogIn(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
var fetchInitialPage = function fetchInitialPage() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
var fetchRecipesList = function fetchRecipesList() {
  return fetch('/recipes', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchRecipe = function fetchRecipe(recipeId) {
  return fetch("/recipe/".concat(recipeId), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchAddRecipe = function fetchAddRecipe(recipeTitle, recipeIngredients, recipeInstructions) {
  var recipe = {
    title: recipeTitle,
    ingredients: recipeIngredients,
    instructions: recipeInstructions
  };
  return fetch('/recipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      recipe: recipe
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchLogout = function fetchLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};

/***/ })

/******/ });
//# sourceMappingURL=recipes.js.map