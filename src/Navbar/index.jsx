import React, { useState } from "react";
import { logout } from "../config/firebase";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const logOut = async () => {
    const result = await logout();
    localStorage.removeItem("currentMedCareUser");
    if (result) {
      window.location.href = "/login";
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Medicine Tracker</h2>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/add-medicine">Add Medicine</a>
        </li>
        <li>
          <a href="/medicines">All Medicines</a>
        </li>
        <li>
          <a href="/expired-medicines">Expired Medicines</a>
        </li>
        <li>
          <a onClick={logOut}>Log Out</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
