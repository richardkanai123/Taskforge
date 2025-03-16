import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const HomepageCTA = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return (
            <Button asChild variant='default' size='lg'>
                <Link className='' href="/sign-in">Get Started</Link>
            </Button>
        )
    }


    return (
        <Button asChild variant='default' size='lg'>
            <Link className='' href="/dashboard">View DashBoard</Link>
        </Button>
    )
}

export default HomepageCTA