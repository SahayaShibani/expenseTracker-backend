const ExpenseModal = require("../modal/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = ExpenseModal({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required!",error:true})
        }
        if (amount <= 0 || !typeof amount === 'number') {
            return res.status(400).json({ message: "Amount must be a positive" })
        }
        await expense.save();
        res.status(200).json({ message: "Expense Added" })
    }
    catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseModal.find().sort({ createdAt: -1 });
        res.status(200).json(expenses)
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    
    ExpenseModal.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: "Expense Deleted"  })
        }).catch(err => {
            res.status(200).json({ message: "Server Error" })
        })
}