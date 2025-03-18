'use client'
import { SignInSchema, SignInInput } from "@/lib/schemas/users"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { BetterAuthError } from "better-auth"
const SignInForm = () => {
    const Router = useRouter()

    const form = useForm<SignInInput>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: SignInInput) => {
        try {
            const { error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: true
            }, {
                onSuccess: () => {
                    toast.success(`Logged in`, {
                        icon: '🔓'
                    })
                    Router.push("/dashboard")
                },
            })
            if (error) {
                if (error instanceof Error || BetterAuthError) {
                    toast.error(error.message as string)
                    form.setError('root', { message: error.message as string })
                    return
                }
                toast.error("Something went wrong!")
                return
            }

        } catch (error) {
            if (error instanceof Error) {
                form.setError('root', { message: error.message })
                toast.error(error.message)
                return
            }
            toast.error("Something went wrong!")
            form.setError('root', { message: 'An unknown error occurred!, please try again' })
            return
        }
    }





    return (
        <div className='w-full max-w-screen-sm mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden'>
            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <h3 className="text-3xl font-bold text-white">Sign In</h3>
                <p className="text-gray-100 mt-2">
                    Sign in to TaskForge and start managing your projects efficiently
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-6">
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder="your@email.com"
                                            {...field}
                                            className="h-11 px-4 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Your email address
                                    </FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder="••••••••"
                                            {...field}
                                            className="h-11 px-4 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Your password
                                    </FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* form error */}

                    {form.formState.errors.root && <FormMessage className="text-red-500 py-2">{form.formState.errors.root.message} </FormMessage>}


                    <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        {
                            form.formState.isSubmitting ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                </svg>
                            ) : (
                                "Sign In"
                            )
                        }
                    </Button>
                </form>
            </Form>



            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                    <p className="text-center">
                        Don&apos;t have an account?
                        <Link href="/sign-up" className="ml-2 text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <p className="text-center">
                        Forgot your password?
                        <Link href={`/reset-password?email=${form.getValues('email')}`} className="ml-2 text-blue-600 hover:underline">
                            Reset Password
                        </Link>
                    </p>
                </div>
            </div>

        </div>

    )
}

export default SignInForm