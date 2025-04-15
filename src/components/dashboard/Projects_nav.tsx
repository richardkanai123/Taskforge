'use client'
import React, { Suspense } from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { Folder, ListTodo, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { LoadingLogo } from '../Loaders/SpinningLogo'
import ProjectNav from './ProjectNav'
import { usePathname } from 'next/navigation'
import { ProjectWithDetails } from '@/lib/types'

const Projectsnav = ({ Projects, message }: { Projects: ProjectWithDetails[] | null, message: string }) => {

    const pathname = usePathname()

    // take the first five project
    const sortedProjects = Projects?.slice(0, 5)
    return (
        <SidebarGroup>
            <div className="flex items-center justify-between px-2 mb-2">
                <SidebarGroupLabel>
                    <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        Projects
                    </div>
                </SidebarGroupLabel>
                <Button
                    size="icon"
                    className="w-fit p-2"
                    asChild
                >
                    <Link href="/dashboard/projects/create-new">
                        New
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip={"Your Projects"} asChild>
                        <Link className={` mb-3 ${pathname === '/dashboard/projects' ? 'text-primary' : ''}`} href="/dashboard/projects">
                            <ListTodo className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                            <span>Your Projects</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <Suspense fallback={<LoadingLogo />}>
                    <div className="w-full px-2 space-y-3">
                        {sortedProjects ? (
                            sortedProjects.map((project) => (
                                <ProjectNav project={project} key={project.id} />
                            ))
                        ) : (
                            <div className="w-full p-2 flex flex-col">
                                <p>No Projects found</p>
                                <p>{message}</p>
                            </div>
                        )}
                    </div>
                </Suspense>
            </SidebarMenu>
        </SidebarGroup >
    )
}

export default Projectsnav