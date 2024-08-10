import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
<section className="bg-gray-900 text-white flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-16 lg:py-24 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center mb-8 lg:mb-16">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
        Manage Your Expense

        <span className="sm:block"> Control Over Money </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Simplify spending, amplify savings, <br/>Master your money, one transaction at a time.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white transition duration-150 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/sign-up">
          Get Started
        </a>
      </div>
    </div>
  </div>
  <div className="w-full px-4 mt-8 sm:mt-16 lg:mt-[-150px] max-w-screen-xl mx-auto">
        <div className="lg:w-11/12 xl:w-10/12 mx-auto">
          <Image 
            src={'/dashboard.png'} 
            alt='dashboard'
            width={1200}
            height={900}
            className='rounded-xl border-2 w-full h-auto shadow-2xl shadow-black/50'
          />
        </div>
      </div>
</section>
  )
}

export default Hero
