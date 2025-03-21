'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
// dsiplayed when there is an error with the authentication

const AuthErrorComponent = ({ message }: { message: string }) => {
    const Router = useRouter()
    return (

        <div className="mx-auto w-full flex items-center justify-center min-h-screen">
            <div className="text-center">
                <svg
                    className="mx-auto h-16 w-16 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Authentication Error</h3>
                <p className="mt-2 text-gray-600">{message}</p>
                <Button
                    onClick={() => Router.refresh()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Try Again
                </Button>
            </div>
        </div>

    )
}

export default AuthErrorComponent