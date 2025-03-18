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
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-relaxed">
          Task Forge
        </h1>
        <p className="text-2xl mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Streamline your workflow and boost team productivity with our powerful task management solution.
        </p>
        <div className="mt-8 flex gap-4 justify-center items-center">
          <div className="w-32"> {/* Fixed width container */}
            <HomepageCTA />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="w-32" // Match width with CTA button
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
