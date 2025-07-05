const express = require("express");
const cors = require("cors");
require("dotenv").config();

const expensesRoutes = require("./routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nudge Spend Save API Running 🚀");
});

// ✅ Mount your /api/expenses routes
app.use("/api/expenses", expensesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API server listening on ${PORT}`));
