import { Trash2 } from 'lucide-react'
import React from 'react'
import { db } from '../../../../../utils/dbconfig'
import { Expenses } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import Link from 'next/link'

function ExpenseListTable({expensesList, refreshData, showBudgetName = false}) {
    const deleteExpense = async (expenses) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expenses.id))
            .returning();
        if (result) {
            toast('Expense Deleted!')
            refreshData()
        }
    }
    return (
        <div className='mt-3 overflow-hidden rounded-lg shadow-md'>
            <div className={`grid ${showBudgetName ? 'grid-cols-5' : 'grid-cols-4'} text-gray-700 bg-blue-100 p-3 font-semibold`}>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                {showBudgetName && <h2>Budget</h2>}
                <h2>Action</h2>
            </div>
            {expensesList.map((expenses, index) => (
                <div key={expenses.id} className={`grid ${showBudgetName ? 'grid-cols-5' : 'grid-cols-4'} text-gray-700 bg-blue-50 p-3 ${index !== expensesList.length - 1 ? 'border-b border-blue-100' : ''}`}>
                    <h2 className="truncate">{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    <h2>{expenses.createdAt}</h2>
                    {showBudgetName && 
                        <h2>
                            <Link href={`/dashboard/expenses/${expenses.budgetId}`} className="text-teal-600 hover:underline">
                                {expenses.budgetName}
                            </Link>
                        </h2>
                    }
                    <h2>
                        <Trash2
                            className='text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-200'
                            onClick={() => deleteExpense(expenses)}
                        />
                    </h2>
                </div>
            ))}
        </div>
    )
}
export default ExpenseListTable