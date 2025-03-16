'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
const SignUpBtn = () => {
    const Router = useRouter()
    return (
        <Button onClick={async () => {
            try {
                const res = await fetch('/api/users/signup',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email: "exampleone@example.com",
                            password: "12345678",
                            name: "Example one",
                            username: "exampleone",

                        })
                    })

                const response = await res.json();
                if (res.status !== 201) {
                    console.log(response)
                }
                Router.push('/')

            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
                else {
                    console.log('Unknown error:', error)
                }

            }

        }} size='lg' className='mx-auto bg-primary text-white'>Sign Up</Button>
    )
}

export default SignUpBtn