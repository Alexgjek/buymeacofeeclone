'use client';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugHot } from '@fortawesome/free-solid-svg-icons'
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import {parseFullName} from 'parse-full-name';
import Image from 'next/image';

export default function Header({session}:{session:Session|null}) {
  const name = session?.user?.name || ' ';
  const {first: firstName} = parseFullName(name);
  
  return (
    <>
    <header className="bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between">
          <Link href={'/'} className="inline-flex gap-1 items-center">
            <FontAwesomeIcon icon={faMugHot} className="h-8" />
            <span className="mt-2 font-semibold">
              Buy me a coffee
            </span>
          </Link>
          <nav className="mt-2 flex gap-6 items-center">
            <Link href={'/about'} className="">About</Link>
            <Link href={'/contact'}>Contact</Link>
            <Link href={'/FAQ'}>FAQ</Link>
            <div className="flex gap-4">
              {session && (
                <div>
                   <Link href={'/profile'}
                    className="flex items-center bg-yellow-300 rounded-full p-1 gap-2 pr-4"
                    >
                    <Image src={session.user?.image as string} alt={"avatar"} width="36" height = "36"
                    className="rounded-full"></Image>
                    {firstName}
                  </Link>
                </div>
              )}
              {!session && (
                <>
                  <button 
                  className="border-2 rounded-full px-4 py-2 ml-4"
                  onClick={ () => signIn('google')}>
                    Login
                  </button>
                  <button className="bg-yellow-300 rounded-full px-4 py-2"
                    onClick={ () => signIn('google')}>
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
  </>
  )
 
}