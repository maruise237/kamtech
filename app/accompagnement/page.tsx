"use client"

import React, { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles } from "lucide-react"
import { PointerHighlight } from "@/components/ui/pointer-highlight"
import { GradientBars } from "@/components/ui/gradient-bars"

const colors = {
  black: "#0a0a0a",
  surface: "#111111",
  surface2: "#1a1a1a",
  line: "rgba(255,255,255,0.06)",
  blue: "#3b82f6",
  blueSoft: "rgba(59,130,246,0.12)",
  ink: "#F6F2E9",
  inkMuted: "#9BA1B5",
  green: "#3FA796",
}

export default function AccompagnementLanding() {
  const router = useRouter()
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate words
    const words = document.querySelectorAll<HTMLElement>(".word")
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10)
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards"
      }, delay)
    })

    // Mouse gradient
    const gradient = gradientRef.current
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px"
        gradient.style.top = e.clientY - 192 + "px"
        gradient.style.opacity = "1"
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0"
    }
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-black to-[#111111] text-[#F6F2E9] font-sans">
      {/* Gradient Bars background — ultra subtle */}
      <GradientBars />

      {/* SVG Background Grid */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="funnel-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#funnel-grid)" />
        <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
        <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
        <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" style={{ animationDelay: "2.5s", opacity: 0.04 }} />
        <line x1="0" y1="50%" x2="100%" y2="50%" className="grid-line" style={{ animationDelay: "3s", opacity: 0.04 }} />
        <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
        <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3.2s" }} />
        <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.4s" }} />
        <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.6s" }} />
        <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: "4s" }} />
      </svg>

      {/* Ambient glow blobs */}
      <div className="fixed left-1/2 bottom-0 w-[140vw] h-[70vh] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(closest-side, rgba(59,130,246,0.1), rgba(59,130,246,0.03) 45%, transparent 70%)",
          transform: "translateX(-50%)",
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Corner dots */}
      <div className="absolute top-8 left-8 w-2 h-2 opacity-30 bg-blue-400 rounded-full" style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "4s" }} />
      <div className="absolute top-8 right-8 w-2 h-2 opacity-30 bg-blue-400 rounded-full" style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "4.2s" }} />
      <div className="absolute bottom-8 left-8 w-2 h-2 opacity-30 bg-blue-400 rounded-full" style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "4.4s" }} />
      <div className="absolute bottom-8 right-8 w-2 h-2 opacity-30 bg-blue-400 rounded-full" style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "4.6s" }} />

      {/* KAMTECH logo top left */}
      <div className="absolute top-6 left-6 z-20">
        <span className="font-bold text-sm tracking-widest text-[#9BA1B5] uppercase">
          KAMTECH <span className="text-blue-500">IA</span>
        </span>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-16 md:px-16 md:py-20">
        {/* Top tagline */}
        <div className="text-center">
          <h2 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-[#9BA1B5] md:text-sm">
            <span className="word" data-delay="0">Diagnostic</span>
            <span className="word" data-delay="200">gratuit</span>
            <span className="word" data-delay="400">—</span>
            <span className="word" data-delay="600">2</span>
            <span className="word" data-delay="800">minutes</span>
          </h2>
          <div className="mt-4 h-px w-16 mx-auto"
            style={{
              background: `linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)`,
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "1s",
            }}
          />
        </div>

        {/* Main headline */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl text-[#F6F2E9]">
            <div className="flex flex-wrap justify-center gap-x-[0.35em] mb-5 md:mb-7">
              <span className="word" data-delay="1200">Arrête</span>
              <span className="word" data-delay="1350">de</span>
              <span className="word" data-delay="1500">
                <PointerHighlight rectangleClassName="border-blue-500/60" pointerClassName="text-blue-500">
                  <span className="text-blue-500">collectionner</span>
                </PointerHighlight>
              </span>
              <span className="word" data-delay="1650">les</span>
              <span className="word" data-delay="1800">tutos</span>
              <span className="word" data-delay="1950">IA.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.35em] text-3xl leading-[1.15] font-semibold md:text-4xl lg:text-5xl text-[#9BA1B5]">
              <span className="word" data-delay="2200">Commence</span>
              <span className="word" data-delay="2350">à</span>
              <span className="word" data-delay="2500">
                <PointerHighlight rectangleClassName="border-blue-500/60" pointerClassName="text-blue-500" delay={1.5}>
                  <span className="text-blue-500 font-bold">produire</span>
                </PointerHighlight>
              </span>
              <span className="word" data-delay="2650">avec</span>
              <span className="word" data-delay="2800">un</span>
              <span className="word" data-delay="2950">plan</span>
              <span className="word" data-delay="3100">sur</span>
              <span className="word" data-delay="3250">mesure.</span>
            </div>
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
            style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "3.5s" }}
          >
            <button
              onClick={() => router.push("/accompagnement/quiz")}
              className="group inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white border-none rounded-full px-8 py-4 font-bold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] active:translate-y-0"
            >
              Faire mon diagnostic gratuit
              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => router.push("/accompagnement/quiz")}
              className="group inline-flex items-center justify-center gap-2.5 bg-transparent text-[#9BA1B5] border border-[rgba(255,255,255,0.1)] rounded-full px-8 py-4 font-medium text-base cursor-pointer transition-all duration-200 hover:text-white hover:border-white/30"
            >
              <Sparkles className="w-4 h-4" />
              Voir les offres
            </button>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center">
          <div className="mb-4 h-px w-16 mx-auto"
            style={{
              background: `linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)`,
            }}
          />
          <h2 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-[#9BA1B5] md:text-sm">
            <span className="word" data-delay="4000">Sans</span>
            <span className="word" data-delay="4150">engagement.</span>
            <span className="word" data-delay="4300">Sans</span>
            <span className="word" data-delay="4450">carte</span>
            <span className="word" data-delay="4600">bancaire.</span>
          </h2>
          <div className="mt-6 flex justify-center space-x-4 opacity-0"
            style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "4.8s" }}
          >
            <div className="w-1 h-1 rounded-full bg-blue-400 opacity-40" />
            <div className="w-1 h-1 rounded-full bg-blue-400 opacity-60" />
            <div className="w-1 h-1 rounded-full bg-blue-400 opacity-40" />
          </div>
        </div>
      </div>

      {/* Mouse gradient */}
      <div
        ref={gradientRef}
        className="pointer-events-none fixed h-96 w-96 rounded-full opacity-0 blur-3xl transition-all duration-500 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}
