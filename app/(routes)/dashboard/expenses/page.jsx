"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import ExpenseListTable from './_components/ExpenseListTable'
import { desc, eq, sql } from 'drizzle-orm'
import Link from 'next/link'
import { db } from '../../../../utils/dbconfig'
import { Budgets, Expenses } from '../../../../utils/schema'

function AllExpensesScreen() {
    const { user } = useUser();
    const [allExpenses, setAllExpenses] = useState([]);

    useEffect(() => {
        user && getAllExpenses();
    }, [user]);

    const getAllExpenses = async () => {
        const result = await db.select({
            ...Expenses,
            budgetName: Budgets.name
        })
        .from(Expenses)
        .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.createdAt));

        setAllExpenses(result);
    }

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold mb-6'>Latest Expenses</h2>
            <ExpenseListTable 
                expensesList={allExpenses} 
                refreshData={getAllExpenses}
                showBudgetName={true}
            />
            <div className='mt-6'>
                <Link href="/dashboard/budgets" className="text-teal-600 hover:underline">
                    View All Budgets
                </Link>
            </div>
        </div>
    )
}

export default AllExpensesScreen