import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/nav/Header";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/nav/Footer";

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
          {/* <SidebarProvider> */}

          <main className="w-full h-full min-h-screen">
            {children}
          </main>
          {/* Footer */}
          <Toaster toastOptions={
            {
              iconTheme: {
                primary: '#fff',
                secondary: '#072059',
              },
              style: {
                borderRadius: '10px',
                background: '#14014f',
                color: '#fff',
              },
              className: 'bg-primary text-white',
            }
          } />
          {/* </SidebarProvider> */}
          <Footer />
        </ThemeProvider >
      </body>
    </html>
  );
}
