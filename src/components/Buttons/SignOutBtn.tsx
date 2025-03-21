'use client'
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
const SignOutBtn = () => {
    const Router = useRouter()
    const session = authClient.useSession()

    if (!session) return null

    return (
        <Button
            variant='destructive'
            onClick={async () => {
                const { error } = await authClient.signOut()

                console.log(error)
                if (error) {
                    toast.error(error.message || 'An error occurred')
                    Router.refresh()
                    return
                }

                toast.success('Signed out successfully, bye', { icon: '👋' })
                Router.replace('/sign-in')
            }}>
            Sign Out
        </Button>
    )
}

export default SignOutBtn