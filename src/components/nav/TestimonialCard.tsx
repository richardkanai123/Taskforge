import Image from "next/image";
import { Testimonial } from "@/lib/Constants";

export function TestimonialCard({ name, role, image, quote }: Testimonial) {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition group">
            <div className="flex items-center mb-4">
                <Image
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform"
                    src={image}
                    alt={name}
                />
                <div className="ml-4">
                    <h4 className="font-semibold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{role}</p>
                </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
                &quot;{quote}&quot;
            </p>
        </div>
    );
}