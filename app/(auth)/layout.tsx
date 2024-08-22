import React from 'react'
import Image from 'next/image';
const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className='flex min-h-screen w-full justify-between font-inter'>
    {children}
    <div className="auth-asset">
      <div className="">
        <Image
        src="/icons/auth-image.svg"
        alt='Aith Image'
        width={500}
        height={500}
        />
      </div>
    </div>
    </main>
  )
}

export default RootLayout