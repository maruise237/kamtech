"use client"

import { motion } from "framer-motion"
import { Lightbulb, MessageCircle, Globe, HeartHandshake } from "lucide-react"

const gridColor = "#3b82f611"

const reasons = [
  {
    icon: <Lightbulb className="size-6 text-blue-400" />,
    title: "Sur mesure, toujours",
    desc: "Chaque solution est construite pour vous. On ne part jamais d'un template générique.",
  },
  {
    icon: <MessageCircle className="size-6 text-blue-400" />,
    title: "On parle business d'abord",
    desc: "On commence par comprendre votre marché, vos clients et vos blocages — avant d'écrire la première ligne de code.",
  },
  {
    icon: <Globe className="size-6 text-blue-400" />,
    title: "100% à distance, partout",
    desc: "On travaille avec des PME partout dans le monde, en français et en anglais.",
  },
  {
    icon: <HeartHandshake className="size-6 text-blue-400" />,
    title: "Partenaire long terme",
    desc: "On reste après le déploiement. Suivi, ajustements, évolutions — on grandit avec vous.",
  },
]

export default function WhyKamtechSection() {
  return (
    <section id="why-kamtech" className="py-16 sm:py-24 px-4 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.13em]">Pourquoi nous choisir</p>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pourquoi les PME choisissent KAMTECH IA
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Pas parce qu&apos;on vend un produit. Parce qu&apos;on s&apos;investit dans votre croissance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black px-6 pt-6 pb-10 shadow-lg transition-all duration-500 hover:border-blue-500/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Grid Pattern (BentoCard signature) */}
              <div 
                className="absolute top-0 -right-1/2 z-0 size-full [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`
                }}
              />

              {/* Decorative icon (agrandi en bas à droite) */}
              <div className="absolute right-1 bottom-3 scale-[6] text-blue-500/5 transition-all duration-700 group-hover:text-blue-500/10">
                {reason.icon}
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10 transition-all duration-500 group-hover:bg-blue-500/20">
                  {reason.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{reason.desc}</p>
              </div>

              {/* Bottom glow bar (signature BentoCard) */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400 blur-2xl transition-all duration-500 group-hover:blur-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
