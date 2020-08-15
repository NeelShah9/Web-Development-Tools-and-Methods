import React, { useState } from 'react';
import { fetchAddMessage } from './services';
import messages from './messages';

const NewMessage = ({ onAddMessage, onError }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const dateTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let time = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      time
    );
  };

  const renderAddMessage = e => {
    e.preventDefault();
    const timestamp = dateTime(new Date());
    fetchAddMessage(text, timestamp)
      .then(message => {
        onAddMessage(message);
        setText('');
        setError('');
      })
      .catch(err => {
        onError(err.code);
        setError(messages[err.code || 'DEFAULT']);
      });
  };

  const onChange = e => setText(e.target.value);

  return (
    <div className="add-message">
      <input onChange={onChange} value={text} />
      <button onClick={renderAddMessage}>SEND</button>
      <p className="error">{error}</p>
    </div>
  );
};

export default NewMessage;