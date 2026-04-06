import React from 'react';
import './Panel.css';
import admin from './admin.png';

import { 
  FaTachometerAlt, 
  FaExchangeAlt, 
  FaLightbulb, 
  FaChartBar, 
  FaCog, 
  FaProjectDiagram,
  FaRobot,
  FaUserCircle
} from "react-icons/fa";

const Panel = ({ setActivePage, activePage }) => {
  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <img src={admin} alt="Logo" />
        <h2>FinDash</h2>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">

        <div 
          className={`menu-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </div>

        <div 
          className={`menu-item ${activePage === "transactions" ? "active" : ""}`}
          onClick={() => setActivePage("transactions")}
        >
          <FaExchangeAlt className="icon" />
          <span>Transactions</span>
        </div>

        <div 
          className={`menu-item ${activePage === "insights" ? "active" : ""}`}
          onClick={() => setActivePage("insights")}
        >
          <FaLightbulb className="icon" />
          <span>Insights</span>
        </div>

        <div 
          className={`menu-item ${activePage === "reports" ? "active" : ""}`}
          onClick={() => setActivePage("reports")}
        >
          <FaChartBar className="icon" />
          <span>Reports</span>
        </div>

        <div 
          className={`menu-item ${activePage === "settings" ? "active" : ""}`}
          onClick={() => setActivePage("settings")}
        >
          <FaCog className="icon" />
          <span>Settings</span>
        </div>

        <div 
          className={`menu-item ${activePage === "program" ? "active" : ""}`}
          onClick={() => setActivePage("program")}
        >
          <FaProjectDiagram className="icon" />
          <span>Program</span>
        </div>

        <div 
          className={`menu-item ${activePage === "ai" ? "active" : ""}`}
          onClick={() => setActivePage("ai")}
        >
          <FaRobot className="icon" />
          <span>AI Data Training</span>
        </div>

      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="menu-item logout">
          <FaUserCircle className="icon" />
          <span>Account</span>
        </div>
      </div>

    </div>
  );
};

export default Panel;