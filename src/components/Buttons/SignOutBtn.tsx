'use client'
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
const SignOutBtn = () => {
    const Router = useRouter()
    const session = authClient.useSession()

    if (!session) return null

    return (
        <Button
            variant='destructive'
            onClick={() => {
                authClient.signOut()
                Router.replace('/sign-in')
            }}>
            Sign Out
        </Button>
    )
}

export default SignOutBtn