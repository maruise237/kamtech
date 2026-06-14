"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SegmentHero } from "@/components/segments/segment-hero"
import { ObjectionHandling } from "@/components/segments/objection-handling"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { useTranslation } from "@/lib/i18n-context"

export default function ServicesSegmentClient() {
  const { language } = useTranslation()

  const beforeData = {
    title: language === "fr" ? "Trop de temps au support" : "Too much time on support",
    description: language === "fr"
      ? "Vous passez des heures chaque jour à répondre aux mêmes questions par mail ou par téléphone. \"Quels sont vos prix ?\", \"Où êtes-vous situé ?\", \"Quels sont vos délais ?\""
      : "You spend hours every day answering the same questions by email or phone. \"What are your prices?\", \"Where are you located?\", \"What are your lead times?\"",
  }

  const bridgeData = {
    title: language === "fr" ? "Chatbot répond FAQs 24/7" : "Chatbot answers FAQs 24/7",
    description: language === "fr"
      ? "L'IA Kamtech analyse votre documentation, vos tarifs, vos processus. Elle répond aux clients de manière claire, concise et professionnelle, jour et nuit."
      : "Kamtech AI analyzes your documentation, your rates, your processes. It answers customers clearly, concisely, and professionally, day and night.",
  }

  const afterData = {
    title: language === "fr" ? "Gagnez 10h/semaine" : "Save 10h/week",
    description: language === "fr"
      ? "Vous récupérez votre temps. Vos clients obtiennent des réponses instantanées. Vous pouvez vous consacrer aux tâches à forte valeur ajoutée ou développer votre activité."
      : "You get your time back. Your customers get instant answers. You can focus on high-value tasks or grow your business.",
  }

  const servicesObjections = [
    {
      question: language === "fr" ? "Mes prix sont sur devis ou très variables selon le client." : "My prices are on quote or very variable depending on the client.",
      answer: language === "fr"
        ? "Parfait. Nous apprenons à l'IA vos critères de qualification. Elle posera les bonnes questions au prospect (budget, besoins, urgence) et vous enverra un résumé complet pour que vous puissiez faire votre devis."
        : "Perfect. We teach the AI your qualification criteria. It will ask the right questions to the prospect (budget, needs, urgency) and send you a complete summary so you can make your quote.",
    },
    {
      question: language === "fr" ? "Je suis le seul à connaître tous les détails de mon entreprise." : "I am the only one who knows all the details of my company.",
      answer: language === "fr"
        ? "C'est pourquoi nous faisons un atelier d'intégration avec vous. Vous nous expliquez votre fonctionnement, ou nous donnons simplement à l'IA accès à vos documents internes, votre site et vos anciennes conversations pour qu'elle apprenne."
        : "That's why we do an integration workshop with you. You explain your operation to us, or we simply give the AI access to your internal documents, your site, and your past conversations so it can learn.",
    },
    {
      question: language === "fr" ? "Que se passe-t-il si le bot se trompe ?" : "What happens if the bot makes a mistake?",
      answer: language === "fr"
        ? "Nous limitons ses connaissances strictement à votre base de données (RAG : Retrieval-Augmented Generation). S'il ne sait pas, il est programmé pour dire : « Je ne suis pas sûr, un membre de l'équipe va vous recontacter. »"
        : "We strictly limit its knowledge to your database (RAG: Retrieval-Augmented Generation). If it doesn't know, it is programmed to say: 'I'm not sure, a member of the team will get back to you.'",
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <main className="pt-20">
        <SegmentHero
          segment={language === "fr" ? "Prestataires de Services" : "Service Providers"}
          title={language === "fr" ? "Arrêtez de répondre aux mêmes questions 50 fois par semaine" : "Stop answering the same questions 50 times a week"}
          subtitle={language === "fr"
            ? "Automatisez votre support et la qualification de vos prospects avec une IA qui connaît votre métier sur le bout des doigts."
            : "Automate your support and prospect qualification with an AI that knows your business inside out."}
          before={beforeData}
          bridge={bridgeData}
          after={afterData}
        />
        <ObjectionHandling objections={servicesObjections} />
        <AnimatedCTASection />
      </main>
      <Footer />
    </div>
  )
}
