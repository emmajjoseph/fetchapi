import React, { useState, useEffect } from "react";
import "./App.css";

function RandomUsers() {
  const [users, setUsers] = useState([]);

  // Fetch data from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=5");
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Random User Profiles</h1>
      <div className="grid">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="image"
            />
            <h3>
              {user.name.first} {user.name.last}
            </h3>
            <p>Email: {user.email}</p>
            <p>
              Location: {user.location.city}, {user.location.country}
            </p>
          </div>
        ))}
      </div>
      <button className="refresh-button" onClick={fetchUsers}>
        Refresh Profiles
      </button>
    </div>
  );
}

export default RandomUsers;
