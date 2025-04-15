import { Card, CardContent } from "@/components/ui/card"

export default function LoadingProjectPage() {
    return (
        <div className="p-6 space-y-8">
            {/* Project Header Skeleton */}
            <div className="space-y-4">
                <div className="h-8 w-1/3 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded-lg animate-pulse" />
            </div>

            {/* Project Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tasks Table Skeleton */}
            <div className="rounded-lg border">
                <div className="h-16 border-b bg-muted/5">
                    <div className="px-4 py-5 flex gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-4 w-24 bg-muted rounded animate-pulse" />
                        ))}
                    </div>
                </div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b last:border-none">
                        <div className="px-4 py-4 flex gap-4">
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className="h-4 w-24 bg-muted rounded animate-pulse" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
