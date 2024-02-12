import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 

const UserDetails = () => {
  const { login } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const accessToken = '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';
        const response = await axios.get(`https://api.github.com/users/${login}`, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [login]);

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="user-details-container">
      {user && (
        <div>
          <h2>User Details</h2>
          <div className="user-info">
            <img src={user.avatar_url} alt={user.login} className="user-avatar" />
            <div className="user-text">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Login:</strong> {user.login}</p>
              <p><strong>Location:</strong> {user.location}</p>
              <p><strong>Company:</strong> {user.company}</p>
              <p><strong>Followers:</strong> {user.followers}</p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
