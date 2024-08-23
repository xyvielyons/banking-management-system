'use client'
import React, { useCallback,useEffect,useState } from 'react'
import { Button } from '../ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { StyledString } from 'next/dist/build/swc'
import { useRouter } from 'next/navigation'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import Image from 'next/image'
const PlaidLink = ({user,variant}:PlaidLinkProps) => {
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(()=>{
        const getLinkToken = async () =>{
            const data = await createLinkToken(user)

            setToken(data?.linkToken)
        }
        getLinkToken()
    },[user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token:string)=>{
        await exchangePublicToken({
            publicToken:public_token,
            user
        })
        router.push('/');
    },[user])

    const config:PlaidLinkOptions = {   
        token,
        onSuccess
    }
    const { open, exit, ready } = usePlaidLink(config); 
    return (
    <>
    {variant === 'primary' ? (
        <Button className='plaidlink-primary' onClick={()=>open()} disabled={!ready}>
            Connect bank
        </Button>
    ):variant === 'ghost' ? (
        <Button onClick={()=>open()} className='plaidlink-ghost' variant='ghost'>
            <Image
            src='/icons/connect-bank.svg'
            alt='Connect bank'
            width={24}
            height={24}
            />
            <p className='text-[16px] hidden  font-semibold text-black-2 xl:block'>Connect bank</p>
        </Button>
    ):(
        <Button onClick={()=>open()} className='plaidlink-default'>
            <Image
            src='/icons/connect-bank.svg'
            alt='Connect bank'
            width={24}
            height={24}
            />
            <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
    )}
    </>
  )
}

export default PlaidLink