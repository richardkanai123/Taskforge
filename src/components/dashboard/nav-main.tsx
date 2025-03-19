"use client"

import {
  Folder,
  ListTodo,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  Plus,
  LayoutDashboardIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/sidebar"
import { TaskStatus } from "@prisma/client"
import { sampleProjects } from "@/app/data/Data"
import { getProgressColor } from "@/lib/utils"

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



// TODO: Replace this with actual project progress calculation from the database
// This is temporary and generates random progress values between 0-100
const getRandomProgress = () => Math.floor(Math.random() * 100)

export function NavMain() {
  const pathname = usePathname()

  return (
    <>
      {/* Quick Actions */}
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard"
                className={`w-full flex items-center gap-2 ${pathname === '/dashboard' ? 'text-primary' : ''
                  }`}
              >
                <LayoutDashboardIcon className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard/calendar"
                className={`w-full flex items-center gap-2 ${pathname === '/dashboard/calendar' ? 'text-primary' : ''
                  }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {/* Projects Section */}
      <SidebarGroup>
        <div className="flex items-center justify-between px-2 mb-2">
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Projects
            </div>
          </SidebarGroupLabel>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            asChild
          >
            <Link href="/dashboard/projects/create-new">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link className={`${pathname === '/dashboard/projects' ? 'text-primary' : ''}`} href="/dashboard/projects">
                <span>All Projects</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
                <ChevronRight className="h-3 w-3" />
                <span>Recent Projects</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {sampleProjects.map((project) => {
                // TODO: Replace random progress with actual project progress calculation
                const progress = getRandomProgress()
                return (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className={`w-full flex items-center gap-2 group ${pathname === `/dashboard/projects/${project.id}` ? 'text-primary' : ''
                          }`}
                      >
                        <div
                          className={`h-4 w-4 rounded-sm flex-shrink-0 transition-colors`}
                          style={{
                            backgroundColor: getProgressColor(progress),
                            opacity: pathname === `/dashboard/projects/${project.id}` ? 1 : 0.7
                          }}
                        >
                          <Folder className="h-4 w-4 text-white/80 p-0.5" />
                        </div>
                        <span className="truncate">{project.title}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {progress}%
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </CollapsibleContent>
          </Collapsible >
        </SidebarMenu >
      </SidebarGroup >

      {/* Tasks Section */}
      <SidebarGroup>
        <div className="flex items-center justify-between px-2 mb-2">
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              Tasks
            </div>
          </SidebarGroupLabel>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            asChild
          >
            <Link href="/dashboard/tasks/create-new">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link className={`${pathname === `/dashboard/tasks` ? 'text-primary' : ''}`} href="/dashboard/tasks">
                <span>All Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/tasks?status=in_progress">
                {getStatusIcon(TaskStatus.IN_PROGRESS)}
                <span>In Progress</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/tasks?status=completed">
                {getStatusIcon(TaskStatus.COMPLETED)}
                <span>Completed</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/tasks?status=open">
                {getStatusIcon(TaskStatus.OPEN)}
                <span>Open</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
