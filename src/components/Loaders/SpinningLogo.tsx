'use client'

import { cn } from "@/lib/utils"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`

const progress = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`

const StyledSvg = styled.svg`
  .spinner {
    transform-origin: center;
    animation: ${rotate} 2s linear infinite;
  }
  
  .pulse {
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
  
  .progress {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: ${progress} 3s linear infinite;
  }
`

interface LoadingLogoProps {
    className?: string
    size?: number
}

export function LoadingLogo({ className, size = 300 }: LoadingLogoProps) {
    return (
        <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 200"
            className={cn("w-full h-full", className)}
            width={size}
            height={(size / 3) * 2}
        >
            {/* Background circle */}
            <circle
                cx="150"
                cy="100"
                r="70"
                className="fill-gray-100 dark:fill-gray-800"
            />

            {/* Outer spinning ring */}
            <circle
                cx="150"
                cy="100"
                r="70"
                fill="none"
                className="stroke-gray-700 dark:stroke-gray-300 spinner"
                strokeWidth="6"
            />

            {/* Inner spinner elements */}
            <g className="spinner">
                {/* Anvil shape */}
                <path
                    d="M120,90 L180,90 C190,90 195,100 195,110 L195,130 C195,135 190,140 185,140 L115,140 C110,140 105,135 105,130 L105,110 C105,100 110,90 120,90 Z"
                    className="fill-gray-600 dark:fill-gray-400 pulse"
                />

                {/* Hammer */}
                <rect
                    x="145"
                    y="50"
                    width="10"
                    height="45"
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
            </g>

            {/* Progress checkmark */}
            <path
                d="M135,110 L145,125 L165,95"
                className="stroke-green-500 dark:stroke-green-400 progress"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Text */}
            <text
                x="150"
                y="185"
                className="text-lg font-bold fill-gray-700 dark:fill-gray-300"
                textAnchor="middle"
            >
                Loading...
            </text>
        </StyledSvg>
    )
}