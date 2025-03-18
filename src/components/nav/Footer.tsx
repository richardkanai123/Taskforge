import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 py-8 mt-auto">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2">
                        <div className="flex items-center space-x-2">
                            {/* Logo */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="font-bold text-gray-900 dark:text-white">TaskForge</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                            &copy; {new Date().getFullYear()} Task Forge. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                        <div className="space-y-4">
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">Legal</p>
                            <nav className="flex flex-col space-y-2">
                                <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition">
                                    Privacy Policy
                                </a>
                                <a href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition">
                                    Terms of Service
                                </a>
                            </nav>
                        </div>

                        <div className="space-y-4">
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">Company</p>
                            <nav className="flex flex-col space-y-2">
                                <a href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition">
                                    About Us
                                </a>
                                <a href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition">
                                    Contact
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer