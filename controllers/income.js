const IncomeModal = require("../modal/incomeModal");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = IncomeModal({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required!" , error:true})
        }
        if (amount <= 0 || !typeof amount === 'number') {
            return res.status(400).json({ message: "Amount must be a positive" })
        }
        await income.save();
        res.status(200).json({ message: "Income Added" })
    }
    catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeModal.find().sort({ createdAt: -1 });
        res.status(200).json(incomes)
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
console.log('====================================');
console.log("Params " , id);
console.log('====================================');
    IncomeModal.findByIdAndDelete(id)
    .then((income)=>{
res.status(200).json({message:"Income Deleted"})
    }).catch(err =>{
        res.status(200).json({message:"Server Error"})
    })
}