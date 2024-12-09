import React from 'react'
import { createBudget, createExpense, fetchData, timer } from '../helper'
import { createBrowserRouter, useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import Quotes from '../components/Quotes';

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets }
}

//action
export async function dashboardAction({request}) {
  await timer();  
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case 'newUser':
      try {
        localStorage.setItem("userName", JSON.stringify(values.userName));
        return toast.success(`Welcome, ${values.userName}`);
      } catch (e) {
        throw new Error('There was a problem creating your account.');
      };
      break;
    case 'createBudget':
      try {
        createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount
        })
        return toast.success("Budget created!")
      } catch (e) {
        throw new Error("There was a problem creating your budget.")
      };
      break;
    case 'createExpense':
      try {
        //create an expense
        createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget
        })
        return toast.success(`Expense ${values.newExpense} created!`)
      } catch (e) {
        throw new Error("There was a problem creating your expense");
      }
      break;
  }  
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      { userName ? (
        <div className='dashboard'>
          <h1 className='username'> 
            Welcome, <span className='accent'>{userName}</span>
            <Quotes />
          </h1>      
          <div className='grid-sm'>
            { budgets && budgets.length > 0 ?
              (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets}/>
                  </div>
                </div>
              ) : 
              (
                <div className="grid-sm">
                  <p> Personal budgeting is the
                    secret to financial freedom.
                  </p>
                  <p>Create a budget to get started!</p>
                    <AddBudgetForm />
                </div>
              )
            }
          </div>
        </div>
      ) : <Intro /> }  
    </>
  )
}

export default Dashboard