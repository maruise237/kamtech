"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "@/lib/i18n-context"

export function FAQSection() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
    { question: t.faq.q8, answer: t.faq.a8 },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 bg-black relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.13em]">{t.faq.badge}</p>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t.faq.title}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-4 sm:px-6 py-4 text-left flex items-start sm:items-center justify-between hover:bg-white/5 transition-colors gap-4"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-sm sm:text-base md:text-lg font-medium text-white">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#E2E8F0] transition-transform flex-shrink-0 mt-1 sm:mt-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-6 pb-4 border-t border-border/10">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
