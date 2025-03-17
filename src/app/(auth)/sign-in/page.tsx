import React from 'react'
import SignInForm from './_Components/sign-in-form'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const SignInPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session) {
        redirect('/dashboard')
    }

    return (
        <div className="w-full flex items-center justify-center align-middle min-h-screen p-2">
            <SignInForm />
        </div>
    )
}

export default SignInPage