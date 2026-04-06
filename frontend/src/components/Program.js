import React, { useState } from "react";
import "./Program.css";

const Program = () => {

  const tools = [
    { title: "EMI Calculator", desc: "Calculate loan EMI" },
    { title: "Budget Planner", desc: "Plan your monthly budget" },
    { title: "Expense Tracker", desc: "Track daily expenses" },
    { title: "Savings Goal", desc: "Set savings target" },
    { title: "Tax Estimator", desc: "Estimate taxes" },
    { title: "Investment Return", desc: "ROI calculator" },

    { title: "Net Worth", desc: "Calculate net worth" },
    { title: "Debt Manager", desc: "Track debts" },
    { title: "Cash Flow", desc: "Analyze cash flow" },
    { title: "Stock Analyzer", desc: "Analyze stocks" },
    { title: "Retirement Plan", desc: "Plan retirement" },
    { title: "Risk Analyzer", desc: "Evaluate risk" },
  ];

  const [page, setPage] = useState(0);
  const itemsPerPage = 6;

  const start = page * itemsPerPage;
  const currentItems = tools.slice(start, start + itemsPerPage);

  return (
    <div className="program">

      {/* Header */}
      <div className="program-header">
        <h2>Financial Tools</h2>
      </div>

      {/* Grid */}
      <div className="program-grid">
        {currentItems.map((tool, index) => (
          <div key={index} className="program-card">
            <h3>{tool.title}</h3>
            <p>{tool.desc}</p>
            <button>Open</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          disabled={page === 0} 
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>Page {page + 1}</span>

        <button 
          disabled={(page + 1) * itemsPerPage >= tools.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Program;