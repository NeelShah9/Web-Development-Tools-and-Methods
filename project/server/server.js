const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { sessions, addSession, deleteSession } = require("./sessions");
const {
  comments,
  addComments,
  readComments,
  deleteComments,
} = require("./comments");

app.use(cookieParser());
app.use(express.static("./build"));

app.get("/session", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid) {
    res.status(401).json({ error: "LOGIN_REQUIRED" });
    return;
  }
  if (!sessions[sid]) {
    res.clearCookie("sid");
    res.status(403).json({ error: "LOGIN_UNAUTHORIZED" });
    return;
  }
  const username = sessions[sid].username;
  res.status(200).json({ username: username });
});

//log in
app.post("/session", express.json(), (req, res) => {
  const { username } = req.body;
  res.clearCookie("sid");
  if (!username) {
    res.status(401).json({ error: "LOGIN_REQUIRED" });
  } else if (username.toUpperCase().includes("DOG")) {
    res.status(406).json({ error: "NOT_ACCEPTABLE" });
  } else if (username.includes(" ")) {
    res.status(406).json({ error: "NOT_ACCEPTABLE" });
  } else {
    const session = addSession({ username });
    res.cookie("sid", session.id);
    res.status(200).json({ username: session.username });
  }
});

//logout
app.delete("/session", (req, res) => {
  const sid = req.cookies.sid;
  res.clearCookie("sid");
  deleteSession(sid);
  res.sendStatus(200);
});

//read comments
app.get("/comments/:id", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    res.status(401).json({ error: "LOGIN_REQUIRED" });
    return;
  }
  const username = sessions[sid].username;
  const commentId = req.params.id;
  const comment = readComments(comments, username, commentId);
  res.status(200).json({ comment: comment });
});

//add comments
app.post("/comments", express.json(), (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    res.status(401).json({ error: "LOGIN_REQUIRED" });
    return;
  }

  const commentsText = req.body.comment;
  const commentsId = req.body.id;
  const username = sessions[sid].username;

  if (!commentsText) {
    res.status(406).json({ error: "MESSAGE_REQUIRED" });
    return;
  }
  addComments(comments, username, commentsId, commentsText);
  res.status(200).json({ comment: commentsText });
});

//delete comments
app.delete("/comments/:id", express.json(), (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    res.status(401).json({ error: "LOGIN_REQUIRED" });
    return;
  }

  const commentsId = req.params.id;
  const username = sessions[sid].username;
  deleteComments(comments, username, commentsId);
  res.status(200).json({ ok: true });
});

app.listen(5000, () => {
  console.log("listening at http://localhost:5000/");
});
