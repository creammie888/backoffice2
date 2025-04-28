import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserEdit, FaVideo, FaUsersCog } from "react-icons/fa";

const Navbar = () => {

  const location = useLocation();

  return (
    <div className="navbar-box">
      <div className="navbar">
        <div className="navbar-logo">
          <img src="/img/Logo-SmartAudit.png" alt="smartAudit-logo" />
        </div>
        <div className="menu">
          <ul>
            <li className={`main-menu ${location.pathname === "/dashboard" ? "active" : ""}`}>
              <Link to="/dashboard">
                <FaHome className="icon" />
                <span className="menu-label">Home</span>
              </Link>
            </li>
            <li className={`main-menu ${location.pathname === "/profile" ? "active" : ""}`}>
              <Link to="/profile">
                <FaUserEdit className="icon" />
                <span className="menu-label">Edit Profile</span>
              </Link>
            </li>
            <li className={`main-menu ${location.pathname === "/permission" ? "active" : ""}`}>
              <Link to="/permission">
                <FaUsersCog className="icon" />
                <span className="menu-label">User Permission</span>
              </Link>
            </li>
            <li className={`main-menu ${location.pathname === "/video" ? "active" : ""}`}>
              <Link to="/video">
                <FaVideo className="icon" />
                <span className="menu-label">Activity Video</span>
              </Link>
            </li>
          </ul>
        </div>

      </div>
      <li className="logout">
        <Link to="/">
          <span className="menu-label">Logout</span>
        </Link>
      </li>
    </div>
  );
};

export default Navbar;
