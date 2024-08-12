"use client"
import React from 'react'
import BudgetList from './_components/BudgetList'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Budget() {
  const route=useRouter();
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl text-gray-100 flex gap-2 items-center'>
      <ArrowLeft onClick={()=>route.back()} className='cursor-pointer' />My Budgets
        </h2>
      <BudgetList/>
    </div>
  )
}

export default Budget