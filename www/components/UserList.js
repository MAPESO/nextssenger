import React from 'react';
import PropTypes from 'prop-types';

import '../styles/user-list.css';

function UserList(props) {
  const { roomUsers, currentUser } = props;

  // crea una nueva array que no incluira
  // el usario actual (currenteUser)
  // TODO: pensar en un mejor nombre
  const sameID = roomUsers.filter(user => {
    return currentUser.id !== user.id;
  });

  const userList = sameID.map(user => {
    return (
      <li className="user-profile" key={user.id}>
        {user.name}
      </li>
    );
  });

  return <ul>{userList}</ul>;
}

UserList.propTypes = {
  roomUsers: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export { UserList };
