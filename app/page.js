"use client"
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div>
      <Header/>
      <Hero/>
    </div>
  );
}
