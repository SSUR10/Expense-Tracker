import React, { useState, useEffect } from 'react'
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import { db } from '../../../../../utils/dbconfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';
import { eq } from 'drizzle-orm';

function AddExpense({ budgetId, user, refreshData, budgetAmount, totalExpenses }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        setLoading(true);
        const newExpenseAmount = parseFloat(amount);
    
        // Check if adding the new expense would exceed the budget
        if (totalExpenses + newExpenseAmount > budgetAmount) {
            toast.error('This expense would exceed your budget limit!');
            setLoading(false);
            return;
        }
    
        // Proceed to add the expense since it does not exceed the budget
        const result = await db.insert(Expenses).values({
            name: name,
            amount: newExpenseAmount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/YYYY')
        }).returning();
    
        setAmount('');
        setName('');
    
        if (result.length > 0) {
            setLoading(false);
            await refreshData(); // This will update both the parent and this component
            toast.success('New Expense Added!');
        }
        setLoading(false);
    };
    
    // You can change this to 'coral' or 'gold' to use different colors
    const accentColor = 'teal';

    const colorClasses = {
        teal: 'bg-teal-600 hover:bg-teal-700',
        coral: 'bg-coral-600 hover:bg-coral-700',
        gold: 'bg-gold-600 hover:bg-gold-700'
    };

    const remainingBudget = budgetAmount - totalExpenses;

    return (
        <div className='border p-5 rounded-lg bg-blue-100 text-gray-700 border-solid cursor-pointer'>
            <h2 className='font-bold text-lg mb-1'>Add Expense</h2>
            <div className={`mb-3 ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>
                Remaining Budget: ₹{remainingBudget.toFixed(2)}
            </div>
            <div>
                <label htmlFor="expenseName" className='block text-sm font-medium text-gray-700 mb-1'>Expense Name</label>
                <Input
                    id="expenseName"
                    placeholder="e.g. Bedroom Decor"
                    value={name}
                    className={`w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:border-${accentColor}-500`}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="expenseAmount" className='block text-sm font-medium text-gray-700 mb-1'>Expense Amount</label>
                <Input
                    id="expenseAmount"
                    placeholder="e.g. 1000"
                    value={amount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:border-${accentColor}-500`}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                disabled={!(name && amount) || loading || (parseFloat(amount) > remainingBudget)}
                onClick={() => addNewExpense()}
                className={`mt-3 ${colorClasses[accentColor]} text-white transition-colors duration-300 w-full`}
            >
                {loading ?
                    <Loader className='animate-spin' /> : "Add New Expense"
                }
            </Button>
        </div>
    )
}

export default AddExpense