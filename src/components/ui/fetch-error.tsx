import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface FetchErrorProps {
    message: string
    status?: number | string
}

export function FetchError({ message, status }: FetchErrorProps) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error {status && `(${status})`}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
