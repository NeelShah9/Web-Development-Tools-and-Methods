import React, { useState, useEffect, useCallback } from 'react';
import { fetchLoginStatus, fetchUserList, fetchMessage } from './services';
import useInterval from './Timer';
import Authenticate from './Authenticate';
import Login from './Login';
import Users from './Users';
import Message from './Message';
import NewMessage from './NewMessage';
import messages from './messages';
import './App.css';

const App = () => {
  const [userLogin, setUserLogin] = useState({ isLoggedIn: false });
  const [stateUserList, setStateUserList] = useState([]);
  const [stateMessage, setStateMessage] = useState([]);
  const [error, setError] = useState('');

  const getChats = useCallback(() => {
    getUsers();
    getMessages();
  }, []);

  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setUserLogin({
          isLoggedIn: true,
          username: userInfo.username
        });
        if (userLogin.isLoggedIn) {
          getChats();
        }
        setError('');
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  }, [getChats, userLogin.isLoggedIn]);

  const login = username => {
    setUserLogin({
      isLoggedIn: true,
      username
    });
    getChats();
  };

  const logout = () => {
    setUserLogin({
      isLoggedIn: false
    });
  };

  const getUsers = () => {
    fetchUserList()
      .then(usersList => {
        setStateUserList(Object.values(usersList));
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  };

  const getMessages = () => {
    fetchMessage()
      .then(messageList => {
        setStateMessage(messageList);
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  };

  useInterval(() => {
    if (userLogin.isLoggedIn) {
      getChats();
    }
  }, 3000);

  let content;

  const checkError = errCode => {
    if (errCode === 'LOGIN_REQUIRED' || errCode === 'UNAUTHORIZED_LOGIN') {
      logout();
    }
  };

  if (userLogin.isLoggedIn) {
    content = (
      <>
        <NewMessage onAddMessage={getMessages} onError={checkError} />
        <div className="container">
          <Users userList={stateUserList} />
          <Message messageList={stateMessage} />
        </div>
      </>
    );
  } else {
    content = <Login onLogin={login} />;
  }

  return (
    <div className="app">
      <Authenticate user={userLogin} onLogout={logout} onError={checkError} />
      <p>{error}</p>
      {content}
    </div>
  );
};

export default App;