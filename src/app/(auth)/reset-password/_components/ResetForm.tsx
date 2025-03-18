"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const ResetPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
})

type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>

const ResetPasswordForm = () => {
    const searchParams = useSearchParams()
    const emailParam = searchParams.get('email')

    const form = useForm<ResetPasswordInput>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: emailParam || '',
        },
    })

    const onSubmit = async (data: ResetPasswordInput) => {
        console.log(data)
        try {

            // TODO: Implement password reset logic
            toast.success("If an account exists with this email, you will receive reset instructions.")
            form.reset()
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Please try again.")
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
            <div className='w-full max-w-screen-sm mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden'>
                {/* Gradient Header */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                    <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-100">
                        Enter your email address and we&apos;ll send you instructions to reset your password.
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold">
                                            Email address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="name@example.com"

                                                className="h-11 px-4 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={form.formState.isLoading || form.formState.isSubmitting}
                                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                {form.formState.isLoading || form.formState.isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending...
                                    </div>
                                ) : (
                                    "Send Reset Instructions"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Footer Links */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                        <p className="text-center">
                            Remember your password?
                            <Link href="/sign-in" className="ml-2 text-blue-600 hover:underline">
                                Sign In
                            </Link>
                        </p>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <Link
                            href="/sign-up"
                            className="text-blue-600 hover:underline"
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordForm