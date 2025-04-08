import { ProjectWithDetails } from "@/lib/types"
import TasksNav from "./TasksNav"
import TopNav from "./TopNav"
import Projectsnav from "./Projects_nav"
import { getUserTasks } from "@/lib/actions/get-tasks"
import { Suspense } from "react"

export async function NavMain({ Projects, message }: { Projects: ProjectWithDetails[] | null, message: string }) {
  const { tasks, status, message: tasksMessage } = await getUserTasks()
  return (
    <>
      {/* Top static nav */}
      <TopNav />

      {/* Projects Section */}
      <Projectsnav Projects={Projects} message={message} />

      {/* Tasks Section */}
      {
        tasks && tasks.length > 0 && (
          <Suspense fallback={<div className="flex items-center gap-3 p-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-muted" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-2 w-16 bg-muted/80 rounded" />
            </div>
          </div>}>
            <TasksNav Tasks={tasks} status={status} message={tasksMessage} />
          </Suspense>
        )

      }
    </>
  )
}


// usertasks: ({
//  
// })[]