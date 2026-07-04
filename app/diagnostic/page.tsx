"use client"

import React, { useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { PointerHighlight } from "@/components/ui/pointer-highlight"
import DiagnosticQuiz from "./DiagnosticQuiz"

export default function DiagnosticLanding() {
  const [started, setStarted] = React.useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (started) return

    const words = document.querySelectorAll<HTMLElement>(".word")
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10)
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards"
      }, delay)
    })

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
  }, [started])

  if (started) return <DiagnosticQuiz />

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-[#F6F2E9] font-sans">
      {/* CSS Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.12) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)",
        }}
      />

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
      <a href="/" className="absolute top-6 left-6 z-20 hover:opacity-80 transition-opacity">
        <span className="font-bold text-sm tracking-widest text-[#9BA1B5] uppercase">
          KAMTECH <span className="text-blue-500">IA</span>
        </span>
      </a>

      {/* Bouton retour */}
      <a href="/" className="absolute top-6 right-6 z-20 flex items-center gap-1.5 text-xs text-[#9BA1B5] hover:text-white transition-colors border border-[rgba(255,255,255,0.08)] rounded-full px-3.5 py-1.5 hover:border-white/20">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Retour
      </a>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-16 md:px-16 md:py-20">
        {/* Top tagline */}
        <div className="text-center">
          <h2 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-[#9BA1B5] md:text-sm">
            <span className="word" data-delay="0">Diagnostic</span>
            <span className="word" data-delay="200">IA</span>
            <span className="word" data-delay="400">gratuit</span>
            <span className="word" data-delay="600">—</span>
            <span className="word" data-delay="800">90</span>
            <span className="word" data-delay="1000">secondes</span>
          </h2>
          <div className="mt-4 h-px w-16 mx-auto"
            style={{
              background: `linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)`,
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "1.2s",
            }}
          />
        </div>

        {/* Main headline */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl text-[#F6F2E9]">
            <div className="flex flex-wrap justify-center gap-x-[0.35em] mb-5 md:mb-7">
              <span className="word" data-delay="1400">Trouvez</span>
              <span className="word" data-delay="1550">la</span>
              <span className="word" data-delay="1700">
                <PointerHighlight rectangleClassName="border-blue-500/60" pointerClassName="text-blue-500">
                  <span className="text-blue-500">solution IA</span>
                </PointerHighlight>
              </span>
              <span className="word" data-delay="1850">qui</span>
              <span className="word" data-delay="2000">correspond</span>
              <span className="word" data-delay="2150">à</span>
              <span className="word" data-delay="2300">votre</span>
              <span className="word" data-delay="2450">business.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.35em] text-3xl leading-[1.15] font-semibold md:text-4xl lg:text-5xl text-[#9BA1B5]">
              <span className="word" data-delay="2700">6</span>
              <span className="word" data-delay="2850">questions,</span>
              <span className="word" data-delay="3000">
                <PointerHighlight rectangleClassName="border-blue-500/60" pointerClassName="text-blue-500" delay={1.8}>
                  <span className="text-blue-500 font-bold">sur mesure</span>
                </PointerHighlight>
              </span>
              <span className="word" data-delay="3150">—</span>
              <span className="word" data-delay="3300">pas</span>
              <span className="word" data-delay="3450">de</span>
              <span className="word" data-delay="3600">générique.</span>
            </div>
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
            style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "4s" }}
          >
            <button
              onClick={() => setStarted(true)}
              className="group inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white border-none rounded-full px-8 py-4 font-bold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] active:translate-y-0"
            >
              Démarrer mon diagnostic
              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setStarted(true)}
              className="group inline-flex items-center justify-center gap-2.5 bg-transparent text-[#9BA1B5] border border-[rgba(255,255,255,0.1)] rounded-full px-8 py-4 font-medium text-base cursor-pointer transition-all duration-200 hover:text-white hover:border-white/30"
            >
              <Sparkles className="w-4 h-4" />
              Voir mon résultat
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
            <span className="word" data-delay="4400">100%</span>
            <span className="word" data-delay="4550">gratuit</span>
            <span className="word" data-delay="4700">·</span>
            <span className="word" data-delay="4850">Sans</span>
            <span className="word" data-delay="5000">engagement</span>
            <span className="word" data-delay="5150">·</span>
            <span className="word" data-delay="5300">Réponse</span>
            <span className="word" data-delay="5450">sous</span>
            <span className="word" data-delay="5600">24h</span>
          </h2>
          <div className="mt-6 flex justify-center space-x-4 opacity-0"
            style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "5.8s" }}
          >
            <div className="w-1 h-1 rounded-full bg-blue-400 opacity-40" />
            <div className="w-1 h-1 rounded-full bg-blue-400 opacity-60" />
            <div className="w-1 h-1 rounded-full bg-blue-400 opacity-40" />
          </div>
        </div>

        {/* SEO Footer links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#9BA1B5] mt-8 opacity-60 hover:opacity-100 transition-opacity" aria-label="Liens internes">
          <a href="/" className="hover:text-white transition-colors">Accueil</a>
          <a href="/#services" className="hover:text-white transition-colors">Services</a>
          <a href="/#why-kamtech" className="hover:text-white transition-colors">Pourquoi KAMTECH</a>
          <a href="/#testimonials" className="hover:text-white transition-colors">Témoignages</a>
          <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="/diagnostic" className="hover:text-white transition-colors">Diagnostic IA</a>
        </nav>
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
