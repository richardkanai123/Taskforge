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
                                viewBox="0 0 300 200"
                                className="h-8 w-8"
                            >
                                <rect width="300" height="200" fill="currentColor" fillOpacity={0.1} rx="10" ry="10" />
                                <polygon points="130,140 170,140 190,160 110,160" className="fill-gray-700 dark:fill-gray-300" />
                                <path
                                    d="M120,90 L180,90 C190,90 195,100 195,110 L195,130 C195,135 190,140 185,140 L115,140 C110,140 105,135 105,130 L105,110 C105,100 110,90 120,90 Z"
                                    className="fill-gray-600 dark:fill-gray-400"
                                />
                                <rect
                                    x="145"
                                    y="50"
                                    width="10"
                                    height="50"
                                    className="fill-primary"
                                    transform="rotate(-15, 150, 50)"
                                />
                                <rect
                                    x="135"
                                    y="45"
                                    width="30"
                                    height="15"
                                    rx="2"
                                    ry="2"
                                    className="fill-primary-600 dark:fill-primary-400"
                                    transform="rotate(-15, 150, 50)"
                                />
                                <path
                                    d="M135,110 L145,125 L165,95"
                                    className="stroke-green-500 dark:stroke-green-400"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
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