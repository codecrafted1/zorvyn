import React, { useState } from "react";
import "./Aidata.css";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const Aidata = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("data");
  const [analysis, setAnalysis] = useState([]);

  const COLORS = ["#3b5bdb", "#51cf66", "#f59f00", "#ff6b6b"];

  // Handle CSV upload
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
        setAnalysis([]);
        setActiveTab("data");
      },
    });
  };

  // Basic "AI training" – category aggregation
  const trainModel = () => {
    if (data.length === 0) {
      alert("Please upload a dataset first.");
      return;
    }

    const categoryMap = {};

    data.forEach((row) => {
      const category = row.category || row.Category || "Unknown";
      const amount = Number(row.amount || row.Amount) || 0;

      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }

      categoryMap[category] += amount;
    });

    const result = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));

    setAnalysis(result);
    setActiveTab("reports");
  };

  return (
    <div className="aidata">

      {/* Upload */}
      <div className="upload-box">
        <h3>Upload Dataset (CSV)</h3>
        <input type="file" accept=".csv" onChange={handleFile} />
        <button onClick={trainModel}>Train & Analyze</button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => setActiveTab("data")}>Data</button>
        <button onClick={() => setActiveTab("reports")}>Reports</button>
        <button onClick={() => setActiveTab("graphs")}>Graphs</button>
      </div>

      {/* DATA TABLE */}
      {activeTab === "data" && (
        <div className="table-container">
          <h3>Dataset</h3>

          {data.length === 0 ? (
            <p>No dataset uploaded yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      )}

      {/* REPORTS */}
      {activeTab === "reports" && (
        <div className="reports">
          <h3>Analysis Report</h3>

          {analysis.length === 0 ? (
            <p>No analysis generated yet.</p>
          ) : (
            <div className="report-cards">
              {analysis.map((item, i) => (
                <div key={i} className="report-card">
                  <h4>{item.name}</h4>
                  <h2>₹{item.value}</h2>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* GRAPHS */}
      {activeTab === "graphs" && (
        <div className="graphs">

          {/* Bar Chart */}
          <div className="chart-box">
            <h3>Category Distribution</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analysis}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b5bdb" />
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* Pie Chart */}
          <div className="chart-box">
            <h3>Spending Breakdown</h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={analysis} dataKey="value" outerRadius={90}>
                  {analysis.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>
      )}

    </div>
  );
};

export default Aidata;