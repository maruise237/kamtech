"use client"

import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedCTASection } from "@/components/animated-cta-section";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import { BentoCard } from "@/components/ui/bento-card";
import { AlertCircle, Clock, CheckCircle, Zap } from "lucide-react";
import { seoPagesData } from "@/lib/seo-data";
import { useTranslation } from "@/lib/i18n-context"

export default function SEOPageClient({ slug }: { slug: string }) {
  const { language } = useTranslation()
  const pageData = seoPagesData.find((p) => p.slug === slug);

  if (!pageData) {
    notFound();
  }

  const title = language === "fr" ? pageData.title : (pageData.titleEn || pageData.title)
  const description = language === "fr" ? pageData.description : (pageData.descriptionEn || pageData.description)
  const h1 = language === "fr" ? pageData.h1 : (pageData.h1En || pageData.h1)

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <main className="pt-20">

        {/* Hero / H1 Section */}
        <section className="py-20 px-4 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              {h1}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 px-4 bg-black">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {language === "fr" ? "Les défis actuels" : "Current Challenges"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {pageData.problem.map((prob, idx) => (
                <BentoCard
                  key={idx}
                  title={language === "fr" ? prob.title : (prob.titleEn || prob.title)}
                  description={language === "fr" ? prob.description : (prob.descriptionEn || prob.description)}
                  icon={idx % 2 === 0 ? <Clock className="size-6" /> : <AlertCircle className="size-6" />}
                  metric={language === "fr" ? prob.metric : (prob.metricEn || prob.metric)}
                  variant="red"
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <span className="text-blue-400 font-semibold uppercase tracking-wider text-sm">{language === "fr" ? "Notre Solution" : "Our Solution"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {language === "fr" ? pageData.solution.title : (pageData.solution.titleEn || pageData.solution.title)}
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              {language === "fr" ? pageData.solution.description : (pageData.solution.descriptionEn || pageData.solution.description)}
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-black">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{language === "fr" ? "Pourquoi nous choisir ?" : "Why Choose Us?"}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageData.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors">
                  <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle className="text-blue-400 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{language === "fr" ? benefit.title : (benefit.titleEn || benefit.title)}</h3>
                  <p className="text-gray-400">{language === "fr" ? benefit.description : (benefit.descriptionEn || benefit.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <TestimonialsCarousel />

        {/* CTA */}
        <AnimatedCTASection />

      </main>
      <Footer />
    </div>
  );
}
