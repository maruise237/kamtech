"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Code, FileText, Layers, TrendingUp, Zap, MessageSquare, Bot, Check, X } from 'lucide-react';
import { BentoCard } from '@/components/ui/bento-card';
import { useTranslation } from "@/lib/i18n-context"

export function AnimatedFeaturesSection() {
  const { t } = useTranslation()
  const items = [
    {
      title: t.features.item1Title,
      description: t.features.item1Desc,
      icon: <MessageSquare className="size-6" />,
      size: 'large' as const,
    },
    {
      title: t.features.item2Title,
      description: t.features.item2Desc,
      icon: <Bot className="size-6" />,
      size: 'small' as const,
    },
    {
      title: t.features.item3Title,
      description: t.features.item3Desc,
      icon: <Code className="size-6" />,
      size: 'medium' as const,
    },
    {
      title: t.features.item4Title,
      description: t.features.item4Desc,
      icon: <TrendingUp className="size-6" />,
      size: 'medium' as const,
    },
    {
      title: t.features.item5Title,
      description: t.features.item5Desc,
      icon: <Zap className="size-6" />,
      size: 'small' as const,
    },
    {
      title: t.features.item6Title,
      description: t.features.item6Desc,
      icon: <Layers className="size-6" />,
      size: 'large' as const,
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
    <section id="features" className="py-16 sm:py-24 px-4 bg-black relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            {t.features.title.split('automated').length > 1 ? (
              <>{t.features.title.split('automated')[0]} <span className="text-blue-500">automated</span></>
            ) : t.features.title.split('automatisée').length > 1 ? (
              <>{t.features.title.split('automatisée')[0]} <span className="text-blue-500">automatisée</span></>
            ) : (
              t.features.title
            )}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#E2E8F0] max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, i) => (
            <BentoCard
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
              variant="blue"
              className={cn(
                item.size === 'large'
                  ? 'md:col-span-4'
                  : item.size === 'medium'
                    ? 'md:col-span-3'
                    : 'md:col-span-2',
                'h-full',
              )}
            />
          ))}
        </motion.div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">{t.features.comparisonTitle}</h3>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-3 border-b border-gray-800 bg-black/50 p-4 sm:p-6">
              <div className="col-span-1 text-[#E2E8F0] font-semibold text-sm sm:text-base">{t.features.feature}</div>
              <div className="col-span-1 text-center text-[#E2E8F0] font-semibold text-sm sm:text-base">{t.features.human}</div>
              <div className="col-span-1 text-center text-blue-400 font-bold text-sm sm:text-base">{t.features.kamtech}</div>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-800/50 p-4 sm:p-6 hover:bg-gray-800/30 transition-colors">
              <div className="col-span-1 text-white text-sm sm:text-base">{t.features.availability}</div>
              <div className="col-span-1 flex justify-center items-center text-[#E2E8F0] text-sm">{t.features.availabilityHuman}</div>
              <div className="col-span-1 flex justify-center items-center text-white font-semibold text-sm"><span className="text-green-400 mr-2">✓</span> {t.features.availabilityKamtech}</div>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-800/50 p-4 sm:p-6 hover:bg-gray-800/30 transition-colors">
              <div className="col-span-1 text-white text-sm sm:text-base">{t.features.responseTime}</div>
              <div className="col-span-1 flex justify-center items-center text-[#E2E8F0] text-sm">{t.features.responseTimeHuman}</div>
              <div className="col-span-1 flex justify-center items-center text-white font-semibold text-sm"><span className="text-green-400 mr-2">✓</span> {t.features.responseTimeKamtech}</div>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-800/50 p-4 sm:p-6 hover:bg-gray-800/30 transition-colors">
              <div className="col-span-1 text-white text-sm sm:text-base">{t.features.simultaneous}</div>
              <div className="col-span-1 flex justify-center items-center text-[#E2E8F0] text-sm">{t.features.simultaneousHuman}</div>
              <div className="col-span-1 flex justify-center items-center text-white font-semibold text-sm"><span className="text-green-400 mr-2">✓</span> {t.features.simultaneousKamtech}</div>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-800/50 p-4 sm:p-6 hover:bg-gray-800/30 transition-colors">
              <div className="col-span-1 text-white text-sm sm:text-base">{t.features.errors}</div>
              <div className="col-span-1 flex justify-center items-center text-red-400 text-sm"><X className="w-4 h-4 mr-1" /> {t.features.errorsHuman}</div>
              <div className="col-span-1 flex justify-center items-center text-white font-semibold text-sm"><span className="text-green-400 mr-2">✓</span> {t.features.errorsKamtech}</div>
            </div>

            <div className="grid grid-cols-3 p-4 sm:p-6 hover:bg-gray-800/30 transition-colors">
              <div className="col-span-1 text-white text-sm sm:text-base">{t.features.monthlyCost}</div>
              <div className="col-span-1 flex justify-center items-center text-[#E2E8F0] text-sm">{t.features.monthlyCostHuman}</div>
              <div className="col-span-1 flex justify-center items-center text-blue-400 font-bold text-sm">{t.features.monthlyCostKamtech}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
