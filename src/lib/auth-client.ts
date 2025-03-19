import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";
export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL,
    plugins: [
        nextCookies(),
        customSessionClient<typeof auth>()
    ]
})