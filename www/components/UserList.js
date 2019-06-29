import React from 'react';
import PropTypes from 'prop-types';

import '../styles/user-list.css';

function UserList(props) {
  const { roomUsers, currentUser, handleRoom } = props;

  // crea una nueva array que no incluira
  // el usario actual (currenteUser)
  // TODO: pensar en un mejor nombre
  const sameID = roomUsers.filter(user => {
    return currentUser.id !== user.id;
  });

  const userList = sameID.map((user, index) => {
    return (
      <li
        className="user-profile"
        key={user.id}
        onClick={() => handleRoom(user, index)}
      >
        {user.name}
      </li>
    );
  });

  return <ul>{userList}</ul>;
}

UserList.propTypes = {
  roomUsers: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  handleRoom: PropTypes.func.isRequired
};

export { UserList };
