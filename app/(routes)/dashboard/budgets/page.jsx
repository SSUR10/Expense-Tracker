import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl text-gray-100'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default Budget