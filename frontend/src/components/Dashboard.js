import React, { useEffect, useRef } from "react";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend,
  ComposedChart,
} from "recharts";

const Dashboard = () => {

  const elementsRef = useRef([]);

  const data = [
    { name: "Jan", income: 4000, expense: 2400, balance: 1600 },
    { name: "Feb", income: 3000, expense: 1398, balance: 1602 },
    { name: "Mar", income: 5000, expense: 3800, balance: 1200 },
    { name: "Apr", income: 4780, expense: 3908, balance: 872 },
    { name: "May", income: 5890, expense: 4800, balance: 1090 },
  ];

  const pieData = [
    { name: "Food", value: 400 },
    { name: "Rent", value: 800 },
    { name: "Shopping", value: 300 },
    { name: "Travel", value: 200 },
  ];

  const progressData = [
    { name: "Saved", value: 70, fill: "#3b5bdb" },
  ];

  const COLORS = ["#3b5bdb", "#51cf66", "#f59f00", "#ff6b6b"];

  // 🔥 Scroll Animation (Better Version)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className="dashboard">

      {/* Cards */}
      <div className="card-container">
        <div ref={addToRefs} className="card">
          <h4>Total Balance</h4>
          <h2>₹45,000</h2>
        </div>

        <div ref={addToRefs} className="card">
          <h4>Income</h4>
          <h2>₹70,000</h2>
        </div>

        <div ref={addToRefs} className="card">
          <h4>Expenses</h4>
          <h2>₹25,000</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid">

        <div ref={addToRefs} className="chart-box">
          <h3>Balance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="balance" stroke="#3b5bdb" strokeWidth={3} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div ref={addToRefs} className="chart-box">
          <h3>Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#51cf66" />
              <Bar dataKey="expense" fill="#ff6b6b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div ref={addToRefs} className="chart-box">
          <h3>Cash Flow</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="income" stroke="#3b5bdb" fill="#dbe4ff" />
              <Area type="monotone" dataKey="expense" stroke="#ff6b6b" fill="#ffe3e3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div ref={addToRefs} className="chart-box">
          <h3>Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div ref={addToRefs} className="chart-box">
          <h3>Savings Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={progressData}>
              <RadialBar dataKey="value" />
              <Legend />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div ref={addToRefs} className="chart-box">
          <h3>Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#51cf66" />
              <Line dataKey="balance" stroke="#3b5bdb" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;