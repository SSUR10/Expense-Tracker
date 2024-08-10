"use client"
import { Button } from '../../components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

function Header() {
    const {user, isSignedIn} = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='p-5 flex justify-between items-center shadow-sm bg-gray-900'>
            <div>
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={160}
                    height={100}
                    className="logo-white"
                    priority
                />
            </div>
            <div className="flex gap-4">
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <>
                        <Link href='/sign-up'><Button className="border border-blue-600 rounded-md bg-blue-600">Sign Up</Button></Link>
                        <Link href='/sign-in'><Button className="border border-blue-600 rounded-md bg-gray-900 text-white hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">Login</Button></Link>
                    </>
                )}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden md:block sm:block"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden md:block sm:block"
                    onClick={toggleMenu}
                >
                    <div
                        className="fixed top-0 left-0 w-64 h-screen bg-gray-900 p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Add your menu items here */}
                        <ul>
                            <li>
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/budgets">Budgets</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/expenses">Expenses</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/upgrade">Upgrade</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header