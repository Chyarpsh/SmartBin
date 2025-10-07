// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import SmartBinLogo from "../assets/SmartBin_logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={SmartBinLogo} alt="SmartBin Logo" className="logo-img" />
        </Link>
        <Link to="/" className="logo-text">SmartBin</Link>
      </div>
      <div className="menu-container">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <FaBars />
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/activity">Activity</Link>
            <Link to="/settings">Settings</Link>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
