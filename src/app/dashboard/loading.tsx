'use client'
import { LoadingLogo } from "@/components/Loaders/SpinningLogo"

export default function loading() {
    return (

        <div className="container flex items-center flex-1 h-screen">
            <div className="mr-4 flex align-middle justify-center w-full h-ful">

                <LoadingLogo size={32} />
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    TaskForge
                </span>

            </div>

        </div>
    )
}