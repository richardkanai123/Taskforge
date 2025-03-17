import Link from "next/link"
import { ModeToggle } from "./mode-toggler"
import LoginBtn from "../Buttons/Login"
import { Hammer } from "lucide-react"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <Hammer className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            TaskForge
                        </span>
                    </Link>
                </div>
                <div className="flex ml-auto items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-4">
                        <ModeToggle />
                        <LoginBtn />
                    </nav>
                </div>
            </div>
        </header>
    )
}