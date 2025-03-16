import HomepageCTA from "@/components/Buttons/HomepageCTA";
import Image from "next/image";

export default function Home() {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-white to-gray-100`}>
      {/* Hero Section */}
      <div className="text-center px-6 py-12">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-relaxed">
          Task Forge
        </h1>
        <p className="text-2xl mt-4 text-gray-600 max-w-2xl mx-auto">
          Streamline your workflow and boost team productivity with our powerful task management solution.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <HomepageCTA />
          <button className="bg-white text-gray-600 dark:text-gray-400 px-8 py-3 rounded-lg hover:bg-gray-100 dark:bg-gray-800 transition w-fit">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-bold text-2xl mb-4 dark:text-white">Smart Features</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Task Prioritization
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Team Assignment
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Smart Filtering
            </li>
          </ul>
        </div>


        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-2xl mb-4 dark:text-white">Boost Productivity</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              30% Time Savings
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Team Collaboration
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Real-time Updates
              Real-time Updates
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-2xl mb-4 dark:text-white">Get Started Now</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Set up in minutes. No credit card required. Start managing your tasks more efficiently today.
          </p>
          <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Start Free Trial
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition mt-8">
        <h3 className="font-bold text-2xl mb-4 dark:text-white">What Our Users Say</h3>
        <div className="flex items-center mb-4">
          <Image width={48} height={48} className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User 1" />
          <div className="ml-4">
            <h4 className="font-semibold dark:text-white">John Doe</h4>
            <p className="text-gray-600 dark:text-gray-400">Software Engineer</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          &quot;TaskForge has been a game-changer for me. It&apos;s so easy to keep track of my tasks and deadlines. I highly recommend it!&quot;      </p>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-white to-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition mt-12">
        <h3 className="font-bold text-2xl mb-4 dark:text-white">Get Started Today</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sign up for a free account and start managing your projects more efficiently today.
        </p>
        <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>






  );
}
