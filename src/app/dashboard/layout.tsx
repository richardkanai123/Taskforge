import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarTrigger variant='outline' className="md:hidden bg-transparent fixed z-10" />
            <AppSidebar />
            <div className="w-full h-full overflow-hidden">
                {children}
            </div>
        </SidebarProvider>
    )
}
