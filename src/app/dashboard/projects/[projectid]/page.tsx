import { Params } from 'next/dist/server/request/params'
import React from 'react'

const ProjectPage = async ({ params }: { params: Params }) => {
    const { projectid } = await params
    return (
        <div>ProjectPage : {projectid as string}</div>
    )
}

export default ProjectPage