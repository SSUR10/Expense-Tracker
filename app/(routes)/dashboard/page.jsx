"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from '../dashboard/_components/CardsInfo'
import { db } from '../../../utils/dbconfig';
import { Budgets, Expenses } from '../../../utils/schema';
import { desc, eq, sql } from 'drizzle-orm';
import BarChartDashboard from '../dashboard/_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';
function Dashboard() {
  const [BudgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  const [expensesList, setExpensesList]=useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user])

  /**
   * Used to get the Budget List
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...Budgets,
        totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number)
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  }
  /**
   * used to get all expenses that belong to users
   */
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }
  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl text-teal-200'>Hi, {user?.fullName} ✌️</h2>
      <p className='text-blue-200'>Your finances at a glance: Let's take control of your spending together.</p>
      <CardInfo BudgetList={BudgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard
          BudgetList={BudgetList}/>
          <h2 className='font-bold text-lg'>Latest Expenses</h2>
          <ExpenseListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
          />
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {BudgetList.map((budget, index)=>(
            <BudgetItem budget={budget} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard