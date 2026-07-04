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
      {/* Highlight fill — expands from left to right, FOLLOWING the cursor */}
      <motion.span
        animate={{
          width: ["0%", "0%", "100%", "100%", "0%"],
          opacity: [0, 0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          delay,
          times: [0, 0.05, 0.5, 0.8, 1],
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="absolute inset-y-1 left-0 bg-blue-500/20 rounded-lg pointer-events-none"
        style={{ transformOrigin: "left center" }}
      />

      {/* Border — draws behind the cursor trail */}
      <motion.span
        animate={{
          clipPath: [
            "polygon(0 0, 0 0, 0 100%, 0 100%)",
            "polygon(0 0, 0 0, 0 100%, 0 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          ],
          opacity: [0, 0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          delay: delay + 0.05,
          times: [0, 0.05, 0.5, 0.8, 1],
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className={cn(
          "absolute inset-0 rounded-lg border-[3px] border-blue-500/80 pointer-events-none",
          rectangleClassName,
        )}
      />

      {/* Big blue cursor that drags across the text */}
      <motion.span
        animate={{
          // Start off-screen left, move to start, drag to end, release
          left: ["-24px", "-4px", "calc(100% - 12px)", "calc(100% - 12px)", "-24px"],
          top: ["-8px", "-8px", "-8px", "8px", "-8px"],
          opacity: [0, 1, 1, 1, 0],
          rotate: [0, 0, 6, 6, 0],
        }}
        transition={{
          duration: 4,
          delay,
          times: [0, 0.08, 0.5, 0.75, 1],
          ease: [0.25, 0.1, 0.25, 1],
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className={cn(
          "absolute top-0 text-blue-500 pointer-events-none drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)] z-20",
          pointerClassName,
        )}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          {/* Outer glow */}
          <path
            d="M4.5 2.5L4.5 21.5L9.5 16L14.5 22L16 21.5L11 15.5L19 15.5L4.5 2.5Z"
            fill="rgba(59,130,246,0.3)"
            stroke="none"
            transform="translate(0.5, 0.5)"
          />
          {/* Cursor body */}
          <path
            d="M4.5 2.5L4.5 21.5L9.5 16L14.5 22L16 21.5L11 15.5L19 15.5L4.5 2.5Z"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Inner blue accent */}
          <path
            d="M7 5.5L7 18L10.5 14L13.5 18.5L14 18L11 13.5L16 13.5L7 5.5Z"
            fill="#3b82f6"
            opacity="0.6"
          />
        </svg>
      </motion.span>

      {/* Click ripple at end of selection */}
      <motion.span
        animate={{
          scale: [0, 0, 2.5, 0],
          opacity: [0, 0, 0.4, 0],
        }}
        transition={{
          duration: 1.5,
          delay: delay + 1.8,
          times: [0, 0.4, 0.7, 1],
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 5.5,
        }}
        className="absolute top-1/2 right-2 w-5 h-5 bg-blue-500/30 rounded-full pointer-events-none"
        style={{ transform: "translate(0, -50%)" }}
      />

      {/* Hover glow */}
      <motion.span
        className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/20 pointer-events-none transition-colors duration-300"
      />

      <span className={cn("relative z-10", className)}>{children}</span>
    </motion.span>
  )
}
