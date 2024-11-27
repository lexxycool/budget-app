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

//generate color
const generateRandomColor = () => {
    const existingBudgetsLength = fetchData('budgets')?.
    length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`
}

//delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key);
}