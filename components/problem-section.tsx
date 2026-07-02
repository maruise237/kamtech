"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, TrendingDown, Users, CheckCircle2, XCircle, ArrowRight, Zap } from 'lucide-react';
import { BentoCard } from '@/components/ui/bento-card';
import { useTranslation } from "@/lib/i18n-context"

export function ProblemSection() {
  const { t } = useTranslation()
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-black relative overflow-hidden">
        {/* Subtle Background Glow (Red) */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-red-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">{t.problem.badge}</p>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>
            {t.problem.title.split('cost you').length > 1 ? (
              <>{t.problem.title.split('cost you')[0]} <span className="text-red-500">cost you</span> {t.problem.title.split('cost you')[1]}</>
            ) : t.problem.title.split('coûte cher').length > 1 ? (
              <>{t.problem.title.split('coûte cher')[0]} <span className="text-red-500">coûte cher</span></>
            ) : (
              t.problem.title
            )}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#E2E8F0] max-w-2xl mx-auto">
            {t.problem.subtitle}
          </p>
        </div>

        {/* Before / After Visual */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-950/20 border border-red-500/20 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-white">{t.problem.traditionalTitle}</h3>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                  <Clock className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{t.problem.traditionalItem1Title}</p>
                  <p className="text-[#E2E8F0] text-sm">{t.problem.traditionalItem1Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{t.problem.traditionalItem2Title}</p>
                  <p className="text-[#E2E8F0] text-sm">{t.problem.traditionalItem2Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{t.problem.traditionalItem3Title}</p>
                  <p className="text-[#E2E8F0] text-sm">{t.problem.traditionalItem3Desc}</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-8 h-8 text-blue-500" />
              <h3 className="text-2xl font-bold text-white">{t.problem.kamtechTitle}</h3>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{t.problem.kamtechItem1Title}</p>
                  <p className="text-[#E2E8F0] text-sm">{t.problem.kamtechItem1Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{t.problem.kamtechItem2Title}</p>
                  <p className="text-[#E2E8F0] text-sm">{t.problem.kamtechItem2Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{t.problem.kamtechItem3Title}</p>
                  <p className="text-[#E2E8F0] text-sm">{t.problem.kamtechItem3Desc}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Footer Link (Solution focus) */}
        <motion.div
          className="text-center mt-12 sm:mt-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            {t.problem.solutionBadge}
          </div>
          <p className="text-white/80 text-lg sm:text-xl font-medium max-w-xl">
            {t.problem.solutionText}
          </p>
          <button
            data-cal-namespace="15min"
            data-cal-link="kamtech/15min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-blue-500/25"
          >
            {t.problem.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
