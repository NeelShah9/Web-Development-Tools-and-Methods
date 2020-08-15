import React, { useContext } from 'react';
import AgendaContext from './context/AgendaContext';

const Sort = () => {
  const agendaContext = useContext(AgendaContext);

  const sortTasksByOrder = (e) => {
    agendaContext.sortTasksByOrder(e.target.value);
  };

  const sortTasksByDone = (e) => {
    agendaContext.sortTasksByDone(e.target.value);
  };

  return (
    <span className="sort-container">
      <label className="task-sort-label">Sort:</label>
      <span className="select-sort">
        <label>Alphabetically</label>
        <select
          className="sort-alphabetically filter-height"
          value={agendaContext.taskOrderFilter}
          onChange={sortTasksByOrder}
        >
          <option value="select option" disabled>
            Select
          </option>
          <option value="ascending">Forward</option>
          <option value="descending">Reverse</option>
        </select>
        <label>Complete/Pending</label>
        <select
          className="sort-by-status filter-height"
          value={agendaContext.taskDoneFilter}
          onChange={sortTasksByDone}
        >
          <option value="select option" disabled>
            Select
          </option>
          <option value="done">Complete</option>
          <option value="notdone">Pending</option>
        </select>
      </span>
    </span>
  );
};

export default Sort;
