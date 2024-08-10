import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-md flex justify-between bg-gray-900'>
        <div>
        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default DashboardHeader