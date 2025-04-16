'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="text-center">
                <div className="w-64 h-64 mx-auto mb-8">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-indigo-600">
                        <path
                            fill="currentColor"
                            d="M13 13h-2V7h2v6zm0 4h-2v-2h2v2zm-1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                        />
                    </svg>
                </div>
                <h1 className="text-6xl font-bold text-gray-900 dark:text-yellow-200 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
                <div className="space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                    >
                        Go Back
                    </button>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-md"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
