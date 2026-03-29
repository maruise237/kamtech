'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const kamtechTestimonials = [
  {
    text: "Kamtech IA a radicalement transformé notre gestion client. On gagne 20h par semaine sur WhatsApp tout en convertissant plus.",
    imageSrc: 'https://i.pravatar.cc/150?u=1',
    name: 'Jean-Christophe P.',
    username: '@jcp_immo',
    role: 'Dirigeant Agence Immobilière',
  },
  {
    text: "Choquée par la fluidité de l'IA dès le premier jour. Elle répond aux questions complexes et prend les RDV toute seule.",
    imageSrc: 'https://i.pravatar.cc/150?u=2',
    name: 'Sophie L.',
    username: '@sophie_market',
    role: 'CEO E-commerce',
  },
  {
    text: "On a lancé notre automatisation en 48h. Déjà 12 leads qualifiés en une semaine. L'audit gratuit était très précis.",
    imageSrc: 'https://i.pravatar.cc/150?u=3',
    name: 'Marc-Antoine G.',
    username: '@mag_conseil',
    role: 'Consultant Business',
  },
  {
    text: "Plus besoin de répondre aux mêmes questions 50 fois par jour. L'IA gère le support 24/7 et on se concentre sur la vente.",
    imageSrc: 'https://i.pravatar.cc/150?u=4',
    name: 'Amélie D.',
    username: '@amelie_tech',
    role: 'Responsable Opérations',
  },
  {
    text: "Régler mes problèmes de scalabilité sans recruter était mon défi. Kamtech l'a résolu en 7 jours avec une automatisation parfaite.",
    imageSrc: 'https://i.pravatar.cc/150?u=5',
    name: 'Thomas R.',
    username: '@tom_startup',
    role: 'Fondateur SaaS',
  },
  {
    text: "Le dashboard analytics nous permet de voir exactement le ROI de chaque conversation. C'est l'outil le plus rentable de l'année.",
    imageSrc: 'https://i.pravatar.cc/150?u=6',
    name: 'Karine M.',
    username: '@karine_growth',
    role: 'Directrice Marketing',
  },
];

interface TestimonialProps {
  testimonials?: {
    text: string;
    imageSrc: string;
    name: string;
    username: string;
    role?: string;
  }[];
  title?: string;
  subtitle?: string;
  autoplaySpeed?: number;
  className?: string;
}

export default function TestimonialsCarousel({
  testimonials = kamtechTestimonials,
  title = "Ce que disent nos clients",
  subtitle = "De l'automatisation WhatsApp à l'IA conversationnelle, ils ont trouvé le moteur de croissance qu'il leur manquait.",
  autoplaySpeed = 4000,
  className,
}: TestimonialProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplaySpeed);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi, autoplaySpeed]);

  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className={cn('relative overflow-hidden py-16 sm:py-24 bg-black', className)}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="bg-blue-600/5 absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-[120px]" />
        <div className="bg-blue-600/10 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-12 text-center md:mb-16"
        >
          <div className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Témoignages</p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            {title}
          </h2>

          <motion.p
            className="text-gray-300 mx-auto max-w-2xl text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-gray-800 bg-gray-900/50 relative h-full w-full rounded-2xl border p-6 shadow-xl backdrop-blur-md flex flex-col group hover:border-blue-500/30 transition-all duration-300"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-blue-400 mb-6"
                  >
                    <Quote className="h-8 w-8 -rotate-180 opacity-50" />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-gray-300 relative mb-8 text-sm sm:text-base leading-relaxed flex-grow italic"
                  >
                    "{testimonial.text}"
                  </motion.p>

                  {/* User info with animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-gray-800/60 mt-auto flex items-center gap-3 border-t pt-4"
                  >
                    <Avatar className="h-10 w-10 border border-gray-700 ring-blue-500/20 ring-2 ring-offset-1 ring-offset-black">
                      <AvatarImage
                        src={testimonial.imageSrc}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-blue-600 text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-400/80 text-xs truncate">
                        {testimonial.role || testimonial.username}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
