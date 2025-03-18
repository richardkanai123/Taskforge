'use client'
import Link from "next/link"
import { ModeToggle } from "./mode-toggler"
import LoginBtn from "../Buttons/Login"


export function Header() {
    return (
        <header className=" w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex flex-col items-center space-x-2 hover:opacity-80 transition-opacity">
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
                        <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            TaskForge
                        </span>
                    </Link>
                </div>
                <div className="flex ml-auto items-center justify-between space-x-2 md:justify-end">
                    <div className="relative flex items-center space-x-4">
                        <ModeToggle />
                        <LoginBtn />
                    </div>
                </div>
            </div>
        </header>
    )
}