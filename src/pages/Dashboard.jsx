import React from 'react'
import { createBudget, fetchData } from '../helper'
import { createBrowserRouter, useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets }
}

//action
export async function dashboardAction({request}) {
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
  }  
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      { userName ? (
        <div className='dashboard'>
          <h1> 
            Welcome, <span className='accent'>{userName}</span>
          </h1>
          <div className='grid-sm'>
            {/* { budgets ? () : () } */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : <Intro /> }  
    </>
  )
}

export default Dashboard