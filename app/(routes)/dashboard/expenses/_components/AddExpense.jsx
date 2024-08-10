import React, { useState } from 'react'
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import { db } from '../../../../../utils/dbconfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';

function AddExpense({ budgetId, user, refreshData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * used to Add New Expenses
     */
    const addNewExpense = async () => {
        setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/YYYY')
        }).returning({ insertedId: Budgets.id });

        setAmount('');
        setName('');

        if (result) {

            setLoading(false)
            refreshData()
            toast('New Expense Added!')
        }
        setLoading(false);
    }
    // You can change this to 'coral' or 'gold' to use different colors
    const accentColor = 'teal';

    const colorClasses = {
        teal: 'bg-teal-600 hover:bg-teal-700',
        coral: 'bg-coral-600 hover:bg-coral-700',
        gold: 'bg-gold-600 hover:bg-gold-700'
    };

    return (
        <div className='border p-5 rounded-lg bg-blue-100 text-gray-700 border-solid cursor-pointer'>
            <h2 className='font-bold text-lg mb-1'>Add Expense</h2>
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
                disabled={!(name && amount)||loading}
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