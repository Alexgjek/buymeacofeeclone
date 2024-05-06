'use client';
import { signIn } from "next-auth/react";
export default function StartMyPage() {
  return (
    <button 
      onClick={() => signIn('google')}
      className="bg-yellow-300 px-8 py-4 font-bold rounded-full">
      Start my page
    </button>
  )
}