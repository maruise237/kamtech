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
      {/* Highlight background fill — loops continuously */}
      <motion.span
        animate={{
          width: ["0%", "100%", "100%", "0%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute inset-0 bg-blue-500/10 rounded-lg pointer-events-none"
        style={{ transformOrigin: "left center" }}
      />

      {/* Animated border that draws around text — loops */}
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
          duration: 3,
          delay: delay + 0.15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className={cn(
          "absolute inset-0 rounded-lg border-2 border-blue-500/70 pointer-events-none",
          rectangleClassName,
        )}
      />

      {/* Mouse pointer cursor — appears then fades in loop */}
      <motion.span
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.8],
          x: [0, 4, 4, 0],
          y: [0, -4, -4, 0],
        }}
        transition={{
          duration: 3,
          delay: delay + 0.4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className={cn(
          "absolute -top-3 -right-3 text-blue-500 pointer-events-none drop-shadow-lg",
          pointerClassName,
        )}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5 2.5C5 2.5 4.5 2 4.5 2.5V18.5C4.5 19 5 19.5 5.5 19.5H10.5L12.5 23L13 23.5L13.5 23L17 19H19C19.5 19 20 18.5 20 18V16.5C20 16 19.5 15.5 19 15.5H15.5L12.5 11L12 10.5L11.5 11L8.5 15.5H5.5V2.5Z" />
        </svg>
      </motion.span>

      {/* Hover glow effect */}
      <motion.span
        className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/20 pointer-events-none transition-colors duration-300"
      />

      <span className={cn("relative z-10", className)}>{children}</span>
    </motion.span>
  )
}
