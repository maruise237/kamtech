"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle2, Search, Settings, GraduationCap, TrendingUp, HeartHandshake } from 'lucide-react';
import { BentoCard } from '@/components/ui/bento-card';
import { useTranslation } from "@/lib/i18n-context"

export function ProcessSection() {
  const { t } = useTranslation()
  const steps = [
    {
      icon: <Search className="size-6" />,
      title: t.process.step1Title,
      description: t.process.step1Desc,
      metric: t.process.step1Metric,
      size: 'medium'
    },
    {
      icon: <Settings className="size-6" />,
      title: t.process.step2Title,
      description: t.process.step2Desc,
      metric: t.process.step2Metric,
      size: 'medium'
    },
    {
      icon: <GraduationCap className="size-6" />,
      title: t.process.step3Title,
      description: t.process.step3Desc,
      metric: t.process.step3Metric,
      size: 'medium'
    },
    {
      icon: <TrendingUp className="size-6" />,
      title: t.process.step4Title,
      description: t.process.step4Desc,
      metric: t.process.step4Metric,
      size: 'medium'
    },
    {
      icon: <HeartHandshake className="size-6" />,
      title: t.process.step5Title,
      description: t.process.step5Desc,
      metric: t.process.step5Metric,
      size: 'medium'
    },
  ];

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
    <section id="process" className="py-16 sm:py-24 px-4 bg-black relative overflow-hidden">
        {/* Subtle Background Glow (Green) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-green-400 text-xs font-semibold uppercase tracking-[0.13em]">{t.process.badge}</p>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>
            {t.process.title.split('complete').length > 1 ? (
              <>{t.process.title.split('complete')[0]} <span className="text-green-500">complete</span></>
            ) : t.process.title.split('complète').length > 1 ? (
              <>{t.process.title.split('complète')[0]} <span className="text-green-500">complète</span></>
            ) : (
              t.process.title
            )}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t.process.subtitle}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, i) => (
            <BentoCard
              key={i}
              title={step.title}
              description={step.description}
              icon={step.icon}
              metric={step.metric}
              variant="green"
              className="md:col-span-3"
            />
          ))}
        </motion.div>
        
        <motion.div
          className="mt-16 p-5 sm:p-8 rounded-2xl border border-green-500/10 bg-green-500/5 backdrop-blur-sm text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-green-400 font-semibold mb-2">{t.process.footerTitle}</p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {t.process.footerDesc}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
