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
    <span className={cn("relative inline-flex items-center group", containerClassName)}>
      {/* Animated border rectangle */}
      <motion.span
        initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ transformOrigin: "center center" }}
        className={cn(
          "absolute inset-0 rounded-lg border border-blue-500/50 pointer-events-none",
          rectangleClassName,
        )}
      />

      {/* Pointer arrow at top-right corner */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: delay + 0.3,
          ease: "easeOut",
        }}
        className={cn(
          "absolute -top-2 -right-2 text-blue-500 pointer-events-none",
          pointerClassName,
        )}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10" />
          <path d="M17 7L7 17" />
        </svg>
      </motion.span>

      <span className={cn("relative z-10", className)}>{children}</span>
    </span>
  )
}
