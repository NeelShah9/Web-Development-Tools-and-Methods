import React, { useContext } from 'react';

import LandingPage from './LandingPage';
import Home from './Home';
import './app.css';
import AgendaContext from './context/AgendaContext';

const App = () => {
  const agendaContext = useContext(AgendaContext);

  return (
    <>
      <div className={`app ${agendaContext.theme ? agendaContext.theme : ''}`}>
        <LandingPage />
        <Home />
      </div>
    </>
  );
};

export default App;
