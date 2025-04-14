// given a project and user id, grant permission to view, edit, or delete the project

// permissions are: isOwner, isLead, isMember, isCustomer

import { Project } from "@prisma/client";
import { prisma } from "../Prisma";
export const projectsPermission = async (Project:Project, userId: string) => {
    
  const isOwener = Project.creatorId === userId;
  const isLead = Project.leadId === userId;
    const isCustomer = Project.customerId === userId;

    // get user projects and check if the user is a member of the project
    const userProjects = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            memberProjects: {
                select: {
                    id: true
                }
            }
        }
    })

    const isMember = userProjects?.memberProjects.some((project) => project.id === Project.id) || false;

    const permissions = {
        isOwner: isOwener,
        isLead: isLead,
        isMember: isMember,
        isCustomer: isCustomer
    }

    return permissions
}

