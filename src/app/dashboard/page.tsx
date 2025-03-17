import LoginBtn from '@/components/Buttons/Login'
import SignUpBtn from '@/components/Buttons/SignUp-Btn'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/sign-in')
    }

    return (

        <div className='w-full h-full  flex gap-2 flex-1'>
            <LoginBtn />
            <SignUpBtn />
        </div >

    )
}

export default Dashboard