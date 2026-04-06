import React, { useState, useEffect, useRef } from "react";
import "./Settings.css";

const Settings = () => {
  const elementsRef = useRef([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");

  const users = [
    { id: 1, name: "Ansh Sinha", email: "ansh@gmail.com", phone: "9876543210", role: "Admin", status: "Active" },
    { id: 2, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9123456780", role: "User", status: "Active" },
    { id: 3, name: "Priya Verma", email: "priya@gmail.com", phone: "9988776655", role: "Manager", status: "Inactive" },
    { id: 4, name: "Amit Singh", email: "amit@gmail.com", phone: "9012345678", role: "User", status: "Active" },
    { id: 5, name: "Neha Kapoor", email: "neha@gmail.com", phone: "9090909090", role: "User", status: "Inactive" },
  ];

  // 🔍 Filter
  let filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔃 Sort
  filtered.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "email") return a.email.localeCompare(b.email);
    return 0;
  });

  // 🔥 Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    });

    elementsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className="settings">

      {/* Header */}
      <div ref={addToRefs} className="settings-header">
        <h2>User Management</h2>
      </div>

      {/* Controls */}
      <div ref={addToRefs} className="controls">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
      </div>

      {/* Table */}
      <div ref={addToRefs} className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Settings;