"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PointerHighlightProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  rectangleClassName?: string
  pointerClassName?: string
  delay?: number
}

export function PointerHighlight({
  children,
  className,
  containerClassName,
  rectangleClassName,
  pointerClassName,
  delay = 0.5,
}: PointerHighlightProps) {
  return (
    <motion.span
      className={cn("relative inline-flex items-center mx-1 group cursor-pointer", containerClassName)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Highlight fill that follows the cursor */}
      <motion.span
        animate={{
          width: ["0%", "100%", "100%", "0%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3.5,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2.5,
        }}
        className="absolute inset-y-0 left-0 bg-blue-500/15 rounded-lg pointer-events-none"
        style={{ transformOrigin: "left center" }}
      />

      {/* Animated border that draws — follows cursor trail */}
      <motion.span
        animate={{
          clipPath: [
            "polygon(0 0, 0 0, 0 100%, 0 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          ],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3.5,
          delay: delay + 0.1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2.5,
        }}
        className={cn(
          "absolute inset-0 rounded-lg border-2 border-blue-500/70 pointer-events-none",
          rectangleClassName,
        )}
      />

      {/* Realistic mouse cursor that DRAGS across the text */}
      <motion.span
        animate={{
          // Move from left edge → right edge, with slight vertical dip (like real dragging)
          x: ["-40%", "105%", "105%", "-40%"],
          y: ["-60%", "-40%", "-40%", "-60%"],
          opacity: [0, 1, 1, 0],
          rotate: [0, 8, 8, 0],
        }}
        transition={{
          duration: 3.5,
          delay,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          repeatDelay: 2.5,
        }}
        className={cn(
          "absolute top-1/2 left-0 text-blue-500 pointer-events-none drop-shadow-lg z-20",
          pointerClassName,
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          {/* Cursor body */}
          <path
            d="M3.5 2L3.5 15.5L7 11.5L10.5 16L11.5 15.5L8 11L14 11L3.5 2Z"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Cursor inner accent */}
          <path
            d="M5 4L5 13L7.5 10L10 13.5L10.5 13L8 9.5L12 9.5L5 4Z"
            fill="#3b82f6"
            opacity="0.5"
          />
        </svg>
      </motion.span>

      {/* Click ripple effect */}
      <motion.span
        animate={{
          scale: [0, 2, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 1.2,
          delay: delay + 0.8,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 4.8,
        }}
        className="absolute top-1/2 left-0 w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />

      {/* Hover glow */}
      <motion.span
        className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/20 pointer-events-none transition-colors duration-300"
      />

      <span className={cn("relative z-10", className)}>{children}</span>
    </motion.span>
  )
}
