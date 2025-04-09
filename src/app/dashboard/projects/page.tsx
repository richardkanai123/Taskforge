import ProjectsFolderView from "@/components/dashboard/ProjectsFolderView";
import ProjectsViewTab from "@/components/dashboard/ProjectsViewTab";
import { DataTable } from "@/components/tables/ProjectsTable";
import { columns } from "@/components/tables/ProjectsTableColumns";
import { getUserProjects } from "@/lib/actions/get-projects";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";

const MainProjectsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const { view } = await searchParams;

    console.log(view);
    const { projects, message } = await getUserProjects();

    if (!projects || projects.length === 0) {
        return (
            <div className="mx-auto flex flex-col items-center justify-center p-8 text-gray-500">
                <svg
                    className="w-24 h-24 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-gray-400">{message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full p-4 space-y-4 max-w-screen-xl mx-auto">
            <div className="p-2 mx-auto w-full flex align-middle  justify-around">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <p className="text-gray-500">Manage your projects here</p>
                </div>

                <div className="self-end ml-auto">
                    <ProjectsViewTab view={view as string} />
                </div>
            </div>
            {view === "table" ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <DataTable
                        data={projects.map((p) => ({ ...p, progress: p.progress ?? 0 }))}
                        columns={columns}
                    />
                </Suspense>
            ) : (
                <Suspense fallback={<div>Loading...</div>}>
                    <ProjectsFolderView projects={projects} />
                </Suspense>
            )}
        </div>
    );
};

export default MainProjectsPage;
