'use client'
import { LoadingLogo } from "@/components/Loaders/SpinningLogo"

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                    <LoadingLogo size={40} />
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
                        TaskForge
                    </span>
                </div>
                <div className="w-full max-w-3xl p-6 bg-background/50 rounded-lg backdrop-blur-sm">
                    <div className="h-8 w-1/3 bg-muted animate-pulse rounded mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}