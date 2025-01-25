import React, { useState, useEffect } from "react";

function RandomUsers() {
  const [users, setUsers] = useState([]); // Store fetched users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from the Random User API
    fetch("https://randomuser.me/api/?results=10") // Fetch 10 random users
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.results); // Store fetched users
        setLoading(false); // Turn off loading state
      })
      .catch((err) => {
        setError(err.message); // Set error message
        setLoading(false);
      });
  }, []); // Run only once when the component mounts

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (error) {
    return <h2 className="error">Error: {error}</h2>;
  }

  return (
    <div className="container">
      <h1 className="title">Random User Profiles</h1>
      <div className="grid">
        {users.map((user, index) => (
          <div key={index} className="card">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="image"
            />
            <h3>{`${user.name.first} ${user.name.last}`}</h3>
            <p>Email: {user.email}</p>
            <p>
              Location: {user.location.city}, {user.location.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomUsers;
