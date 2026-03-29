"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  metric?: string;
  variant?: 'blue' | 'red' | 'green' | 'purple';
  showArrow?: boolean;
}

const colorVariants = {
  blue: {
    border: 'hover:border-blue-500/30',
    iconBg: 'bg-blue-500/10 text-blue-400 shadow-blue-500/10 group-hover:bg-blue-500/20',
    iconSmall: 'text-blue-500/5 group-hover:text-blue-500/10',
    gridColor: '#3b82f611',
    glow: 'from-blue-600 to-blue-400',
    metricBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    arrow: 'text-blue-400'
  },
  red: {
    border: 'hover:border-red-500/30',
    iconBg: 'bg-red-500/10 text-red-400 shadow-red-500/10 group-hover:bg-red-500/20',
    iconSmall: 'text-red-500/5 group-hover:text-red-500/10',
    gridColor: '#ef444411',
    glow: 'from-red-600 to-red-400',
    metricBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    arrow: 'text-red-400'
  },
  green: {
    border: 'hover:border-green-500/30',
    iconBg: 'bg-green-500/10 text-green-400 shadow-green-500/10 group-hover:bg-green-500/20',
    iconSmall: 'text-green-500/5 group-hover:text-green-500/10',
    gridColor: '#10b98111',
    glow: 'from-green-600 to-green-400',
    metricBg: 'bg-green-500/10 text-green-400 border-green-500/20',
    arrow: 'text-green-400'
  },
  purple: {
    border: 'hover:border-purple-500/30',
    iconBg: 'bg-purple-500/10 text-purple-400 shadow-purple-500/10 group-hover:bg-purple-500/20',
    iconSmall: 'text-purple-500/5 group-hover:text-purple-500/10',
    gridColor: '#a855f711',
    glow: 'from-purple-600 to-purple-400',
    metricBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    arrow: 'text-purple-400'
  }
};

export const BentoCard = ({
  title,
  description,
  icon,
  className,
  metric,
  variant = 'blue',
  showArrow = false,
}: BentoCardProps) => {
  const v = colorVariants[variant];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group border-white/10 bg-black hover:border-blue-500/30 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border px-6 pt-6 pb-10 shadow-lg transition-all duration-500',
        v.border,
        className,
      )}
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${v.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${v.gridColor} 1px, transparent 1px)`
        }}
      ></div>

      {/* Decorative Icon Background */}
      <div className={cn("absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]", v.iconSmall)}>
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500", v.iconBg)}>
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        
        {metric && (
          <div className="mt-6">
            <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-bold border", v.metricBg)}>
              {metric}
            </span>
          </div>
        )}

        {showArrow && (
           <div className={cn("mt-4 flex items-center text-sm font-medium", v.arrow)}>
             <span className="mr-1 text-gray-400">En savoir plus</span>
             <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
           </div>
        )}
      </div>
      
      {/* Glow Bottom Bar */}
      <div className={cn("absolute bottom-0 left-0 h-1 w-full blur-2xl transition-all duration-500 group-hover:blur-lg bg-gradient-to-r", v.glow)} />
    </motion.div>
  );
};
