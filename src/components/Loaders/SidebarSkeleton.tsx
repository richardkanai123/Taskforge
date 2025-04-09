import { Separator } from "@/components/ui/separator"

export function SidebarSkeleton() {
    return (
        <div className="space-y-6 p-2">
            {/* Main Nav Items */}
            <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 animate-pulse">
                    <div className="w-4 h-4 rounded bg-muted" />
                    <div className="h-4 w-24 bg-muted rounded" />
                </div>
                <div className="flex items-center gap-3 p-2 animate-pulse">
                    <div className="w-4 h-4 rounded bg-muted" />
                    <div className="h-4 w-24 bg-muted rounded" />
                </div>
            </div>

            <Separator />

            {/* Projects Section */}
            <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2 animate-pulse">
                        <div className="w-4 h-4 rounded bg-muted" />
                        <div className="h-4 w-16 bg-muted rounded" />
                    </div>
                    <div className="w-6 h-6 rounded bg-muted animate-pulse" />
                </div>
                {/* Project Items */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
                        <div className="w-4 h-4 rounded bg-muted" />
                        <div className="h-4 flex-1 bg-muted rounded" />
                        <div className="w-8 h-8 rounded-full bg-muted" />
                    </div>
                ))}
            </div>

            <Separator />

            {/* Tasks Section */}
            <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2 animate-pulse">
                        <div className="w-4 h-4 rounded bg-muted" />
                        <div className="h-4 w-12 bg-muted rounded" />
                    </div>
                    <div className="w-6 h-6 rounded bg-muted animate-pulse" />
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
                        <div className="w-4 h-4 rounded bg-muted" />
                        <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
}
