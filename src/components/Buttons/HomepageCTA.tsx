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
            <Button
                asChild
                variant='default'
                size='lg'
                className="w-full" // Make button fill container
            >
                <Link href="/sign-in">Get Started</Link>
            </Button>
        )
    }

    return (
        <Button
            asChild
            variant='default'
            size='lg'
            className="w-full" // Make button fill container
        >
            <Link href="/dashboard">View Dashboard</Link>
        </Button>
    )
}

export default HomepageCTA