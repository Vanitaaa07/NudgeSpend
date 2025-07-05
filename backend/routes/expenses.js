const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

// GET all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(expenses);
  } catch (err) {
    console.error("❌ Failed to fetch expenses:", err);
    res.status(500).json({ error: "Failed to get expenses" });
  }
});

// POST new expense
router.post("/", async (req, res) => {
  try {
    const { vendor, amount, category } = req.body;

    console.log("Incoming:", req.body);

    // ✅ Validate input
    if (!vendor || typeof vendor !== "string") {
      return res.status(400).json({ error: "Vendor is required and must be a string." });
    }

    const amt = parseFloat(amount);
    if (isNaN(amt)) {
      return res.status(400).json({ error: "Amount must be a number." });
    }

    if (!category || typeof category !== "string") {
      return res.status(400).json({ error: "Category is required." });
    }

    const newExpense = await prisma.expense.create({
      data: {
        vendor,
        amount: amt,
        category,
      },
    });

    res.status(201).json(newExpense);
  } catch (err) {
    console.error("💥 POST /api/expenses error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


module.exports = router;
