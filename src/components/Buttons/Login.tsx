'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const LoginBtn = () => {
    const { data, isPending } = authClient.useSession()
    const Router = useRouter()

    if (isPending) {
        return <Button className='animate-pulse ' variant='ghost' disabled>Loading...</Button>
    }

    if (data) {
        return (
            <Button variant='ghost' onClick={() => {
                Router.push('/profile')
            }}>
                hi {data.username}
            </Button>
        )
    }


    return (
        <Button
            disabled={isPending}
            size='lg'
            onClick={async () => {
                Router.push("/sign-in")
            }}
            variant='default'
            className='mx-auto bg-primary text-white'
        >
            {isPending ? "Loading..." : "Login"}
        </Button>
    );

}

export default LoginBtn