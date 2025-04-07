import { DataTable } from "@/components/tables/ProjectsTable"
import { columns } from "@/components/tables/ProjectsTableColumns"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Suspense } from "react"

const MainProjectsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user?.id) {
        return <div>Please sign in to view projects</div>
    }

    const response = await fetch(`${process.env.BASE_URL}/api/projects/getuserprojects`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': (await headers()).get('cookie') || '',
        },
    })
    if (response.status !== 200) {
        console.error('Error fetching projects:', response.statusText)
        return <div>Error fetching projects</div>
    }

    const projects = await response.json()
    // console.log('resData', projects)

    if (!projects || projects.length === 0) {
        return (
            <div className="mx-auto flex flex-col items-center justify-center p-8 text-gray-500" >
                <svg
                    className="w-24 h-24 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-gray-400">Create a new project to get started</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full h-full p-4 space-y-4 max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold">Projects</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable data={projects} columns={columns} />
            </Suspense>
        </div >
    )
}

export default MainProjectsPage