"use client"
import React, { useState } from 'react'
import { useUser } from "@clerk/nextjs";
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
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Budgets } from '../../../../../utils/schema'
import { toast } from 'sonner'
import { db } from '../../../../../utils/dbconfig';

function CreateBudget({refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState('😀');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const {user}=useUser();
  /**
   * Used to create new budget
   */
  const onCreateBudget=async()=>{
    if (!user) {
      toast('You must be logged in to create a budget');
      return;
    }
    const result=await db.insert(Budgets)
    .values({
      name:name,
      amount:amount,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      icon:emojiIcon
    }).returning({insertedId:Budgets.id})

    if(result)
    {
      refreshData()
      toast('New Budget Created!')
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className='bg-blue-100 text-gray-900 p-10 rounded-lg items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md hover:bg-teal-100 hover:border-blue-300 transition-all duration-300'>
            <h2 className='text-3xl transition-transform duration-300 group-hover:scale-110'>+</h2>
            <h2 className='transition-colors duration-300 group-hover:text-blue-600'>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">Create New Budget</DialogTitle>
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
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="budgetAmount" className='block text-sm font-medium text-gray-700 mb-1'>Budget Amount</label>
                  <Input
                    type="number"
                    id="budgetAmount"
                    placeholder="e.g. ₹5000"
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
              onClick={()=>onCreateBudget()}
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-300"
            >
              Create Budget
            </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default CreateBudget