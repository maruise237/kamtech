'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Quote, TrendingUp, Clock, Zap } from 'lucide-react';
import { useTranslation } from "@/lib/i18n-context"

interface TestimonialProps {
  testimonials?: {
    text: string;
    metric?: string;
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
  testimonials,
  title,
  subtitle,
  autoplaySpeed = 4000,
  className,
}: TestimonialProps) {
  const { t } = useTranslation()

  const kamtechTestimonials = [
    {
      text: t.faq.q1.includes("résultats") || t.faq.q1.includes("results") ? (t.language === "fr" ? "Depuis l'intégration, l'IA répond à 85% de nos requêtes clients sans intervention humaine. Nous avons économisé plus de 15h par semaine." : "Since integration, AI handles 85% of our customer requests without human intervention. We saved over 15h per week.") : "",
      metric: "-15h/semaine",
      imageSrc: 'https://i.pravatar.cc/150?u=1',
      name: 'Jean-Christophe P.',
      username: '@jcp_immo',
      role: t.language === "fr" ? 'Dirigeant Agence Immobilière' : 'Real Estate Agency Manager',
    },
    {
      text: t.language === "fr" ? "Notre taux de conversion sur WhatsApp a bondi de 35% en seulement 2 semaines. L'IA qualifie parfaitement les prospects avant la vente." : "Our WhatsApp conversion rate jumped 35% in just 2 weeks. AI perfectly qualifies leads before the sale.",
      metric: "+35% de conversion",
      imageSrc: 'https://i.pravatar.cc/150?u=2',
      name: 'Sophie L.',
      username: '@sophie_market',
      role: 'CEO E-commerce',
    },
    {
      text: t.language === "fr" ? "L'automatisation nous a permis de traiter 3 fois plus de leads entrants sans embaucher de commercial supplémentaire. C'est magique." : "Automation allowed us to handle 3 times more incoming leads without hiring additional sales staff. It's magic.",
      metric: "x3 Leads traités",
      imageSrc: 'https://i.pravatar.cc/150?u=3',
      name: 'Marc-Antoine G.',
      username: '@mag_conseil',
      role: t.language === "fr" ? 'Consultant Business' : 'Business Consultant',
    },
    {
      text: t.language === "fr" ? "Temps de réponse passé de 4h à 5 secondes. Nos clients sont bluffés par la rapidité et la pertinence des réponses." : "Response time went from 4h to 5 seconds. Our customers are amazed by the speed and relevance of the answers.",
      metric: "Réponse en 5s",
      imageSrc: 'https://i.pravatar.cc/150?u=4',
      name: 'Amélie D.',
      username: '@amelie_tech',
      role: t.language === "fr" ? 'Responsable Opérations' : 'Operations Manager',
    },
    {
      text: t.language === "fr" ? "Kamtech a divisé nos coûts de support par 2 tout en augmentant la satisfaction client. Un investissement rentabilisé en 10 jours." : "Kamtech cut our support costs in half while increasing customer satisfaction. Investment paid off in 10 days.",
      metric: "-50% coûts support",
      imageSrc: 'https://i.pravatar.cc/150?u=5',
      name: 'Thomas R.',
      username: '@tom_startup',
      role: t.language === "fr" ? 'Fondateur SaaS' : 'SaaS Founder',
    },
  ];

  const displayTestimonials = testimonials || kamtechTestimonials;
  const displayTitle = title || t.testimonials.title;
  const displaySubtitle = subtitle || t.testimonials.subtitle;

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

  const allTestimonials = [...displayTestimonials, ...displayTestimonials];

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
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.13em]">{t.testimonials.badge}</p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>
            {displayTitle.split('mesurables').length > 1 ? (
              <>{displayTitle.split('mesurables')[0]} <span className="text-blue-500">mesurables</span></>
            ) : displayTitle.split('Measurable').length > 1 ? (
              <><span className="text-blue-500">Measurable</span> {displayTitle.split('Measurable')[1]}</>
            ) : (
              displayTitle
            )}
          </h2>

          <motion.p
            className="text-gray-300 mx-auto max-w-2xl text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {displaySubtitle}
          </motion.p>
        </motion.div>

        {/* Case Study Highlight */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_40px_rgba(37,99,235,0.15)]"
          >
            <div className="flex-1 space-y-4">
              <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wide">
                {t.testimonials.caseStudyBadge}
              </div>
              <h3 className="text-2xl font-bold text-white">{t.testimonials.caseStudyTitle}</h3>
              <p className="text-[#E2E8F0] text-sm sm:text-base">
                "{t.testimonials.caseStudyQuote}"
              </p>
              <div className="pt-4 flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-blue-500/50">
                  <AvatarImage src="https://i.pravatar.cc/150?u=9" alt="Laurent D. - Directeur d'Agence" />
                  <AvatarFallback>LD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-bold">{t.testimonials.caseStudyAuthor}</p>
                  <p className="text-blue-400 text-sm">{t.testimonials.caseStudyRole}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-black text-white">-60h</p>
                <p className="text-xs text-[#E2E8F0]">{t.testimonials.metric1Label}</p>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-black text-white">+42%</p>
                <p className="text-xs text-[#E2E8F0]">{t.testimonials.metric2Label}</p>
              </div>
            </div>
          </motion.div>
        </div>

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
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="h-8 w-8 text-blue-500/50 -rotate-180" />
                    {testimonial.metric && (
                      <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                        {testimonial.metric}
                      </span>
                    )}
                  </div>

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

        <motion.div
          className="mt-12 sm:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            data-cal-namespace="15min"
            data-cal-link="kamtech/15min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group"
          >
            {t.testimonials.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
