// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//create a budget
export const createBudget = ({ name, amount }) => {
    const newBudgetItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    const existingBudgets = fetchData('budgets') ?? []

    return localStorage.setItem('budgets', 
        JSON.stringify([...existingBudgets, newBudgetItem])
    )
}

//create an expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newExpenseItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }

    const existingExpenses = fetchData('expenses') ?? []

    return localStorage.setItem('expenses', 
        JSON.stringify([...existingExpenses, newExpenseItem])
    )
}

//generate color
const generateRandomColor = () => {
    const existingBudgetsLength = fetchData('budgets')?.
    length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`
}

//timer
export const timer = () => new Promise(res => {
    setTimeout(res, Math.random() * 800)
})

//delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key);
}

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        //check if expense.id === budgetId
        if(expense.budgetId !== budgetId) return acc

        // add the current amount to total
        return acc += expense.amount
    }, 0)
   
    return budgetSpent;
}


//Formatting percentages
export const formatPercentage = (amt) => {
   return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
   }) 
}

//format date
export const formatDateToLocaleString = (epoch) => {
    return new Date(epoch).toLocaleDateString();
}

//format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}