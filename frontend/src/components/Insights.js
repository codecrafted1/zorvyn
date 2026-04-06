import React, { useEffect, useRef } from "react";
import "./Insights.css";
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
  LineChart,
  Line,
} from "recharts";

const Insights = () => {
  const elementsRef = useRef([]);

  // 🔥 Complex Data (More Categories)
  const data = [
    { month: "Jan", Food: 1200, Rent: 3000, Travel: 800, Shopping: 600, Bills: 900, Health: 400 },
    { month: "Feb", Food: 1000, Rent: 3000, Travel: 1200, Shopping: 900, Bills: 850, Health: 500 },
    { month: "Mar", Food: 1500, Rent: 3000, Travel: 600, Shopping: 1200, Bills: 950, Health: 700 },
  ];

  const categories = ["Food", "Rent", "Travel", "Shopping", "Bills", "Health"];

  // 📊 Total Category Spending
  const categoryTotals = categories.map((cat) => ({
    name: cat,
    value: data.reduce((sum, d) => sum + d[cat], 0),
  }));

  // 🔥 Highest Spending Category
  const highest = categoryTotals.reduce((max, curr) =>
    curr.value > max.value ? curr : max
  );

  // 📊 Monthly Total
  const monthlyTotals = data.map((d) => ({
    month: d.month,
    total: categories.reduce((sum, cat) => sum + d[cat], 0),
  }));

  // 📈 Growth Insight
  const growth =
    monthlyTotals[monthlyTotals.length - 1].total -
    monthlyTotals[0].total;

  // 🎨 Colors
  const COLORS = ["#3b5bdb", "#51cf66", "#f59f00", "#ff6b6b", "#845ef7", "#20c997"];

  // 🔥 Scroll Animation
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
    <div className="insights">

      {/* Insight Cards */}
      <div className="card-container">
        <div ref={addToRefs} className="card">
          <h4>Top Spending</h4>
          <h2>{highest.name}</h2>
        </div>

        <div ref={addToRefs} className="card">
          <h4>Monthly Growth</h4>
          <h2>{growth > 0 ? "+" : ""}₹{growth}</h2>
        </div>

        <div ref={addToRefs} className="card">
          <h4>Total Spending</h4>
          <h2>
            ₹{categoryTotals.reduce((sum, c) => sum + c.value, 0)}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid">

        {/* Category Breakdown */}
        <div ref={addToRefs} className="chart-box">
          <h3>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryTotals} dataKey="value" outerRadius={90}>
                {categoryTotals.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Comparison */}
        <div ref={addToRefs} className="chart-box">
          <h3>Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyTotals}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b5bdb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Line */}
        <div ref={addToRefs} className="chart-box">
          <h3>Spending Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyTotals}>
              <Line type="monotone" dataKey="total" stroke="#ff6b6b" strokeWidth={3} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Multi Category Comparison */}
        <div ref={addToRefs} className="chart-box">
          <h3>Category Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              {categories.map((cat, i) => (
                <Bar key={cat} dataKey={cat} fill={COLORS[i % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Smart Insight Text */}
      <div ref={addToRefs} className="insight-text">
        <h3>Smart Insights</h3>
        <p>
          Your highest spending category is <b>{highest.name}</b>. 
          Overall spending has {growth > 0 ? "increased" : "decreased"} by ₹{Math.abs(growth)} 
          over the last months. Rent remains the most stable expense, while categories like Shopping 
          and Travel show fluctuations — indicating lifestyle-based spending patterns.
        </p>
      </div>

    </div>
  );
};

export default Insights;