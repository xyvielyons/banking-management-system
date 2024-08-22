'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'


const AuthForm = ({type}:{type:string}) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
   

    const formSchema = authFormSchema(type)

        // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    
    // 2. Define a submit handler.
    const onSubmit = async(values: z.infer<typeof formSchema>)=>{
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
      
        setIsLoading(true)
        try {
            //sign-in with appwrite and create plaid token
            if(type === 'sign-up'){
                const newUser = await signUp(values)

                setUser(newUser)
            }
            if(type === 'sign-in'){
                const response = await signIn({
                    email:values.email,
                    password:values.password
                })
                if(response) router.push('/')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
       
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='cursor-pointer items-center gap-1 flex '>
                <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt='Horizon'
                />
                <h1 className='text-26 font-ibm-plex-serif text-black-1'>Horizon</h1>
            </Link>
            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900 '>{user ? 'Link Account' : type=== 'sign-in' ? 'Sign-in' : 'Sign-up'}</h1>
                <p className='text-16 font-normal text-gray-600'>
                    {user ? 'Link your account to get started':'Please enter your details'}
                </p>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4 ">
                {/* plaid link  */}
            </div>
        ):(
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                                <div className="flex gap-4">
                                    <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <div className='form-item'>
                                            <FormLabel className='form-label'>First Name</FormLabel>
                                            <div className="flex w-full flex-col">
                                                <FormControl>
                                                    <Input placeholder='Enter your first name' className='input-class' {...field} type='text'/>
                                                </FormControl>
                                                <FormMessage className='form-message mt-2'/>
                                            </div>
                                        </div>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <div className='form-item'>
                                            <FormLabel className='form-label'>Last Name</FormLabel>
                                            <div className="flex w-full flex-col">
                                                <FormControl>
                                                    <Input placeholder='Enter your last name' className='input-class' {...field} type='text'/>
                                                </FormControl>
                                                <FormMessage className='form-message mt-2'/>
                                            </div>
                                        </div>
                                    )}
                                    />
                                    
                                </div>
                               
                                <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <div className='form-item'>
                                        <FormLabel className='form-label'>Address</FormLabel>
                                        <div className="flex w-full flex-col">
                                            <FormControl>
                                                <Input placeholder='Enter your specific address' className='input-class' {...field} type='text'/>
                                            </FormControl>
                                            <FormMessage className='form-message mt-2'/>
                                        </div>
                                    </div>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <div className='form-item'>
                                        <FormLabel className='form-label'>City</FormLabel>
                                        <div className="flex w-full flex-col">
                                            <FormControl>
                                                <Input placeholder='Nairobi' className='input-class' {...field} type='text'/>
                                            </FormControl>
                                            <FormMessage className='form-message mt-2'/>
                                        </div>
                                    </div>
                                )}
                                />
                                <div className="flex gap-4">
                                    <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <div className='form-item'>
                                            <FormLabel className='form-label'>State</FormLabel>
                                            <div className="flex w-full flex-col">
                                                <FormControl>
                                                    <Input placeholder='Example: KE' className='input-class' {...field} type='text'/>
                                                </FormControl>
                                                <FormMessage className='form-message mt-2'/>
                                            </div>
                                        </div>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="postalCode"
                                    render={({ field }) => (
                                        <div className='form-item'>
                                            <FormLabel className='form-label'>Postal Code</FormLabel>
                                            <div className="flex w-full flex-col">
                                                <FormControl>
                                                    <Input placeholder='Example: 11101' className='input-class' {...field} type='text'/>
                                                </FormControl>
                                                <FormMessage className='form-message mt-2'/>
                                            </div>
                                        </div>
                                    )}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <FormField
                                    control={form.control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                        <div className='form-item'>
                                            <FormLabel className='form-label'>Date of birth</FormLabel>
                                            <div className="flex w-full flex-col">
                                                <FormControl>
                                                    <Input placeholder='YYYY-MM-DD' className='input-class' {...field} type='text'/>
                                                </FormControl>
                                                <FormMessage className='form-message mt-2'/>
                                            </div>
                                        </div>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="ssn"
                                    render={({ field }) => (
                                        <div className='form-item'>
                                            <FormLabel className='form-label'>SSN/ID Number</FormLabel>
                                            <div className="flex w-full flex-col">
                                                <FormControl>
                                                    <Input placeholder='Example:1234' className='input-class' {...field} type='text'/>
                                                </FormControl>
                                                <FormMessage className='form-message mt-2'/>
                                            </div>
                                        </div>
                                    )}
                                    />
                                </div>
                                
                                
                            </>
                        )}
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>Email</FormLabel>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Input placeholder='Enter your email' className='input-class' {...field} type='text'/>
                                    </FormControl>
                                    <FormMessage className='form-message mt-2'/>
                                </div>
                            </div>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>Password</FormLabel>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Input placeholder='Enter your password' className='input-class' {...field} type='password'/>
                                    </FormControl>
                                    <FormMessage className='form-message mt-2'/>
                                </div>
                            </div>
                        )}
                        />
                        <div className="flex flex-col gap-4">
                            <Button disabled={isLoading} className='form-btn' type="submit">
                                {isLoading ? (
                                    <>
                                    <Loader2 size={20} className="animate-spin"/> &nbsp; Loading....
                                    </>
                                ):type === 'sign-in'?'Sign in':'Sign up'}
                            </Button>

                        </div>
                       
                    </form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>{type=== 'sign-in'?"don't have an account?":"Already have an account?"}</p>
                        <Link className='form-link' href={type==='sign-in' ? '/sign-up':'/sign-in'}>{type==='sign-in' ? 'Sign up':'Sign in'}</Link>
                    </footer>
                </Form>
            </>
        ) }    
    </section>
  )
}

export default AuthForm