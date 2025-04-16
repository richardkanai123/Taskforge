import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="p-4 mx-auto w-full">
            <div className="h-[700px] p-4 bg-white dark:bg-gray-700 rounded-lg space-y-4">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                    {/* Week days */}
                    {Array(7).fill(0).map((_, i) => (
                        <Skeleton key={`weekday-${i}`} className="h-8" />
                    ))}

                    {/* Calendar days */}
                    {Array(35).fill(0).map((_, i) => (
                        <Skeleton key={`day-${i}`} className="h-24" />
                    ))}
                </div>
            </div>
        </div>
    )
}
