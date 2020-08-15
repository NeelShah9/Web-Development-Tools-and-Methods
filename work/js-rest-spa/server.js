
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const items = require('./item-list');
const users = require('./user-list');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/session/', (req, res) => {
  let sId = req.cookies.sid;
  if(sId != null){
    if(!users.checkSessionId(sId)){
      res.status(400).json({ error: 'bad-login' });
      return;
    } else {
      res.json({statusCode: 100});
      return;
    }
  }
  res.json({statusCode: 200});
});

app.post('/session/', express.json(), (req, res) => {
  const newUser = req.body;
  const userId = Math.floor(Math.random() * 9990);
  const errorCode = users.addUser(newUser, userId);
  if(errorCode) {
    res.status(400).json({ error: 'bad-login' });
    return;
  }
  res.cookie('sid', userId);
  res.json(null);
});

app.delete('/session/', (req, res) => {
  const sId = req.cookies.sid;
  users.deleteUser(sId);
  res.clearCookie('sid');
  res.json(null);
});

app.get('/items/', (req, res) => {
  let sId = req.cookies.sid;
  if(sId == null){
    res.status(400).json({ error: 'sid-missing' });
    return;
  }
  if(!users.checkSessionId(sId)){
      res.status(400).json({ error: 'sid-unknown' });
      return;
  }
  
  res.json(items.getItems());
});

app.get('/items/:itemid', (req, res) => {
  const itemId = req.params.itemid;
  let sId = req.cookies.sid;
  if(sId == null){
    res.status(400).json({ error: 'sid-missing' });
    return;
  }
  if(!users.checkSessionId(sId)){
      res.status(400).json({ error: 'sid-unknown' });
      return;
  }
  const item = items.getItemById(itemId);
  if(item != null) {
    res.json(item);
  } else {
    res.status(404).json({ error: `Unknown user: ${itemId}`});
  }
});

app.post('/items/', express.json(), (req, res) => {
  const item = req.body;
  let sId = req.cookies.sid;
  if(sId == null){
    res.status(400).json({ error: 'sid-missing' });
    return;
  }
  if(!users.checkSessionId(sId)){
      res.status(400).json({ error: 'sid-unknown' });
      return;
  }
  const returnValue = items.addItem(item);
  if(returnValue == 400){
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if(returnValue == 409){
    res.status(409).json({ error: 'duplicate' });
    return;
  }
  res.json(returnValue);
});

app.patch('/items/:itemid', express.json(), (req, res) => {
  const item = req.body;
  const itemId = req.params.itemid;
  let sId = req.cookies.sid;
  if(sId == null){
    res.status(400).json({ error: 'sid-missing' });
    return;
  }
  if(!users.checkSessionId(sId)){
      res.status(400).json({ error: 'sid-unknown' });
      return;
  }
  const returnValue = items.updateTheItem(itemId, item);
  if(returnValue == 400) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if(returnValue == 409) {
    res.status(409).json({ error: 'not-found' });
    return;
  }
  res.json(returnValue);
});

app.delete('/items/:itemid', (req, res) => {
  const itemId = req.params.itemid;
  let sId = req.cookies.sid;
  if(sId == null){
    res.status(400).json({ error: 'sid-missing' });
    return;
  }
  if(!users.checkSessionId(sId)){
      res.status(400).json({ error: 'sid-unknown' });
      return;
  }
  const errorCode = items.deleteTheItem(itemId);
  if(errorCode == 400) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if(errorCode == 409) {
    res.status(409).json({ error: 'not-found' });
    return;
  }
  res.json(null);
});

app.listen(3000, ()=> console.log(`server is running`));