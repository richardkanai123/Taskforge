import HomepageCTA from "@/components/Buttons/HomepageCTA";
import HomeFeaturesList from "@/components/nav/HomeFeatures";
import { TestimonialCard } from "@/components/nav/TestimonialCard";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/Constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-white to-gray-100`}>
      {/* Hero Section */}
      <div className="text-center px-6 py-12">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
          Transform Your Workflow
        </h1>
        <p className="text-2xl mt-6 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Forge your team&apos;s success with powerful task management, real-time collaboration, and intelligent automation.
        </p>
        <div className="mt-8 flex gap-4 justify-center items-center">
          <div className="w-32">
            <HomepageCTA />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="w-32"
          >
            <Link href='/sign-in'> Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <HomeFeaturesList />

      {/* Testimonials */}
      <div className="w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-8">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="ml-2 text-gray-600 dark:text-gray-400">No credit card required</span>
        </div>
      </div>


      {/* Stats Section */}
      <div className="w-full bg-white dark:bg-gray-700/80 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">99.9%</div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">50%</div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Time Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing CTA */}
      <div className="w-full max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Start Building Better Projects Today</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of teams who&apos;ve already transformed their workflow with TaskForge.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="min-w-[200px]">
            <Link href="/sign-up">Get Started For Free</Link>
          </Button>
          <Button variant="outline" size="lg" className="min-w-[200px]">
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
