import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <li className="user-card">
      <Link to={`/user/${user.login}`}>
        <img src={user.avatar_url} alt={user.login} className="user-avatar" />
        <div className="user-details">
          <span className="user-name">{`${user.name} (${user.login})`}</span>
        </div>
      </Link>
    </li>
  );
};

export default UserCard;