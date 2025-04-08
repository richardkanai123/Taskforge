import { Params } from 'next/dist/server/request/params'
import React from 'react'

const ProjectPage = async ({ params }: { params: Params }) => {
    const { taskid } = await params
    return (
        <div>Task : {taskid as string}</div>
    )
}

export default ProjectPage