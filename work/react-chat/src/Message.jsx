import React from 'react';

const Message = ({ messageList }) => {
  return (
    <div className="messages">
      <ul>
        {messageList.map((message, index) => (
          <li key={index}>
            <span className="user">{message.username}: </span>
            <span className="message">{message.text}</span>
			<span className="timestamp">{message.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Message;