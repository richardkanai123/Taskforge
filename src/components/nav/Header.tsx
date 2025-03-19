'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggler"
import LoginBtn from "../Buttons/Login"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const navigationItems = [
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
]

export function Header() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link
                        href="/"
                        className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity"
                        aria-label="TaskForge Home"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 300 200"
                            className="h-8 w-8"
                            aria-hidden="true"
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
                        <span className="hidden font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent sm:inline-block">
                            TaskForge
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetContent side="left" className="pr-0">
                        <MobileNav pathname={pathname} items={navigationItems} />
                    </SheetContent>
                </Sheet>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors hover:text-foreground/80 ${pathname === item.href
                                ? "text-foreground"
                                : "text-foreground/60"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <ModeToggle />
                        <LoginBtn />
                    </nav>
                </div>
            </div>
        </header>
    )
}

function MobileNav({
    pathname,
    items
}: {
    pathname: string
    items: { name: string; href: string }[]
}) {
    return (
        <nav className="grid gap-4 p-4">
            <SheetTrigger asChild>

                <Link
                    href={'/'}
                    className={`
                        flex md:hidden items-center justify-between p-4
                        rounded-lg border-2 bg-card text-card-foreground shadow-sm
                        transition-all duration-200 ease-in-out
                        hover:bg-accent hover:text-accent-foreground
                        focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2
                        ${pathname === '/'
                            ? "border-primary"
                            : "border-border hover:border-primary"
                        }
                    `}
                >
                    <span className="text-sm font-medium">Home</span>
                    <span className="text-sm text-muted-foreground">
                        →
                    </span>
                </Link>
            </SheetTrigger>
            {items.map((item) => (
                <SheetTrigger key={item.href} asChild>

                    <Link

                        href={item.href}
                        className={`
                        flex items-center justify-between p-4
                        rounded-lg border-2 bg-card text-card-foreground shadow-sm
                        transition-all duration-200 ease-in-out
                        hover:bg-accent hover:text-accent-foreground
                        focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2
                        ${pathname === item.href
                                ? "border-primary"
                                : "border-border hover:border-primary"
                            }
                    `}
                    >
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                            →
                        </span>
                    </Link>
                </SheetTrigger>
            ))}
        </nav>
    )
}