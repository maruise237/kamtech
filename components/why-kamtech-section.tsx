"use client"

import { motion } from "framer-motion"
import { Lightbulb, MessageCircle, Globe, HeartHandshake } from "lucide-react"

const reasons = [
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-400" />,
    title: "Sur mesure, toujours",
    desc: "Chaque solution est construite pour vous. On ne part jamais d'un template générique.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-blue-400" />,
    title: "On parle business d'abord",
    desc: "On commence par comprendre votre marché, vos clients et vos blocages — avant d'écrire la première ligne de code.",
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    title: "100% à distance, partout",
    desc: "On travaille avec des PME partout dans le monde, en français et en anglais.",
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-blue-400" />,
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
              className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-blue-500/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 shrink-0">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
