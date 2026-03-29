"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Code, FileText, Layers, TrendingUp, Zap, MessageSquare, Bot } from 'lucide-react';

import { BentoCard } from '@/components/ui/bento-card';

const items = [
  {
    title: 'Chatbot WhatsApp IA 24/7',
    description: 'Répondez à vos prospects instantanément, même pendant que vous dormez. Ne perdez plus jamais un seul lead.',
    icon: <MessageSquare className="size-6" />,
    size: 'large' as const,
  },
  {
    title: 'Qualification Auto',
    description: 'Triez vos leads automatiquement selon votre budget et vos critères de réussite.',
    icon: <Bot className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Automatisations n8n',
    description: 'Connectez WhatsApp à votre CRM, Email et outils de gestion sans aucun effort technique.',
    icon: <Code className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'ROI Garanti',
    description: 'Optimisation hebdomadaire de vos systèmes pour maximiser chaque centime investi.',
    icon: <TrendingUp className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Déploiement en 7j',
    description: 'Passez de l\'idée aux résultats en une semaine montre en main. Pas de délai IT.',
    icon: <Zap className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Support & Stratégie',
    description: 'Une équipe d\'experts dédiée à l\'évolution permanente de vos automatisations IA.',
    icon: <Layers className="size-6" />,
    size: 'large' as const,
  },
];

export function AnimatedFeaturesSection() {
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
            Votre infrastructure de croissance <span className="text-blue-500">automatisée</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Nous construisons des systèmes intelligents qui qualifient, engagent et convertissent vos prospects sans intervention humaine.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
      </div>
    </section>
  );
}
