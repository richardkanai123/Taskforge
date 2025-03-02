'use client'
// sign--up form

import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FcGoogle } from 'react-icons/fc'
import { Separator } from '@/components/ui/separator'

const SignUpForm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your email below to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <Separator className="my-1" />
                        <Button variant="outline" className="w-full">
                            Sign Up with Google <FcGoogle className="ml-2" />
                        </Button>

                        <div className="flex items-center justify-between text-xs">
                            <p>Already have an account?</p>
                            <a href="/sign-in" className="underline">Sign In</a>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignUpForm