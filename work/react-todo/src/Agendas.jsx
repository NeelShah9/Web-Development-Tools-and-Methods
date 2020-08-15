import React, { useState, useEffect, useContext } from 'react';
import AgendaContext from './context/AgendaContext';
import Filter from './Filter';
import constants from './context/Constants';

const Agendas = () => {
  const agendaContext = useContext(AgendaContext);
  const [task, setTask] = useState('');

  useEffect(() => {
    agendaContext.getAllTasks(agendaContext.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const performAddTask = (e) => {
    e.preventDefault();

    agendaContext.addNewTask(agendaContext.username, task);
    setTask('');
  };

  const onChange = (e) => setTask(e.target.value);

  const performToggleTodo = (e) => {
    agendaContext.toggleTodo(e.target.id);
  };

  const performDeleteTask = (e) => {
    agendaContext.deleteTask(e.target.id);
  };

  const performUpdateTask = (e) => {
    agendaContext.updateTask(e.target.id, e.target.value);
  };

  const performRefreshTask = () => {
    agendaContext.getAllTasks(agendaContext.username);
    agendaContext.refreshTasks();
  };

  return (
    <div>
      <div className="todo-container">
        <Filter />
        <div className="add-todo-container">
          <input
            className="todo-input"
            onChange={onChange}
            value={task}
            type="text"
            placeholder="Enter Tasks"
          />
          <button className="btn-todo-add" onClick={performAddTask}>
            ADD
          </button>
          <button className="btn-refresh" onClick={performRefreshTask}>
            Refresh
          </button>
          <div className="todo-display">
            <ul>
              {Object.values(agendaContext.tasks)
                .filter((task) =>
                  agendaContext.taskStatusFilter === constants.COMPLETE
                    ? task.done === constants.TRUE
                    : constants.TRUE
                )
                .filter((task) =>
                  agendaContext.taskStatusFilter === constants.ACTIVE
                    ? task.done === constants.FALSE
                    : constants.TRUE
                )
                .map((task, index) => (
                  <li key={index}>
                    <input
                      id={task.taskId}
                      className="todo-checkbox"
                      type="checkbox"
                      checked={task.done ? 'checked' : ''}
                      onChange={performToggleTodo}
                    />
                    <input
                      type="text"
                      id={task.taskId}
                      className={`todo ${task.done ? 'todo complete' : 'todo'}`}
                      value={task.name}
                      onChange={performUpdateTask}
                      contentEditable="true"
                    />

                    <button
                      id={task.taskId}
                      className="task-delete"
                      onClick={performDeleteTask}
                    >
                      DELETE
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendas;
