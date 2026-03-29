"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, TrendingDown, Users } from 'lucide-react';
import { BentoCard } from '@/components/ui/bento-card';

export function ProblemSection() {
  const problems = [
    {
      icon: <Clock className="size-6" />,
      title: "20 heures perdues par semaine",
      description: "Votre équipe répond manuellement aux mêmes questions, remplit les formulaires, relance les prospects. C'est du travail qui peut être automatisé.",
      metric: "Gaspillage de temps",
      size: 'large'
    },
    {
      icon: <AlertCircle className="size-6" />,
      title: "Réponses lentes",
      description: "Un prospect non répondu en 5 min à 10 fois moins de chances de convertir.",
      metric: "Ventes perdues",
      size: 'small'
    },
    {
      icon: <TrendingDown className="size-6" />,
      title: "Croissance plafonnée",
      description: "Impossible de scaler sans recruter massivement. Le coût humain bloque votre expansion.",
      metric: "ROI stagné",
      size: 'small'
    },
    {
      icon: <Users className="size-6" />,
      title: "Dépendance humaine",
      description: "Si votre équipe est occupée ou absente, la prise de prospect s'arrête. Votre business ne dort jamais, mais votre système actuel si.",
      metric: "Risque opérationnel",
      size: 'large'
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
    <section className="py-16 sm:py-24 px-4 bg-black relative overflow-hidden">
        {/* Subtle Background Glow (Red) */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-red-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Le challenge du statu quo</p>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Chaque minute d'attente vous <span className="text-red-500">coûte cher</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Sans un système automatisé, votre croissance est limitée par le temps humain. Voici la réalité des entreprises non automatisées.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {problems.map((problem, i) => (
            <BentoCard
              key={i}
              title={problem.title}
              description={problem.description}
              icon={problem.icon}
              metric={problem.metric}
              variant="red"
              className={cn(
                problem.size === 'large'
                  ? 'md:col-span-4'
                  : 'md:col-span-2',
                'h-full',
              )}
            />
          ))}
        </motion.div>
        
        {/* Footer Link (Solution focus) */}
        <motion.div
          className="text-center mt-12 sm:mt-16 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-base sm:text-lg">
            La bonne nouvelle ? Tout cela peut se régler en <span className="text-blue-500 font-bold">7 jours</span> avec Kamtech IA.
          </p>
          <button
            data-cal-namespace="15min"
            data-cal-link="kamtech/15min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-blue-500/25"
          >
            Obtenir mon audit gratuit
          </button>
        </motion.div>
      </div>
    </section>
  );
}
