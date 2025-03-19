"use client"

import { ChevronRight, Circle, CheckCircle2, Clock } from "lucide-react"
import { sampleTasks, sampleProjects } from "@/app/data/Data"
import { TaskStatus } from "@prisma/client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case TaskStatus.IN_PROGRESS:
      return <Clock className="h-4 w-4 text-blue-500" />
    default:
      return <Circle className="h-4 w-4 text-gray-400" />
  }
}

export function NavMain() {
  // Group tasks by project
  const tasksByProject = sampleProjects.map(project => ({
    title: project.title,
    url: `/dashboard/projects/${project.id}`,
    isActive: false,
    items: sampleTasks
      .filter(task => task.projectId === project.id)
      .map(task => ({
        title: task.title,
        url: `/dashboard/tasks/${task.id}`,
        status: task.status,
        progress: task.progress
      }))
  }))

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects & Tasks</SidebarGroupLabel>
      <SidebarMenu>
        {tasksByProject.map((project) => (
          <Collapsible
            key={project.title}
            asChild
            defaultOpen={project.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full p-2" tooltip={project.title}>
                  <ChevronRight className="h-6 w-6 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  <span className="ml-2">{project.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {project.items.length}
                  </span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {project.items.map((task) => (
                    <SidebarMenuSubItem className="w-fit text-nowrap" key={task.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={task.url} className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <span>{task.title}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {task.progress}%
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
