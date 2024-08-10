import { PiggyBank, ReceiptIndianRupee, Wallet2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardsInfo({ BudgetList }) {  // Destructure BudgetList from props
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    const [budgetCount, setBudgetCount] = useState(0);

    useEffect(() => {
        if (BudgetList && BudgetList.length > 0) {
            CalculateCardInfo();
        }
    }, [BudgetList])
   
    const CalculateCardInfo = () => {
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        BudgetList.forEach(element => {
            totalBudget_ += Number(element.amount);
            totalSpend_ += Number(element.totalSpend);  // Make sure to convert to number
        });
        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
        setBudgetCount(BudgetList.length);
    }

    return (
        <div>
            {BudgetList.length>0?
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between bg-blue-100'>
                <div>
                    <h2 className='text-sm text-gray-700'>Total Budget</h2>
                    <h2 className='font-bold text-2xl text-gray-700'>₹{totalBudget}</h2>
                </div>
                <PiggyBank className='bg-teal-600 text-gray-200 p-3 h-12 w-12 rounded-full'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between bg-blue-100'>
                <div>
                    <h2 className='text-sm text-gray-700'>Total Spend</h2>
                    <h2 className='font-bold text-2xl text-gray-700'>₹{totalSpend}</h2>
                </div>
                <ReceiptIndianRupee className='bg-teal-600 text-gray-200 p-3 h-12 w-12 rounded-full'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between bg-blue-100'>
                <div>
                    <h2 className='text-sm text-gray-700'>No. of Budget</h2>
                    <h2 className='font-bold text-2xl text-gray-700'>{budgetCount}</h2>
                </div>
                <Wallet2 className='bg-teal-600 text-gray-200 p-3 h-12 w-12 rounded-full'/>
            </div>
            </div>
            :
            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {[1,2,3].map((item, index)=>{
                    <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'>
                    </div>
                })}
            </div>
            }
        </div>
    )
}

export default CardsInfo