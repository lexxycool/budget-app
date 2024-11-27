import React from 'react'
import { fetchData } from '../helper'
import { useLoaderData } from 'react-router-dom';
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
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome, ${formData.userName}`);
  } catch (e) {
    throw new Error('There was a problem creating your account.');
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