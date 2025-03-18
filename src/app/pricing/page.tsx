import React from 'react'
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for individuals and small teams getting started",
        features: [
            "Up to 5 team members",
            "Basic task management",
            "2 active projects",
            "Basic reporting",
            "Community support",
        ],
        cta: "Get Started",
        href: "/sign-up",
        highlighted: false
    },
    {
        name: "Pro",
        price: "12",
        description: "Ideal for growing teams and businesses",
        features: [
            "Unlimited team members",
            "Advanced task management",
            "Unlimited projects",
            "Advanced analytics",
            "Priority support",
            "Custom workflows",
            "Team collaboration tools",
            "API access"
        ],
        cta: "Start Free Trial",
        href: "/sign-up?plan=pro",
        highlighted: true
    },
    {
        name: "Enterprise",
        price: "49",
        description: "For large organizations with complex needs",
        features: [
            "Everything in Pro",
            "Custom integrations",
            "Dedicated support",
            "SAML SSO",
            "Advanced security",
            "Custom contracts",
            "SLA guarantees",
            "Dedicated success manager"
        ],
        cta: "Contact Sales",
        href: "/contact",
        highlighted: false
    }
];
const PricingPage = () => {
    return (
        <div className="min-h-screen py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="text-center px-6 mb-16">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Simple, Transparent Pricing
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Choose the perfect plan for your team&apos;s needs
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl border bg-white dark:bg-gray-800 p-8 shadow-sm transition-all hover:shadow-lg ${plan.highlighted
                                ? 'border-blue-600 dark:border-blue-500 scale-105'
                                : 'border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {plan.name}
                                </h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        ${plan.price}
                                    </span>
                                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                                        /month per user
                                    </span>
                                </div>
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="mb-8 space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-3" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                asChild
                                className="w-full"
                                variant={plan.highlighted ? "default" : "outline"}
                            >
                                <Link href={plan.href}>
                                    {plan.cta}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-20 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Have more questions?{" "}
                        <Link
                            href="/contact"
                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Contact our team
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PricingPage