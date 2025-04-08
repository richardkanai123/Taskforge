import { ProjectWithDetails } from "@/lib/types"
import TasksNav from "./TasksNav"
import TopNav from "./TopNav"
import Projectsnav from "./Projects_nav"

export function NavMain({ Projects, message }: { Projects: ProjectWithDetails[] | null, message: string }) {

  return (
    <>
      {/* Top static nav */}
      <TopNav />

      {/* Projects Section */}
      <Projectsnav Projects={Projects} message={message} />

      {/* Tasks Section */}
      <TasksNav />
    </>
  )
}
