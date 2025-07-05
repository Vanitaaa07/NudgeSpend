const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Example routes
app.get("/", (req, res) => {
  res.send("Nudge Spend Save API Running 🚀");
});

// Example expenses endpoint
app.get("/api/expenses", (req, res) => {
  res.json([
    { id: 1, vendor: "Starbucks", amount: 5.5 },
    { id: 2, vendor: "Uber", amount: 12 },
  ]);
});

// Example budgets endpoint
app.get("/api/budgets", (req, res) => {
  res.json([
    { category: "Food", spent: 180, limit: 200 },
    { category: "Entertainment", spent: 60, limit: 150 },
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API server listening on ${PORT}`));
