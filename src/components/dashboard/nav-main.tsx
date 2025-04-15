import { ProjectWithDetails } from "@/lib/types"
import TopNav from "./TopNav"
import Projectsnav from "./Projects_nav"

export async function NavMain({ Projects, message }: { Projects: ProjectWithDetails[] | null, message: string }) {
  return (
    <>
      {/* Top static nav */}
      <TopNav />

      {/* Projects Section */}
      <Projectsnav Projects={Projects} message={message} />


    </>
  )
}


// usertasks: ({
//  
// })[]