"use client"
import { Button } from '../../components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    const {user, isSignedIn} = useUser();

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
            </div>
        </div>
    )
}

export default Header