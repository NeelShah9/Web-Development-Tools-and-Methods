import React from 'react';

const Users = ({ userList }) => {
  return (
    <div className="users">
      <ul>
        {userList.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;