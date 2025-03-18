'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LoginBtn = () => {
    const { data, isPending } = authClient.useSession()
    const Router = useRouter()

    if (data) {
        return (
            <Button
                variant='destructive'
                disabled={isPending}
                size='lg'
                onClick={async () => {
                    try {
                        await authClient.signOut()
                        toast.success(`See you later`, {
                            icon: '👋'
                        })
                        Router.replace("/")
                    } catch (error) {
                        if (error instanceof Error) {
                            toast.error(error.message)
                            return
                        }

                        toast.error("Something went wrong")
                        return
                    }
                }}
                className='mx-auto text-white'
            >
                <Image src={data.user.image || `https://ui-avatars.com/api/?name=${data.user.name}`} alt="Logout" className='rounded-full' width={24} height={24} />
                Logout
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