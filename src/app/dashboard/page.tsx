import LoginBtn from '@/components/Buttons/Login'
import SignUpBtn from '@/components/Buttons/SignUp-Btn'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    console.log(session)
    return (

        <div className='w-full h-full  flex gap-2 flex-1'>
            <LoginBtn />
            <SignUpBtn />
        </div >

    )
}

export default Dashboard