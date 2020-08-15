const usersList = {};

const counter = () =>  {
    let count = 9;
    return () => {
      count += 1;
      return count;
    };
};

const nextId = counter();

function checkSessionId(sId){
    let found = false;
    for(user in usersList){
        if(usersList[user].sId == sId){
            found = true;
        }
    }
    return found;
}

function addUser(user, userId){
    if (!user.name || user.name.toUpperCase() === "DOG" || !(/^\S+$/.test(user.name))) {
        return 400;
    }
    const nextUserId = nextId();
    user.sId = userId;
    usersList[nextUserId] = user;
}

function deleteUser(sId){
    let userToBeDeleted = 0;
    for(user in usersList){
        if(usersList[user].sId == sId){
            userToBeDeleted = user;
        }
    }
    if (userToBeDeleted != 0) {
        delete usersList[userToBeDeleted];
    }
}

const addfunctions = {
    checkSessionId,
    addUser,
    deleteUser,
}

module.exports = addfunctions;