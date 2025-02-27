import React, { useState, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } 
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(search)));
  }, [search, users]);



  const handleViewUser = (user) => {
    Swal.fire({
      title: user.name,
      html: `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
        <p><strong>Company:</strong> ${user.company?.name || "N/A"}</p>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

    
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address?.city || "N/A"}</td>
                <td>
                  <button className="view-btn" onClick={() => handleViewUser(user)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
   
    </div>
  );
};

export default Dashboard;
