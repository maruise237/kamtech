"use client"

import { useState } from "react"
import DiagnosticQuiz from "./DiagnosticQuiz"

export default function DiagnosticPage() {
  const [started, setStarted] = useState(false)

  if (started) return <DiagnosticQuiz />

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-[#F6F2E9] font-sans flex flex-col items-center justify-center px-6 py-16">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)",
        }}
      />
      <div className="fixed left-1/2 bottom-0 w-[140vw] h-[70vh] pointer-events-none -z-10"
        style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.1), rgba(59,130,246,0.03) 45%, transparent 70%)", transform: "translateX(-50%)" }}
      />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Logo + back */}
      <div className="absolute top-6 left-6 z-20">
        <a href="/" className="font-bold text-sm tracking-widest text-[#9BA1B5] uppercase hover:text-white transition-colors">
          KAMTECH <span className="text-blue-500">IA</span>
        </a>
      </div>
      <a href="/" className="absolute top-6 right-6 z-20 flex items-center gap-1.5 text-xs text-[#9BA1B5] hover:text-white transition-colors border border-[rgba(255,255,255,0.08)] rounded-full px-3.5 py-1.5 hover:border-white/20">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        Retour
      </a>

      {/* Hero */}
      <div className="max-w-2xl text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-semibold tracking-[0.09em] uppercase px-3 py-1.5 rounded-full mb-5">
          🎯 Diagnostic IA Gratuit
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
          Quelle solution IA correspond à <span className="text-blue-500">votre business</span> ?
        </h1>
        <p className="text-base text-[#9BA1B5] leading-relaxed mb-8 max-w-lg mx-auto">
          6 questions — moins de 90 secondes — recommandation personnalisée selon votre situation réelle. Pas de conseil générique.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
          {["100% gratuit", "Sans engagement", "Résultat immédiat", "Sur mesure"].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-sm text-[#9BA1B5]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {item}
            </div>
          ))}
        </div>
        <button
          onClick={() => setStarted(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-4 font-bold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] active:translate-y-0 inline-flex items-center gap-2.5"
        >
          Démarrer mon diagnostic →
        </button>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-center text-[11px] text-[#71717a] leading-relaxed">
        KAMTECH IA · Yaoundé &amp; Douala, Cameroun
      </p>
    </div>
  )
}
