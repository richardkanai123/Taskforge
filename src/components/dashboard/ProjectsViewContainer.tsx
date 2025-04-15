'use client';

import { DataTable } from "@/components/tables/ProjectsTable";
import { columns } from "@/components/tables/ProjectsTableColumns";
import ProjectsFolderView from "./ProjectsFolderView";
import { ProjectWithDetails } from "@/lib/types";

type ProjectsViewContainerProps = {
    view: string;
    projects: ProjectWithDetails[] | null;
}

export default function ProjectsViewContainer({ projects, view }: ProjectsViewContainerProps) {

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
                <p className="text-gray-400">Create a project to get started.</p>
            </div>
        )
    }

    return (
        <>
            {view === "table" ? (
                <DataTable
                    data={projects.map((p) => ({ ...p, progress: p.progress ?? 0 }))}
                    columns={columns}
                />
            ) : (
                <ProjectsFolderView projects={projects} />
            )}
        </>
    );
}
