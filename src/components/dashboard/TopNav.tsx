"use client";
import React from "react";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { Calendar, LayoutDashboardIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const TopNav = () => {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip={"Dashboard"} asChild>
                        <Link
                            href="/dashboard"
                            className={`w-full flex items-center gap-2 ${pathname === "/dashboard" ? "text-primary" : ""
                                }`}>
                            <LayoutDashboardIcon className="h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton tooltip={"Calendar"} asChild>
                        <Link
                            href="/dashboard/calendar"
                            className={`w-full flex items-center gap-2 ${pathname === "/dashboard/calendar" ? "text-primary" : ""
                                }`}>
                            <Calendar className="h-4 w-4" />
                            <span>Calendar</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default TopNav;
