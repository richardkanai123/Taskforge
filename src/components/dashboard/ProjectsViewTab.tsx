import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProjectsViewTab = () => {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">
                    Table
                </TabsTrigger>
                <TabsTrigger value="password">
                    Folders
                </TabsTrigger>
            </TabsList>
        </Tabs>

    )
}

export default ProjectsViewTab