'use server'
import { auth } from "./auth"

export const signIn = async (email: string, password: string) => { 
    console.log(`Credentials:`,email,password)
    try {
        const {user,redirect, url, token} = await auth.api.signInEmail({
        body: {
            email: email,
                password: password,
            },
            redirect: true
        })



        console.log(`Signed in`,user,redirect, url, token)
        if (!user) {
            return { status: 401, body: { message: "Invalid credentials" } };
        }

        console.log(user,url)

        return { status: 200, body: { message: "Login successful", user } };

     
    } catch (error) {
       if(error instanceof Error) {
            return { status: 500, body: { message: error.message, cause :error.cause } };
        }
        console.log(error)
        return { status: 500, body: { message: "Internal Server Error" } };
    }
}

