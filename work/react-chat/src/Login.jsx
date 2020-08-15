import React, { useState } from 'react';
import { fetchLogin } from './services';
import messages from './messages';
import spinner from './spinner.svg';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const renderLogin = () => {
    if (!username) {
      setError(messages.USERNAME_REQUIRED);
      return;
    }
    setError('');
    setLoading(true);
    fetchLogin(username)
      .then(userInfo => {
        onLogin(userInfo.username);
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
        setLoading(false);
        setUsername('');
      });
  };

  const onChange = e => setUsername(e.target.value);

  return (
    <div className="login">
      <p className="error">{error}</p>
      <input onChange={onChange} value={username} />
      {Loading ? (
        <img alt="spinner" src={spinner} />
      ) : (
        <button onClick={renderLogin}>LOGIN</button>
      )}
    </div>
  );
};

export default Login;