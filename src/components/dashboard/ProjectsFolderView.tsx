'use client'
import { ProjectWithDetails } from '@/lib/types'
import { Folder, Search } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Input } from "@/components/ui/input"
import { useState } from 'react'

const ProjectsFolderView = ({ projects }: { projects: ProjectWithDetails[] }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProjects = projects?.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="w-full p-4 space-y-4 animate-in">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProjects?.map((project) => (
                    <Link
                        href={`/dashboard/projects/${project.id}`}
                        key={project.id}
                        prefetch
                        className="group hover:bg-muted rounded-lg border p-4 transition-all ease-in-out duration-200 animate-in fade-in-45"
                    >
                        <div className="flex items-start gap-4">
                            <Folder
                                className={`
                                    h-8 w-8  ${project.status === 'IN_PROGRESS' ? 'animate-pulse text-yellow-300' : ''}
                                    ${project.status === 'COMPLETED' ? 'text-green-300' : ''}
                                `}
                            />
                            <div className="space-y-2 flex-1 flex flex-col">
                                <h3 className="font-medium leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                                    {project.title}
                                </h3>
                                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                    <span>Due {format(new Date(project.dueDate), 'MMM dd')}</span>
                                    <span>{project.progress}% complete</span>
                                </div>

                                {/* Progress bar */}
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProjectsFolderView