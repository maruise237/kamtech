"use client"

import { useRef, useEffect } from "react"

export function GradientBars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const bars = 40
    const colors = [
      [59, 130, 246],   // blue-500
      [99, 102, 241],   // indigo-500
      [168, 85, 247],   // purple-500
    ]

    const draw = () => {
      time += 0.008
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / bars

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth
        const hue = (i / bars) * 360 + time * 20
        const colorIdx = i % colors.length
        const [r, g, b] = colors[colorIdx]

        // Animated height with sin wave per bar
        const heightFactor = 0.3 + 0.7 * Math.abs(Math.sin(i * 0.3 + time * 2))
        const barHeight = canvas.height * heightFactor
        const y = canvas.height - barHeight

        // Opacity extremely low — barely a whisper
        const opacity = 0.012 + 0.008 * Math.sin(i * 0.5 + time * 1.5)

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        ctx.fillRect(x, y, barWidth - 1, barHeight)
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
