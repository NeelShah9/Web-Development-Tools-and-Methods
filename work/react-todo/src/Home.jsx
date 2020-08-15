import React, { useContext, useEffect } from 'react';
import AgendaContext from './context/AgendaContext';
import Theme from './Theme';
import Agendas from './Agendas';
import Login from './Login';

const Home = () => {
  const agendaContext = useContext(AgendaContext);

  useEffect(
    () => {
      agendaContext.getLoginStatus();
    },

    []
  );

  let content;

  if (agendaContext.isLoggedIn) {
    content = (
      <>
        <div className="second-header">
          What is your main agenda today {agendaContext.username.toUpperCase()} ?
          <Theme />
        </div>
        <p className="error-msg">{agendaContext.error}</p>

        <Agendas />
      </>
    );
  } else {
    content = <Login />;
  }

  return <div>{content}</div>;
};

export default Home;
