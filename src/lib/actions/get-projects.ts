
import { headers } from "next/headers"

const ProjectsApiUrl = `${process.env.BASE_URL}/api/projects`

export async function getUserProjects(){
 try {
    const headersList = headers()
    const token = (await headersList).get('authorization')
    
    const response = await fetch('http://localhost:3000/api/projects/getuserprojects', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token || ''
        },
    })
     console.log('response', response.status)
     
    if (!response.ok) {
        throw new Error('Failed to fetch projects')
    }
    
     const detailedProjects = await response.json()

     console.log('detailedProjects', detailedProjects)
     return detailedProjects
     
 } catch (error) {
     if(error instanceof Error) {
         console.error('Error fetching projects:', error.message)
         return {error: error.message, success: false}
     }
     
     console.error('Error fetching projects:', error)
        return {error: 'Unknown error', success: false}
 }
}




export async function getProjectById(id: string) {
  const headersList = headers()
  const token = (await headersList).get('authorization')

  const response = await fetch(`${ProjectsApiUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token || ''
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch project')
  }

  return response.json()
}