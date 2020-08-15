"use strict"
const user = require('./user');

function gameWinPage(uid){

    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="game.css" />
        <title>Play Game</title>
    </head>
    <body>
        <div class="winning-page">
        <h2 align="center">You won!</h2>
        <h2 align="center">You won the game in ${user.userData[uid].turns} turns</h2>
        <form class="form-data" align="center" action="/play" method="POST">
            <p><input class="send-button" align="center"  type="submit" name = "PlayAgain" value = "Play Again " /></p>
        </form>
    </body>
    </html>`;
};

function invalidGuess(){
    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="game.css" />
        <title>Play Game</title>
    </head>
    <body>
        <div class="invalid-guess-page">
        <h2 align="center">That is an Invalid word!</h2>
        <h3 align="center">Try Guessing a valid word!</h3>
        <form class="form-data" align="center" action="/" method="GET">
            <p><input class="send-button" align="center"  type="submit" name = "Retry" value = "Retry" /></p>
        </form>
    </body>
    </html>`;
};

module.exports = {gameWinPage, invalidGuess};