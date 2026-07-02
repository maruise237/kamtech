"use client"

import { useCallback } from "react"
import { Button } from "./ui/button"
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react"
import { ParticleTextEffect } from "./particle-text-effect"
import { openWhatsAppChat } from "@/lib/whatsapp"
import { useABTest } from "@/hooks/use-ab-test"
import { AuditForm } from "./audit-form"
import { useTranslation } from "@/lib/i18n-context"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog"

export function HeroSection() {
  const { t, language } = useTranslation()
  const handleExpertClick = useCallback(() => {
    openWhatsAppChat("parlerExpert", language)
  }, [language])

  // A/B Test for Headline (5 variations)
  const headlineVariant = useABTest<"A" | "B" | "C" | "D" | "E">(
    "hero_headline",
    ["A", "B", "C", "D", "E"]
  )

  const headlines = {
    A: t.hero.title,
    B: t.hero.title, // In a real scenario, we would have different translations for each variant
    C: t.hero.title,
    D: t.hero.title,
    E: t.hero.title
  }

  // A/B Test for CTA Button
  const ctaVariant = useABTest<"A" | "B" | "C">(
    "hero_cta",
    ["A", "B", "C"]
  )

  const ctaConfig = {
    A: { text: t.hero.ctaAudit, color: "bg-blue-600 hover:bg-blue-700" },
    B: { text: t.hero.ctaDemo, color: "bg-indigo-600 hover:bg-indigo-700" },
    C: { text: t.hero.ctaDiscover, color: "bg-blue-500 hover:bg-blue-600" }
  }

  return (
    <section className="py-12 sm:py-24 px-4 relative overflow-hidden min-h-[100dvh] flex flex-col justify-between">
      <div className="hidden sm:flex flex-1 items-start justify-center pt-20">
        <ParticleTextEffect words={["KAMTECH", t.language === "fr" ? "IA" : "AI", "CHATBOT", "KAMTECH"]} />
      </div>

      <div className="container mx-auto text-center relative z-10 pt-20 sm:pt-0 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border rounded-full border-blue-500/30 backdrop-blur-md">
            <p className="text-[11px] sm:text-sm font-semibold text-blue-400">{t.hero.badge}</p>
          </div>

	          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance leading-tight tracking-tighter">
            {t.hero.title}
          </h1>
          <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-300 mb-6 sm:mb-8 text-balance">
            <div className="hidden sm:block mb-3">
              <strong>{t.hero.problemLabel}</strong> {t.hero.problemText}
            </div>
            <div className="block mb-2 sm:mb-3">
              <strong>{t.hero.solutionLabel}</strong> {t.hero.solutionText}
            </div>
            <div className="text-blue-400 font-bold text-xs sm:text-base">
              {t.hero.guarantee}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full px-2 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className={`${ctaVariant ? ctaConfig[ctaVariant].color : ctaConfig["A"].color} text-white group text-sm sm:text-base font-semibold w-full sm:w-auto px-8`}
                  >
                    {ctaVariant ? ctaConfig[ctaVariant].text : ctaConfig["A"].text}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none max-w-2xl">
                  <AuditForm />
                </DialogContent>
              </Dialog>

              <Button 
                onClick={handleExpertClick}
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent font-bold w-full sm:w-auto px-8 h-14 rounded-full transition-all hover:-translate-y-1"
              >
                {t.hero.ctaExpert}
              </Button>
            </div>
            
            <p className="text-[#E2E8F0] text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              {t.hero.noCommitment}
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 mb-16 mt-12 text-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold">{t.hero.badge30Days}</p>
                <p className="text-[#E2E8F0] text-xs">{t.hero.badgeSatisfied}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold">{t.hero.badgeDeploy}</p>
                <p className="text-[#E2E8F0] text-xs">{t.hero.badgeTurnkey}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-full">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold">{t.hero.badgeSupport}</p>
                <p className="text-[#E2E8F0] text-xs">{t.hero.badgeDedicated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
