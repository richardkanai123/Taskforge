'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderArchiveIcon, Table2Icon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

const ProjectsViewTab = ({ view }: { view: string }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleViewChange = (newView: string) => {
        // check if the new view is the same as the current view
        if (newView === view) {
            return
        }
        // Update the view in the URL
        const params = new URLSearchParams(searchParams)
        startTransition(() => {
            params.set('view', newView)
            router.push(`?${params.toString()}`)
        })
    }

    if (isPending) {
        return (
            // spinner
            <Tabs value={view || "table"} className="w-full">
                <TabsList aria-label="View options" >
                    <TabsTrigger
                        value="table"
                        onClick={() => handleViewChange('table')}
                        disabled={isPending}
                    >
                        <Table2Icon className="animate-pulse" />
                    </TabsTrigger>
                    <TabsTrigger
                        value="table"
                        onClick={() => handleViewChange('table')}
                        disabled={isPending}
                    >
                        <FolderArchiveIcon className="animate-pulse" />
                    </TabsTrigger>

                </TabsList>
            </Tabs>

        )
    }

    return (
        <Tabs value={view || "table"} className="w-full">
            <TabsList aria-label="View options" className={isPending ? "opacity-50 animate-pulse ease-linear" : ""}>
                <TabsTrigger
                    className={isPending ? "opacity-50 animate-pulse ease-linear" : ""}
                    value="table"
                    onClick={() => handleViewChange('table')}
                    disabled={isPending}
                >
                    Table
                </TabsTrigger>
                <TabsTrigger
                    className={isPending ? "opacity-50 animate-pulse ease-linear" : ""}
                    value="folders"
                    onClick={() => handleViewChange('folders')}
                    disabled={isPending}
                >
                    Folders
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default ProjectsViewTab