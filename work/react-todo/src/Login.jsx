import React, { useState, useContext } from 'react';
import spinner from './spinner.svg';
import AgendaContext from './context/AgendaContext';
const Login = () => {
  const agendaContext = useContext(AgendaContext);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const performLogin = () => {
    setIsLoading(true);
    agendaContext.setLoginStatus(username);
    setIsLoading(false);
  };

  return (
    <div className="login">
      <input
        className="user-info"
        placeholder="Enter User name"
        onChange={(e) => setUsername(e.target.value)}
      />
      {isLoading ? (
        <img alt="spinner" src={spinner} />
      ) : (
        <button className="to-login" onClick={performLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
