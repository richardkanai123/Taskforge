import { ReactNode } from 'react';

export interface FeatureProps {
    title: string;
    description?: string;
    icon: ReactNode;
    items: string[];
    color: {
        light: string;
        dark: string;
        text: string;
        darkText: string;
    };
    footer?: {
        text: string;
        bgClass: string;
        textClass: string;
    };
}

export default function FeatureCard({
    title,
    description,
    icon,
    items,
    color,
    footer
}: FeatureProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition group">
            <div className={`h-12 w-12 ${color.light} dark:${color.dark} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className={`font-bold text-2xl mb-4 dark:text-white group-hover:${color.text} dark:group-hover:${color.darkText} transition-colors`}>
                {title}
            </h3>
            {description && (
                <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
            )}
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                    </li>
                ))}
            </ul>
            {footer && (
                <div className={`mt-4 p-4 ${footer.bgClass} rounded-lg`}>
                    <p className={`text-sm ${footer.textClass}`}>
                        {footer.text}
                    </p>
                </div>
            )}
        </div>
    );
}