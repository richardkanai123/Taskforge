import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CreateProjectBtn = () => {
    return (
        <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            size="lg"
        >
            <Link className='flex align-middle justify-center items-center text-center' href="/dashboard/projects/create-new">
                <span> Add New Project</span>
                <Plus className="h-full" />
            </Link>
        </Button>
    )
}

export default CreateProjectBtn