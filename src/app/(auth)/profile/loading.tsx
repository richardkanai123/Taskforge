import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
    return (
        <div className="h-screen w-full mx-auto py-10">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Header with cover image */}
                <Skeleton className="h-32 w-full" />

                {/* Profile section */}
                <div className="relative px-6 pb-6">
                    {/* Avatar */}
                    <div className="absolute -top-16 left-6">
                        <Skeleton className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800" />
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48" /> {/* Name */}
                                <Skeleton className="h-4 w-32" /> {/* Username */}
                                <Skeleton className="h-4 w-40" /> {/* Email */}
                            </div>
                            <Skeleton className="h-10 w-24" /> {/* Edit button */}
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-3 gap-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="text-center space-y-2">
                                    <Skeleton className="h-8 w-12 mx-auto" />
                                    <Skeleton className="h-4 w-16 mx-auto" />
                                </div>
                            ))}
                        </div>

                        {/* Member Since */}
                        <div className="mt-6">
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}