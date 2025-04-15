export default function Loading() {
    return (
        <div className="flex flex-col w-full h-full p-4 space-y-4 max-w-screen-xl mx-auto">
            {/* Header loading */}
            <div className="p-2 mx-auto w-full flex align-middle justify-around">
                <div className="flex flex-col">
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-2" />
                </div>
                <div className="self-end ml-auto">
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>

            {/* Charts and Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Chart Loading */}
                <div className="p-4 rounded-lg border">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-[300px] w-full bg-gray-100 rounded animate-pulse" />
                </div>

                {/* Activity Loading */}
                <div className="p-4 rounded-lg border">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="p-2 border rounded-md">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="h-1 w-full bg-gray-200 rounded animate-pulse mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tasks Board Loading */}
            <div className="w-full h-[200px] bg-gray-100 rounded animate-pulse" />

            {/* Projects Table Loading */}
            <div className="w-full space-y-4">
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
            </div>
        </div>
    );
}
