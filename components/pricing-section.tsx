"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Calculator, ShieldCheck } from "lucide-react"
import { useTranslation } from "@/lib/i18n-context"

export function PricingSection() {
  const { t, language } = useTranslation()
  const [hoursSaved, setHoursSaved] = useState(20)
  const hourlyRate = 35 // Estimation du taux horaire moyen (ex: 35€/h)
  const monthlySavings = hoursSaved * hourlyRate * 4

  return (
    <section id="pricing" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.13em]">{t.pricing.badge}</p>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t.pricing.title.split('rapporte').length > 1 ? (
              <>{t.pricing.title.split('rapporte')[0]} <span className="text-blue-500">rapporte</span></>
            ) : t.pricing.title.split('pays off').length > 1 ? (
              <>{t.pricing.title.split('pays off')[0]} <span className="text-blue-500">pays off</span></>
            ) : (
              t.pricing.title
            )}
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.pricing.subtitle}
          </motion.p>
        </div>

        {/* ROI Calculator */}
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Calculator className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{t.pricing.roiTitle}</h3>
                <p className="text-gray-400 text-sm">{t.pricing.roiSubtitle}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-white font-medium">{t.pricing.roiLabel}</label>
                  <span className="text-2xl font-black text-blue-400">{hoursSaved}h</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={hoursSaved}
                  aria-label="Heures passées à répondre"
                  onChange={(e) => setHoursSaved(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5h</span>
                  <span>80h+</span>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t.pricing.savingsLabel}</p>
                  <p className="text-3xl sm:text-4xl font-black text-green-400">{monthlySavings.toLocaleString(language === "fr" ? 'fr-FR' : 'en-US')} €</p>
                  <p className="text-gray-500 text-xs mt-2">{t.pricing.savingsFootnote}</p>
                </div>

                <div className="text-center sm:text-right">
                  <p className="text-white font-bold mb-2">{t.pricing.roiFooter}</p>
                  <Button
                    data-cal-namespace="15min"
                    data-cal-link="kamtech/15min"
                    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                    className="bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  >
                    {t.pricing.cta}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
