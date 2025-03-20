'use client'

import { authClient } from "@/lib/auth-client"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { useState } from "react"

const VerifyEmailBtn = ({ email }: { email: string }) => {
    const { data } = authClient.useSession()
    const [loading, setLoading] = useState(false)

    if (data?.user?.email !== email) {
        return null
    }

    const VerifyEmail = async () => {
        await authClient.sendVerificationEmail({
            email: email,
            callbackURL: "/dashboard", // The redirect URL after verification
        }, {
            onRequest: () => {
                setLoading(true)
            },
            onSuccess: () => {
                setLoading(false)
            },
            onError: (ctx) => {
                setLoading(false)
                console.log(ctx.error)
                toast.error(ctx.error.message || "Failed to send verification email")
            }
        });
    }


    return (
        <Button onClick={async () => VerifyEmail()} size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            {loading ? "Sending..." : "Verify Email"}
        </Button>
    )
}

export default VerifyEmailBtn