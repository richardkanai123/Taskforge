import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getUserProjects } from "@/lib/actions/get-projects"
import { Suspense } from "react"
import { SidebarSkeleton } from "@/components/Loaders/SidebarSkeleton"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { projects, message, status } = await getUserProjects()

  return (
    <Sidebar className="pt-[70px] bg-background/75" collapsible="icon" {...props}>

      <SidebarContent className="overflow-y-auto bg-background/75">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarTrigger className="self-end" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <Suspense fallback={<SidebarSkeleton />}>
          <NavMain Projects={projects} message={status !== 200 ? message : 'success'} />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={
          <div className="flex items-center gap-3 p-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-muted" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-2 w-16 bg-muted/80 rounded" />
            </div>
          </div>
        }>
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
