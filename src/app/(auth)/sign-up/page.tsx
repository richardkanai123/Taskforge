import React from 'react'
import SignUpForm from './_Components/sign-up-form'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const SignUpPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session) {
        redirect('/dashboard')
    }


    return (
        <div className="w-full flex items-center justify-center align-middle min-h-screen mx-auto py-3">
            <SignUpForm />
        </div>
    )
}

export default SignUpPage