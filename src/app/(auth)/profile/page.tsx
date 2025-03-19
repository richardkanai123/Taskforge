import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { User, LogIn, Mail, AtSign, Calendar, Activity, CheckCircle2, Clock, Star } from "lucide-react"
export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return <div className="w-full h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center space-y-6">
                <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 inline-block">
                    <LogIn className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Authentication Required
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Please sign in to view your profile and manage your account settings.
                    </p>
                </div>
                <Link href="/sign-in">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Sign In
                    </Button>
                </Link>
            </div>
        </div>
    }


    const { user } = session
    return (
        <div className="w-full h-full flex-1 mx-auto py-10">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Header with cover image */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                {/* Profile section */}
                <div className="relative px-6 pb-6">
                    {/* Avatar */}
                    <div className="absolute -top-16 left-6">
                        <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-100">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={session.username || "Profile picture"}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold">
                                    {(session.username ?? "?").toUpperCase().charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {user.name}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AtSign className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {session.username}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <Link href="/profile/edit">
                                <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-3 gap-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-gray-900 dark:text-white">0</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Projects</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-gray-900 dark:text-white">0</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Tasks</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                                    {session.role}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Role</span>
                            </div>
                        </div>

                        {/* Member Since */}
                        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Member since: {new Date(session.createdAt).toLocaleDateString()}</span>
                        </div>

                        {/* Link to dashboard */}
                        <div className="mt-6">
                            <Link href="/dashboard">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>



            <div className="mt-6 mx-auto border-t border-gray-200 dark:border-gray-700 pt-6 px-4 md:max-w-[75%]">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Activity Overview
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 space-y-2">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 space-y-2">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 space-y-2">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Contributions</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 space-y-2">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Achievements</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mx-auto mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                </h2>
                <div className="space-y-4">
                    {[
                        { type: 'completed', task: 'Homepage Redesign', time: '2 hours ago' },
                        { type: 'started', task: 'API Integration', time: '1 day ago' },
                        { type: 'comment', task: 'User Authentication', time: '2 days ago' },
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                            <div className={`p-2 rounded-full ${activity.type === 'completed'
                                ? 'bg-green-100 dark:bg-green-900'
                                : activity.type === 'started'
                                    ? 'bg-blue-100 dark:bg-blue-900'
                                    : 'bg-gray-100 dark:bg-gray-900'
                                }`}>
                                {activity.type === 'completed'
                                    ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    : activity.type === 'started'
                                        ? <Clock className="w-4 h-4 text-blue-500" />
                                        : <Activity className="w-4 h-4 text-gray-500" />
                                }
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {activity.type === 'completed' && 'Completed task: '}
                                    {activity.type === 'started' && 'Started working on: '}
                                    {activity.type === 'comment' && 'Commented on: '}
                                    <span className="font-normal text-gray-600 dark:text-gray-400">
                                        {activity.task}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
