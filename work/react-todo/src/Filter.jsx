import React, { useContext } from 'react';
import AgendaContext from './context/AgendaContext';
import Sort from './Sort';

const Filter = () => {
  const agendaContext = useContext(AgendaContext);

  const filterTasksByStatus = (e) => {
    agendaContext.filterTasksByStatus(e.target.value);
  };

  return (
    <div className="filter-todos">
      <span className="filter-container">
        <label className="task-filter-label">Filter By:</label>
        <select
          className="filter-task filter-height"
          value={agendaContext.taskStatusFilter}
          onChange={filterTasksByStatus}
        >
          <option value="all">All Tasks</option>
          <option value="active">Active Tasks</option>
          <option value="complete">Complete Tasks</option>
        </select>
      </span>
      <Sort />
    </div>
  );
};

export default Filter;
