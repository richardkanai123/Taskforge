interface TaskHeaderProps {
    title: string
    createdAt: Date
    dueDate?: Date
    priority: string
}

export const TaskHeader = ({ title, createdAt, dueDate, priority }: TaskHeaderProps) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="flex gap-4 text-sm text-gray-600">
                <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
                {dueDate && <span>Due: {new Date(dueDate).toLocaleDateString()}</span>}
                <div className="flex">
                    <span className="mr-2">Priority:</span>
                    <span>
                        {priority === "L1" && <span className="p-2 rounded-full h-8 aspect-square font-bold bg-red-500">L1</span>}
                        {priority === "L2" && <span className="p-2 rounded-full h-8 aspect-square font-bold bg-orange-500">L2</span>}
                        {priority === "L3" && <span className="p-2 rounded-full h-8 aspect-square font-bold bg-yellow-500">L3</span>}
                        {priority === "L4" && <span className="p-2 rounded-full h-8 aspect-square font-bold bg-green-500">L4</span>}
                        {priority === "L5" && <span className="p-2 rounded-full h-8 aspect-square font-bold bg-blue-500">L5</span>}
                    </span>
                </div>
            </div>
        </div>
    )
}
