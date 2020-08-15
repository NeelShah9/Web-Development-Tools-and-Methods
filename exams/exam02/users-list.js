const users = {
    "11": {
      username: "Neel",
      active: true,
      uid: '11',
    },
    "43": {
      username: "Nitin",
      active: true,
      uid: 43,
    },
};

function checkUIdExit(uId){
    if(users[uId]){
      return true;
    }else{
      return false;
    }
}

function addUser(username, uuid) {
    if (!username || username.toUpperCase().includes("DOG") || !(/^\S+$/.test(username))) {
      return 406;
    }
    users[uuid] = { username, active: true, uId: uuid };
}

function removeUser(uId) {
    if(users[uId]) {
        users[uId].active = false;
    }
    delete users[uId];
}

module.exports = {
    removeUser,
    addUser,
    checkUIdExit,
    users
};