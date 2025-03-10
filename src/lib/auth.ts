import { betterAuth } from "better-auth";
 import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./Prisma";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
    secret: process.env.NEXTAUTH_SECRET,
    appName: "TaskForge",
    baseURL: process.env.BASE_URL,
   database: prismaAdapter(prisma, {
       provider: "postgresql",
   }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        maxPasswordLength: 20,
        autoSignIn: true
    },
    user: {
        modelName: "users",
        emailField: "email",
        passwordField: "password",
        roleField: "role",
        usernameField: "username",
        fullnameField: "fullname",
        createdAtField: "createdAt", 
    },

    
    plugins: [
    nextCookies()
]
})