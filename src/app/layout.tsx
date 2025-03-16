import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/nav/Header";
import { ThemeProvider } from "@/lib/theme-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Forge - Project Management Made Simple",
  description: "Task Forge is a modern project management tool that helps teams collaborate, track tasks, and deliver projects efficiently.",
  keywords: "project management, task tracking, team collaboration, productivity tools",
  authors: [{ name: "Task Forge Team" }],
  creator: "Task Forge",
  publisher: "Task Forge",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <Header />
          {children}
          {/* Footer */}
          <footer className="w-full bg-gray-100 dark:bg-gray-900 py-8">
            <div className="container flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                &copy; 2022 Task Forge. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                  Terms of Service
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
