"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '../../../../../utils/dbconfig'
import { eq, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

function BudgetList() {
  const [BudgetList, setBudgetList] = useState([]);
  const { user } = useUser();

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
      .groupBy(Budgets.id);

    setBudgetList(result);
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget 
        refreshData={()=>getBudgetList()}/>
        {BudgetList?.length>0? BudgetList.map((budget, index) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))
      :[1,2,3,4].map((item, index)=>(
        <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

        </div>
      ))
      }
      </div>
    </div>
  )
}

export default BudgetList