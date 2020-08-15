"use strict"
const gamePlay = require('./game');
const user = require('./user');

function wordListHtml(){
    return gamePlay.wordList.map(word => {
        return `<ul>${word}</ul>`
      }).join("\n");
}

function wordList(){
    return `
        <div class="list">
            <h3>List of Valid Words:</h3>
        <div class="scrollable">`
        +
        wordListHtml()
        +
        `</div>
        </div>`;
        
}

function guessedWord(uid){
    return `<div class="list">
    <h3>Rounds Won:</h3>
    <div class="scrollable">`
    +
    user.userData[uid].correctWords.map(word =>{
        return `<ul>${word}</ul>`
    }).join("\n")
    +
    `</div>
    </div>
    `};

function triedWords(uid){
    return `<div class="list">
    <h3><strong>Guesses:</strong></h3>
    <div class="scrollable">`
    + 
    user.userData[uid].attemptedGuessWords.map(attemptedWord => {
        return `<ul>${attemptedWord}</ul>`
    }).join("\n")
    +    
    `</div>
    </div>
    `};

function formData(){
    return `
    <div>
    <form class="form-data" align="center" action="/Game" method="POST">
    <h3><strong> Guess the word</strong>:&nbsp;</h3>
    <p><input class = "text-fields" name="guessWord" type="text" size="55" /></p>
    <p><br /> <input class="send-button" type="submit" value= " Guess! " /></p>
    </form>
    </div>`
};

function gamePage(uid){
    const wordListNew = wordList();
    const guessedWordList = guessedWord(uid);
    const triedWordList = triedWords(uid);
    const formDataNew = formData();
    let previousWrongAnswer = "";


    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="game.css" />
        <title>Play Game</title>
    </head>
    <body>
        <div id="game-page">
        <h2 align="center">Welcome To The Word Guessing Game!</h2>
        <div class="display-panel">
            ${wordListNew}
            ${guessedWordList}    
         </div>
        <div class="display-panel">
                ${triedWordList}
                ${formDataNew}
        </div>
        ${previousWrongAnswer}
    </body>
    </html>`;
};

module.exports = {gamePage};
