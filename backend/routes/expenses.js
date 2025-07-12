const express = require('express');
const router = express.Router();
const { addExpense, getAllExpenses } = require('../controllers/expenseController');
//const authMiddleware = require('../middleware/authMiddleware');

// router.post('/', authMiddleware, addExpense);
// router.get('/', authMiddleware, getUserExpenses);

// No auth middleware added yet (you'll plug it here later)
router.post('/', addExpense);
router.get('/', getAllExpenses);

module.exports = router;


