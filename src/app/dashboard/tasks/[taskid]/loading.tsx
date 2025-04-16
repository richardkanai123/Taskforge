import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Skeleton className="h-8 w-2/3 mb-4" />
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-24" />
                </div>
            </div>

            {/* Status and Assignee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
            </div>

            {/* Description */}
            <div className="mb-8">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-32 rounded-lg" />
            </div>

            {/* Details */}
            <div>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                </div>
            </div>
        </div>
    )
}
