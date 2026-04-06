import React, { useState } from "react";
import Panel from "./components/Panel";

import Dashboard from "./components/Dashboard";
import Transaction from "./components/Transaction";
import Insights from "./components/Insights";
import Program from "./components/Program";
import Aidata from "./components/Aidata";
import Settings from "./components/Settings"; // ✅ ADD THIS

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "transactions":
        return <Transaction />;

      case "insights":
        return <Insights />;

      case "program":
        return <Program />;

      case "ai":
        return <Aidata />;

      case "settings":   // ✅ ADD THIS
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Panel setActivePage={setActivePage} activePage={activePage} />
      {renderPage()}
    </div>
  );
}

export default App;