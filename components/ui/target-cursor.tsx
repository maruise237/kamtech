"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

interface TargetCursorProps {
  spinDuration?: number
  hideDefaultCursor?: boolean
  parallaxOn?: boolean
}

export const TargetCursor: React.FC<TargetCursorProps> = ({
  spinDuration = 2,
  hideDefaultCursor = false, // Changed to false to avoid confusing visitors
  parallaxOn = true,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Use springs for smooth inertia
  const springConfig = { damping: 25, stiffness: 250 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (hideDefaultCursor) {
      document.body.style.cursor = "none"
      const style = document.createElement("style")
      style.innerHTML = `* { cursor: none !important; }`
      document.head.appendChild(style)
      return () => {
        document.body.style.cursor = "auto"
        document.head.removeChild(style)
      }
    }
  }, [hideDefaultCursor])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement
      const isTarget = target.closest(".cursor-target") || target.tagName === "BUTTON" || target.tagName === "A"
      setIsHovering(!!isTarget)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute flex items-center justify-center"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {/* Inner Core Dot */}
            <motion.div 
               className="w-1.5 h-1.5 bg-blue-500 rounded-full"
               animate={{ scale: isHovering ? 2 : 1 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Soft Glow Ring */}
            <motion.div
              className="absolute border border-blue-500/40 rounded-full bg-blue-500/5"
              animate={{
                width: isHovering ? 60 : 32,
                height: isHovering ? 60 : 32,
                opacity: isHovering ? 0.8 : 0.4,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />

            {/* Distant Aura (Only visible on hover) */}
            <motion.div
              className="absolute w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
              animate={{
                scale: isHovering ? 1.5 : 0,
                opacity: isHovering ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Interactive Corner Accent (Very subtle) */}
            {isHovering && (
              <motion.div
                className="absolute w-20 h-20 border border-blue-400/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
