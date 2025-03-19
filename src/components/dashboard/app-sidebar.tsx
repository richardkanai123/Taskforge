"use client"

import * as React from "react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (

    <Sidebar className="pt-[100px]" collapsible="icon" {...props}>
      <SidebarHeader>
        {/* put something here */}
      </SidebarHeader>
      <SidebarContent>
        {/* <NavProjects projects={data.projects} /> */}
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense fallback={<div className="w-full p-2 animate-pulse">
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>}>
          <NavUser />
        </React.Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

  )
}
