"use strict"
const words = require('./words.js');
const user = require('./user');

const wordList = words.wordList.split(/\s+/).filter( exists => !!exists );

const correctWords = [];
let previousWrongAnswer = false;

let game = {
  word: pickWord(wordList),
  turns: 0,
  attemptedGuessWords: []
};

if(process.env.DEBUG) { console.log(`PSST!  The word is ${game.word}`); }

function wordGuessAttempt(guess, uid) {
  return takeTurn(game, guess.toUpperCase(), uid);
}

function getIncorrectPrevAttempt(){
  return previousWrongAnswer;
}

function takeTurn(game, guess, uid) {
  if(!(guess.length == game.word.length) || !wordList.includes(guess)) {
    previousWrongAnswer = true;
    return false;
  }
  previousWrongAnswer = false;

  user.userData[uid].turns++;

  if(user.userData[uid].word == ""){
    user.userData[uid].word = pickWord(wordList);
  }
  if(exactMatch(user.userData[uid].word, guess)) {
    user.userData[uid].correctWords.unshift(`${user.userData[uid].word} in ${user.userData[uid].turns} turns!`);
    return true;
  }
  const match = compare(game.word, guess);
  user.userData[uid].attemptedGuessWords.unshift(`${guess} matched ${match} letters out of ${user.userData[uid].word.length}`);
  return false;
}

function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase(); 
}

function pickWord(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function compare( word, guess ) {  
  guess = guess.toLowerCase();
  word = word.toLowerCase();
  let count = 0;
  for( let letter of word){
  
    if(guess.includes(letter)){
      guess = guess.replace(letter,'');
      count++;
    };
       };
  return count;
  }

function newGame(uid) {
    user.userData[uid].word = pickWord(wordList);
    user.userData[uid].turns =  0;
    user.userData[uid].attemptedGuessWords = [];
  };



  module.exports = {wordList, wordGuessAttempt, correctWords, game, getIncorrectPrevAttempt, newGame};