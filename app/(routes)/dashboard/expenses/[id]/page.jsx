"use client"
import { desc, eq, getTableColumns, param, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/dbconfig'
import { useUser } from '@clerk/nextjs'
import { Budgets, Expenses } from '../../../../../utils/schema'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'
import ExpenseListTable from '../_components/ExpenseListTable'
import { Button } from '../../../../../components/ui/button'
import { ArrowLeft, Pen, PenBox, X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from '../_components/EditBudget'

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const route = useRouter();
  useEffect(() => {
    if (user) {
      fetchBudgetAndExpenses();
    }
  }, [user, params.id]);

  /**
   * Get Budget Information
   */

  

  /*
  Get Latest Expenses
  */


  /**
   * Used to Delete Budget
   */
  const fetchBudgetAndExpenses = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setbudgetInfo(result[0]);

    const expenseResult = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpenseList(expenseResult);
  }
  const deleteBudget = async () => {
    try {
      // First, delete all expenses associated with this budget
      const deleteExpensesResult = await db.delete(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .returning();
  
      console.log('Deleted expenses:', deleteExpensesResult);
  
      // Then, delete the budget itself
      const deleteBudgetResult = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
  
      console.log('Deleted budget:', deleteBudgetResult);
  
      if (deleteBudgetResult && deleteBudgetResult.length > 0) {
        toast.success('Budget and associated expenses deleted!');
        route.replace('/dashboard/budgets');
      } else {
        toast.error('Failed to delete budget. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
      toast.error('An error occurred while deleting the budget.');
    }
  };
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        <span className='flex gap-2 items-center'>
          <ArrowLeft onClick={() => route.back()} className='cursor-pointer' />
          My Expenses
        </span>
        <div className='flex gap-2 items-center'>
          <EditBudget budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex items-center gap-2 bg-teal-600 text-current hover:text-teal-600 hover:bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-indigo-300 rounded-md px-3 py-2'>
                <X size={23} />
                <span className="text-lg font-medium">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your current budget and expenses
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? <BudgetItem
          budget={budgetInfo}
        /> :
          <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
          </div>}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={fetchBudgetAndExpenses}
          budgetAmount={budgetInfo?.amount || 0}
          totalExpenses={budgetInfo?.totalSpend || 0}
        />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable
          expensesList={expenseList}
          refreshData={fetchBudgetAndExpenses}
        />
      </div>
    </div>
  )
}

export default ExpensesScreen