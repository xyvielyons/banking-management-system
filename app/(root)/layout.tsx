import Sidebar from '@/components/shared/Sidebar';
import Image from 'next/image';
import React from 'react'
import MobileNav from '@/components/shared/MobileNav';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
const RootLayout = async({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  const loggedIn = await getLoggedInUser()

  if(!loggedIn) redirect('/sign-in')
  return (
    <main className='flex h-screen w-full font-inter'>
      <Sidebar user={loggedIn}></Sidebar>

      <div className='flex size-full flex-col'>
        <div className='root-layout'>
          <Image
          src="/icons/logo.svg"
          alt='logo'
          width={30}
          height={30}
          />
          <div className="">
            <MobileNav user={loggedIn}/>
          </div>
        </div>
        {children}
      </div>
   
    </main>
  )
}

export default RootLayout