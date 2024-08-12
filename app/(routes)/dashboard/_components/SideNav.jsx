"use client"
import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { LayoutDashboard, PiggyBank, ReceiptIndianRupee, ShieldCheck, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Expenses', icon: ReceiptIndianRupee, path: '/dashboard/expenses' },
    { id: 4, name: 'Upgrade', icon: ShieldCheck, path: '/dashboard/upgrade' }
  ];
  const path = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-md"
      >
        <Menu />
      </button>
      
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col h-screen p-5 shadow-sm bg-gray-900 z-20 w-64`}>
        <div className="flex justify-between items-center">
          <Image src='/logo.svg' width={160} height={100} alt="logo" className="logo-white" />
          <button onClick={toggleSidebar} className="lg:hidden text-white">
            <X size={24} />
          </button>
        </div>
        <div className='mt-10'>
          {menuList.map((menu) => (
            <Link href={menu.path} key={menu.id} onClick={() => setIsOpen(false)}>
              <h2 className={`flex gap-4 items-center text-gray-200 mb-2 font-medium p-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:text-teal-600 hover:bg-blue-100 ${path === menu.path ? 'text-gray-700 bg-blue-100' : ''}`}>
                <menu.icon className="text-teal-600" />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className='mt-auto p-5 flex gap-3 items-center text-gray-200'>
          <UserButton />
          Profile
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}

export default SideNav;