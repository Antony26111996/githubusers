import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const accessToken = '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';
        const response = await axios.get('https://api.github.com/users', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        const userData = response.data;
        const userPromises = userData.map(async (user) => {
          const userDetailsResponse = await axios.get(`https://api.github.com/users/${user.login}`, {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          });
          return userDetailsResponse.data;
        });
        const detailedUsers = await Promise.all(userPromises);
        setUsers(detailedUsers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h1>GitHub Users</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
