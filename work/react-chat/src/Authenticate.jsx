import React, { useState } from 'react';
import { fetchLogout } from './services';
import messages from './messages';

const Authenticate = ({ user, onLogout, onError }) => {
  const [error, setError] = useState('');

  const logout = () => {
    fetchLogout()
      .then(() => {
        onLogout();
      })
      .catch(err => {
        onError(err.code);
        setError(messages[err.code || 'DEFAULT']);
      });
  };
  return (
    <div>
      <ul className="authenticate">
        {user.username && <li> {user.username}</li>}
        <p className="title-header">ChatApp</p>
        {user.isLoggedIn && (
          <button className="logout action" onClick={logout}>
            LOGOUT
          </button>
        )}
      </ul>
      <p>{error}</p>
    </div>
  );
};

export default Authenticate;