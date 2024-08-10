"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { PenBox } from 'lucide-react'
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
  } from "../../../../../components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '../../../../../components/ui/input'
import { db } from '../../../../../utils/dbconfig'
import Budget from '../../budgets/page'
import { Budgets } from '../../../../../utils/schema'
import { toast } from 'sonner'
import { eq } from 'drizzle-orm'

function EditBudget({budgetInfo, refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
  
    const {user}=useUser();

    useEffect(()=>{
        if(budgetInfo){
            setEmojiIcon(budgetInfo?.icon)
            setAmount(budgetInfo?.amount)
            setName(budgetInfo?.name)
        }
    },[budgetInfo])

    const onUpdateBudget=async()=>{
        const result= await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon
        }).where(eq(Budgets.id, budgetInfo.id))
        .returning();

        if(result){
            refreshData()
            toast('Budget Updated!')
        }
    }
  return (
    <div>
        <Dialog>
        <DialogTrigger asChild>
        <Button className='flex items-center gap-2 bg-indigo-600 text-current hover:text-indigo-600 hover:bg-indigo-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-indigo-300 rounded-md px-3 py-2'>
            <PenBox size={20} />
            <span className="text-lg font-medium">Edit</span>
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">Update Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-6 space-y-4'>
                <div className="relative">
                  <Button
                    variant="outline"
                    className="text-2xl w-12 h-12 rounded-full"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiIcon}
                  </Button>
                  {openEmojiPicker && (
                    <div className='absolute mt-2 z-10'>
                      <EmojiPicker
                        onEmojiClick={(e) => {
                          setEmojiIcon(e.emoji)
                          setOpenEmojiPicker(false)
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="budgetName" className='block text-sm font-medium text-gray-700 mb-1'>Budget Name</label>
                  <Input id="budgetName" placeholder="e.g. Home Decor" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={budgetInfo?.name}
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="budgetAmount" className='block text-sm font-medium text-gray-700 mb-1'>Budget Amount</label>
                  <Input
                    type="number"
                    id="budgetAmount"
                    placeholder="e.g. ₹5000"
                    defaultValue={budgetInfo?.amount}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e)=>setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
            <Button 
              disabled={!(name&&amount)}
              onClick={()=>onUpdateBudget()}
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-300"
            >
              Update Budget
            </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget