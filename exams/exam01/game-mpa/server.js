"use strict"

const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');


const game = require('./game');
const user = require('./user');
const gameWeb = require('./game-web');
const gameWin = require('./game-win');

app.use(cookieParser());

app.use(express.static('./public'));


app.get('/', (req, res) => {
  user.checkUniqueID(req.cookies, res);
  res.send(gameWeb.gamePage(req.cookies.uid));
});

app.post('/Game', express.urlencoded({ extended: false }), (req, res) => {
  user.checkUniqueID(req.cookies, res);
  let { guessWord } = req.body;
  guessWord = guessWord.toUpperCase();
  if(guessWord && (guessWord.length == game.wordList[0].length) && game.wordList.includes(guessWord)){
   let gameResult = game.wordGuessAttempt(guessWord, req.cookies.uid);
    if(gameResult){
      res.redirect("/winner");
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.send(gameWin.invalidGuess());
  }
});

app.get('/winner', (req, res) =>{
  user.checkUniqueID(req.cookies, res);
  res.send(gameWin.gameWinPage(req.cookies.uid));
});

app.post('/play', express.urlencoded({ extended: false }), (req, res) => {
  user.checkUniqueID(req.cookies, res);
  const { PlayAgain } = req.body;
  if(PlayAgain)
  {
    game.newGame(req.cookies.uid);
    res.redirect("/");
  };
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
