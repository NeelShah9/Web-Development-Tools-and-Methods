import React, { useEffect, useContext } from 'react';
import AgendaContext from './context/AgendaContext';

const Theme = () => {
  const agendaContext = useContext(AgendaContext);

  useEffect(() => {
    agendaContext.getTheme(agendaContext.username);

  }, []);

  const changeTheme = (e) => {
    let themeVal = e.target.value;
    agendaContext.setTheme(agendaContext.username, themeVal);
  };
  return (
  
    <select className="theme" value={agendaContext.theme} onChange={changeTheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="colorful">Tints</option>
    </select>
  
  );
};

export default Theme;
