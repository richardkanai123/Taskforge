'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

const LoginBtn = () => {
    const { data, isPending } = authClient.useSession()


    if (data) {

        return (
            <Button
                disabled={isPending}
                size='lg'
                onClick={async () => {
                    try {
                        await authClient.signOut()
                    } catch (error) {
                        console.log(error)
                    }
                }}
                variant='default'
                className='mx-auto bg-primary text-white'
            >
                {isPending ? "Loading..." : `Logout ${data.user.name}`}
            </Button>
        )
    }
    return (

        <Button
            disabled={isPending}
            size='lg'
            onClick={async () => {
                try {
                    const { data, error } = await authClient.signIn.email({
                        email: "exampleone@example.com",
                        password: "12345678",
                    })

                    if (error) {
                        console.log(error)
                        return
                    }
                    console.log(data)
                } catch (error) {
                    console.log(error)
                }
            }}
            variant='default'
            className='mx-auto bg-primary text-white'
        >
            {isPending ? "Loading..." : "Login"}
        </Button>
    );

}

export default LoginBtn