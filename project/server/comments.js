const comments = {};

const addComments = (comments, username, commentsId, commentsText) => {
  comments[username] = comments[username] || {};
  comments[username][commentsId] = commentsText;

  return comments[username][commentsId];
};

const readComments = (comments, username, commentsId) => {
  if (!comments[username]) {
    return "";
  }
  return comments[username][commentsId];
};

const deleteComments = (comments, username, commentsId) => {
  if (!comments[username] || !comments[username][commentsId]) {
    return;
  }

  delete comments[username][commentsId];

  return;
};

module.exports = {
  comments,
  addComments,
  readComments,
  deleteComments,
};
