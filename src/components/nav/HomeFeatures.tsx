import FeatureCard, { FeatureProps } from "./FeatureCard";

const features: FeatureProps[] = [
    {
        title: "Smart Features",
        icon: (
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        items: ["Task Prioritization", "Team Assignment", "Smart Filtering"],
        color: {
            light: "bg-blue-100",
            dark: "bg-blue-900",
            text: "text-blue-600",
            darkText: "text-blue-400"
        }
    },
    {
        title: "Boost Productivity",
        icon: (
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        items: ["30% Time Savings", "Team Collaboration", "Real-time Updates"],
        color: {
            light: "bg-purple-100",
            dark: "bg-purple-900",
            text: "text-purple-600",
            darkText: "text-purple-400"
        }
    },
    {
        title: "Analytics & Insights",
        icon: (
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        items: ["Performance Tracking", "Custom Reports", "Data Visualization"],
        color: {
            light: "bg-indigo-100",
            dark: "bg-indigo-900",
            text: "text-indigo-600",
            darkText: "text-indigo-400"
        }
    },
    {
        title: "Smart Automation",
        icon: (
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        items: ["Workflow Automation", "Smart Reminders", "Auto-assignments"],
        color: {
            light: "bg-amber-100",
            dark: "bg-amber-900",
            text: "text-amber-600",
            darkText: "text-amber-400"
        }
    },
    {
        title: "Client Management",
        icon: (
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
        ),
        items: ["Client Portals", "Project Billing", "Progress Updates"],
        color: {
            light: "bg-emerald-100",
            dark: "bg-emerald-900",
            text: "text-emerald-600",
            darkText: "text-emerald-400"
        },
        footer: {
            text: "Perfect for agencies and freelancers managing client projects",
            bgClass: "bg-emerald-50 dark:bg-emerald-900/20",
            textClass: "text-emerald-700 dark:text-emerald-400"
        }
    }
]


export default function HomeFeaturesList() {
    return (
        <div className="w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    {...feature}
                />
            ))}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition group">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="font-bold text-2xl mb-4 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Get Started Now</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Set up in minutes. No credit card required. Start managing your tasks more efficiently today.
                </p>
                <a
                    href="/sign-in"
                    className="block w-fit bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition group-hover:scale-[1.02] transform"
                >
                    Get Started
                </a>
            </div>
        </div>
    )
}

