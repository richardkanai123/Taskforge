import { betterAuth } from "better-auth";
 import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./Prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { username } from "better-auth/plugins"
import { usernameClient } from "better-auth/client/plugins"
 


export const auth = betterAuth({
    secret: process.env.NEXTAUTH_SECRET,
    appName: "TaskForge",
    baseURL: process.env.BASE_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: {
        generateId: () => crypto.randomUUID()
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                defaultValue: 'MEMBER',
                input: false,
            },
            username: {
                type: 'string',
                required: true,
                input: true,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        maxPasswordLength: 20,
        autoSignIn: true
    },

    
    plugins: [
        nextCookies(),
        username(),
        usernameClient(),
        customSession(async ({ session, user }) => { 
            const roleAndUsername = await prisma.user.findUnique({
                where: {
                    id: user.id
                },
                select: {
                    role: true,
                    username: true,
                    image: true,
                    email: true,
                    name: true
                }
            })
            
            return {
                ...session,
                user,
                role: roleAndUsername?.role,
                username: roleAndUsername?.username,
            }
        }
        )
    ]
})
