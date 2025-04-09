'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"



const ProjectsViewTab = ({ view }: { view: string }) => {
    return (
        <Tabs value={view || "table"} className="w-full">
            <TabsList aria-label="View options">
                <TabsTrigger value="table">
                    <Link href="?view=table">Table View</Link>
                </TabsTrigger>
                <TabsTrigger value="folders">
                    <Link href="?view=folders">Folder View</Link>
                </TabsTrigger>
            </TabsList>

        </Tabs>
    )
}

export default ProjectsViewTab