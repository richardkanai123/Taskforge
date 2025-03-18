import { LoadingLogo } from '@/components/Loaders/SpinningLogo'
import React, { Suspense } from 'react'
import ResetPasswordForm from './_components/ResetForm'

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<LoadingLogo />}>
            <ResetPasswordForm />
        </Suspense>
    )
}

export default ResetPasswordPage