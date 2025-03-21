import { LoadingLogo } from "@/components/Loaders/SpinningLogo"

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center gap-3">
                <LoadingLogo size={40} />
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    TaskForge
                </span>
            </div>
        </div>
    )
}