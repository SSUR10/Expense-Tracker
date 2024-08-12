"use client"
import React from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation'

const features = [
  { name: 'Basic Expense Tracking', free: true, premium: true },
  { name: 'Budget Creation', free: true, premium: true },
  { name: 'Monthly Reports', free: true, premium: true },
  { name: 'Unlimited Budgets', free: false, premium: true },
  { name: 'Expense Categories', free: '5 categories', premium: 'Unlimited' },
  { name: 'Data Export', free: false, premium: true },
  { name: 'Bill Reminders', free: false, premium: true },
  { name: 'Investment Tracking', free: false, premium: true },
  { name: 'Multi-Currency Support', free: false, premium: true },
  { name: 'Priority Support', free: false, premium: true },
];

const PricingTier = ({ title, price, features, isPremium }) => (
  <div className={`p-6 rounded-lg ${isPremium ? 'bg-[#e6fff7]' : 'bg-white'}`}>
    <h2 className="text-2xl font-bold mb-4 text-[#333333]">{title}</h2>
    <p className="text-3xl font-bold mb-6 text-[#0066cc]">{price}</p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          {isPremium ? (
            typeof feature.premium === 'boolean' ? (
              feature.premium ? (
                <Check className="text-green-600 mr-2" />
              ) : (
                <X className="text-red-600 mr-2" />
              )
            ) : (
              <span className="font-medium mr-2 text-[#0066cc]">
                {feature.premium}
              </span>
            )
          ) : (
            typeof feature.free === 'boolean' ? (
              feature.free ? (
                <Check className="text-green-600 mr-2" />
              ) : (
                <X className="text-red-600 mr-2" />
              )
            ) : (
              <span className="font-medium mr-2 text-[#0066cc]">
                {feature.free}
              </span>
            )
          )}
          <span className="text-[#444444]">{feature.name}</span>
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-2 px-4 rounded text-white transition duration-300 ease-in-out ${
        isPremium
          ? 'bg-teal-400 hover:bg-teal-700'
          : 'bg-indigo-500 hover:bg-indigo-700'
      }`}
    >
      {isPremium ? 'Upgrade Now' : 'Current Plan'}
    </button>
  </div>
);

const UpgradePage = () => {
  const route=useRouter();
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-100">
        <ArrowLeft onClick={()=>route.back()} className='cursor-pointer size-10' />Upgrade Your Plan</h1>
        <p className="text-xl text-center text-teal-400 mb-12">
          Get more features and take control of your finances!
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <PricingTier
            title="Free Plan"
            price="₹0/month"
            features={features}
            isPremium={false}
          />
          <PricingTier
            title="Premium Plan"
            price="₹50/month"
            features={features}
            isPremium={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;