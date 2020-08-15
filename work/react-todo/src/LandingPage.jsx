import React, { useContext } from 'react';

import AgendaContext from './context/AgendaContext';

const LandingPage = () => {
  const agendaContext = useContext(AgendaContext);

  const logout = () => {
    agendaContext.setLogout();
  };

  return (
    <div>
      <div className="header">AGENDA TRACKER</div>
      <div className="error-msg">{agendaContext.networkError}</div>
      <ul className="landing">
        {agendaContext.isLoggedIn && (
          <button className="logout action" onClick={logout}>
            Logout
          </button>
        )}
      </ul>
    </div>
  );
};

export default LandingPage;
