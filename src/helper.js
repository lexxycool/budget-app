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
    setTimeout(res, Math.random() * 2000)
})

//delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key);
}