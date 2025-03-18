import LoginBtn from '@/components/Buttons/Login'
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
        </div >

    )
}

export default Dashboard