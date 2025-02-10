import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@/components/ui/avatar'

//components are outside the app folder. We only need routes and entry points like page.tsx and layout.tsx in app folder
const Navbar = async () => { //async function only on server side cannot be in "use client"
    const session = await auth()
    console.log(session)
  return (
    <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
        <nav className='flex justify-between items-center'>
            <Link href='/'>
                <Image src='/logo.png' width={144} height={40} alt='logo' />
            </Link>
            <div className='flex items-center gap-5 text-black'>
                {session && session.user ? ( //check if we have an active session and user id from that session
                    <>
                        <Link href='/startup/create'>
                        <span className='max-sm:hidden'>Create</span>
                        <BadgePlus className='size-6 sm:hidden'/>
                        </Link>

                        <form action={async()=>{ /* We use React 19's <form> instead of a simple <button> because 
                                                    the sign-in function is asynchronous. Since <button> is a 
                                                    client-side element, it does not support an async function 
                                                    directly in the onClick property. */


                            "use server"
                            await signOut({redirectTo: '/'}) //redirectTo is a property of signOut function
                        }}>
                            <button type='submit'>
                                <span className='max-sm:hidden'>Logout</span>
                                <LogOut className='size-6 sm:hidden text-red-500'/>
                            </button>
                        </form>

                        <Link href={`/users/${session?.id}`}>
                            <Avatar className="size-10">
                                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}/>
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                        </Link>
                    </>
                    
                ) : (
                    <form action={async()=>{ 
                        "use server"
                        await signIn()
                    }}>
                       <button type='submit' ><span>Login</span></button> 
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar
