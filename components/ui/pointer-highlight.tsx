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
    <span className={cn("relative inline-flex items-center mx-1", containerClassName)}>
      {/* Highlight background fill */}
      <motion.span
        initial={{ width: "0%", opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay,
          ease: "easeOut",
        }}
        className="absolute inset-0 bg-blue-500/10 rounded-lg pointer-events-none"
        style={{ transformOrigin: "left center" }}
      />

      {/* Animated border that draws from top-left to bottom-right */}
      <motion.span
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: delay + 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          "absolute inset-0 rounded-lg border-2 border-blue-500/70 pointer-events-none",
          rectangleClassName,
        )}
      />

      {/* Mouse pointer cursor that follows the border draw */}
      <motion.span
        initial={{ opacity: 0, x: -8, y: -8 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.35,
          delay: delay + 0.4,
          ease: "easeOut",
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

      <span className={cn("relative z-10", className)}>{children}</span>
    </span>
  )
}
