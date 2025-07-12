const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/expenses
const addExpense = async (req, res) => {
  const { vendor, amount, category, date, userId } = req.body;
  //const userId = req.user?.sub; // extracted from JWT (once authMiddleware is plugged)

  try {
    const expense = await prisma.expense.create({
      data: {
        vendor,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        userId: userId || 'temp-user-id', // Use the userId from request body or fallback
      }
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to add expense',
      details: error.message 
    });
  }
};

// GET /api/expenses
const getAllExpenses = async (req, res) => {
    const userId = req.user?.sub; // extracted from JWT (once authMiddleware is plugged)
  try {
    const expenses = await prisma.expense.findMany({
      //where: { userId },
      orderBy: { date: 'desc' }
    });

    res.json({ success: true, data: expenses });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch expenses' });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};
