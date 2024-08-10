import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
  }

  if (!budget) {
    return null;
  }

  return (
    <Link href={'/dashboard/expenses/'+budget?.id} >
      <div className='h-[170px] bg-blue-100 text-gray-700 p-5 rounded-lg border-2 border-solid cursor-pointer hover:shadow-md hover:bg-teal-100 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between'>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center overflow-hidden'>
            <h2 className='text-2xl p-3 px-4 bg-blue-100 rounded-full flex-shrink-0'>
              {budget?.icon}
            </h2>
            <div className='overflow-hidden'>
              <h2 className='font-bold truncate'>{budget?.name}</h2>
              <h2 className='text-sm text-slate-500'>{budget?.totalItem ?? 0} Item</h2>
            </div>
        </div>
        <h2 className='font-bold text-teal-600 text-lg flex-shrink-0'>₹{budget?.amount ?? 0}</h2>
      </div>
      <div className='mt-auto'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-xs text-slate-500'>₹{budget?.totalSpend ?? 0} Spend</h2>
          <h2 className='text-xs text-slate-500'>₹{(budget?.amount ?? 0) - (budget?.totalSpend ?? 0)} Remaining</h2>
        </div>
        <div className='w-full bg-slate-300 h-2 rounded-full'>
          <div className='bg-teal-600 h-2 rounded-full'
          style={{
            width:`${calculateProgressPerc()}%`,
            transition: 'width 0.5s ease-in-out'
          }}></div>
        </div>
      </div>
      </div>
    </Link>
  )
}

export default BudgetItem