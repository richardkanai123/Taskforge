import React from 'react'
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import Link from 'next/link'
import { Folder } from 'lucide-react'
import { ProjectWithDetails } from '@/lib/types'
import { usePathname } from 'next/navigation'

const ProjectNav = ({ project }: { project: ProjectWithDetails }) => {
    const pathname = usePathname()
    return (
        <SidebarMenuItem key={project.id}>
            <SidebarMenuButton tooltip={project.title} asChild>
                <Link
                    href={`/dashboard/projects/${project.id}`}
                    className={`w-full flex items-center gap-3 px-3 py-4 hover:bg-accent rounded-md border-b group ${pathname === `/dashboard/projects/${project.id}` ? 'text-primary bg-sidebar-accent' : ''
                        }`}
                >
                    <Folder className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                    <span className="flex-1 truncate text-sm">{project.title}</span>
                    <div className="flex-shrink-0 relative w-8 h-8">
                        <svg className="w-full h-full" viewBox="0 0 40 40">
                            <circle
                                cx="20"
                                cy="20"
                                r="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-accent-foreground/10"
                            />
                            <circle
                                cx="20"
                                cy="20"
                                r="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeDasharray={`${project.progress}, 100`}
                                className="text-primary  "
                                transform="rotate(-90 20 20)"
                            />
                            <text
                                x="20"
                                y="20"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                className="text-center  font-medium fill-current"
                            >
                                {project.progress}
                            </text>
                        </svg>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default ProjectNav