let userData = {
 
};

function checkUniqueID(cookies, res){
  if("uid" in cookies){
    if(!(cookies.uid in userData)){
      userData[cookies.uid] = {
        attemptedGuessWords: [],
        correctWords: [],
        word: "",
        turns: 0,
        uid: cookies.uid
      };
      return true;
    }
  }
  else{
    new_uid = Math.floor(Math.random() * 9000000) + 1000000;
    res.cookie("uid", new_uid);
    res.redirect("/");
  }
};

module.exports = {checkUniqueID, userData};