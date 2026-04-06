import React, { useState, useEffect, useRef } from "react";
import "./Transaction.css";

const Transaction = () => {
  const elementsRef = useRef([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  const data = [
    { id: 1, date: "2024-01-10", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2024-01-12", amount: 1200, category: "Food", type: "expense" },
    { id: 3, date: "2024-01-15", amount: 800, category: "Shopping", type: "expense" },
    { id: 4, date: "2024-01-18", amount: 2000, category: "Freelance", type: "income" },
    { id: 5, date: "2024-01-20", amount: 1500, category: "Rent", type: "expense" },
  ];

  let filteredData = data.filter((item) => {
    return (
      (filter === "all" || item.type === filter) &&
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  filteredData.sort((a, b) => {
    if (sort === "latest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    if (sort === "amount") return b.amount - a.amount;
    return 0;
  });

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

  
  const income = data.filter(d => d.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = data.filter(d => d.type === "expense").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="transaction">

      <div className="card-container">
        <div ref={addToRefs} className="card">
          <h4>Total Income</h4>
          <h2>₹{income}</h2>
        </div>

        <div ref={addToRefs} className="card">
          <h4>Total Expenses</h4>
          <h2>₹{expense}</h2>
        </div>

        <div ref={addToRefs} className="card">
          <h4>Balance</h4>
          <h2>₹{income - expense}</h2>
        </div>
      </div>

      <div ref={addToRefs} className="controls">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="amount">Amount</option>
        </select>
      </div>

      <div className="transaction-list">
        {filteredData.map((item) => (
          <div ref={addToRefs} key={item.id} className="transaction-item">

            <div>
              <h4>{item.category}</h4>
              <p>{item.date}</p>
            </div>

            <div className={`amount ${item.type}`}>
              {item.type === "income" ? "+" : "-"}₹{item.amount}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Transaction ;