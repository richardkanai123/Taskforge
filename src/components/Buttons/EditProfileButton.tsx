
'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { authClient } from "@/lib/auth-client"
import toast from "react-hot-toast"
import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    // imageUrl: z.string().url({
    //     message: "Please enter a valid URL.",
    // }),
})

interface EditProfileButtonProps {
    session: {
        user: {
            name: string;
            email: string;
            id: string;
        };
        username: string;
    };
}

export function EditProfileButton({ session }: EditProfileButtonProps) {
    const Router = useRouter()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: session?.user?.name || "",
            username: session?.username || "",
            email: session?.user?.email || "",
        },
    })

    // console.log(session)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO: Implement profile update
        console.log(values)
        const { error } = await authClient.updateUser({
            name: values.name,
        })

        if (error) {
            const { message } = error
            toast.error(message || "An error occurred. Please try again.")
            return
        }


        toast.success("Profile updated successfully.")
        setIsDialogOpen(false)
        Router.push('/profile')

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button size="lg" variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        You can only edit your name here. For other changes, please contact support.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-right">Name</FormLabel>
                                    <FormControl className="col-span-3">
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            disabled
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-right">Username</FormLabel>
                                    <FormControl className="col-span-3">
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage className="col-start-2 col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            disabled
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-right">Email</FormLabel>
                                    <FormControl className="col-span-3">
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3" />
                                </FormItem>
                            )}
                        />

                        <div className="w-full my-2 mx-auto">
                            {
                                form.formState.errors.root && <FormMessage className="text-red-500">{form.formState.errors.root.message}</FormMessage>
                            }
                        </div>
                        <div className="flex justify-end">
                            <Link
                                href="/reset-password"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Reset Password →
                            </Link>
                        </div>
                        <DialogFooter>
                            <Button
                                size="lg"
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? "Saving..." : "Save changes"}
                                {form.formState.isSubmitting &&
                                    <Loader2Icon className="w-5 h-5 ml-2" />
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
