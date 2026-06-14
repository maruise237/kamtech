"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SegmentHero } from "@/components/segments/segment-hero"
import { ObjectionHandling } from "@/components/segments/objection-handling"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { useTranslation } from "@/lib/i18n-context"

export default function RestaurantSegmentClient() {
  const { language } = useTranslation()

  const beforeData = {
    title: language === "fr" ? "Perdez réservations" : "Lost Reservations",
    description: language === "fr"
      ? "Le client écrit à 20h. Vous êtes en plein service, impossible de répondre. À 22h, quand vous regardez enfin, il a déjà réservé ailleurs."
      : "The client writes at 8 PM. You are in the middle of service, impossible to answer. At 10 PM, when you finally look, they have already booked elsewhere.",
  }

  const bridgeData = {
    title: language === "fr" ? "Chatbot répond instantanément" : "Chatbot answers instantly",
    description: language === "fr"
      ? "Notre IA Kamtech prend le relais. Elle répond en 2 secondes, propose les menus, prend la réservation et la note dans votre agenda."
      : "Our Kamtech AI takes over. It answers in 2 seconds, proposes menus, takes the reservation, and notes it in your calendar.",
  }

  const afterData = {
    title: language === "fr" ? "Réservez 40% plus tables" : "Book 40% more tables",
    description: language === "fr"
      ? "Votre salle est pleine. Vos clients apprécient la réactivité, et vous pouvez enfin vous concentrer sur la cuisine et le service en salle."
      : "Your room is full. Your customers appreciate the responsiveness, and you can finally focus on the kitchen and table service.",
  }

  const restaurantObjections = [
    {
      question: language === "fr" ? "Mes clients veulent parler à un humain, pas à un robot." : "My customers want to talk to a human, not a robot.",
      answer: language === "fr"
        ? "L'IA Kamtech est conçue pour être chaleureuse et naturelle. De plus, 80% des clients préfèrent une réponse immédiate d'un bot à une attente de plusieurs heures pour un humain. Si le bot ne comprend pas, il peut toujours vous transférer la conversation."
        : "Kamtech AI is designed to be warm and natural. Moreover, 80% of customers prefer an immediate response from a bot to waiting several hours for a human. If the bot doesn't understand, it can always transfer the conversation to you.",
    },
    {
      question: language === "fr" ? "Comment le bot gère-t-il les allergies ou les demandes spéciales ?" : "How does the bot handle allergies or special requests?",
      answer: language === "fr"
        ? "Vous pouvez entraîner l'IA avec toutes vos spécificités (menus, allergènes, placement). Si une demande sort de son champ de compétence, elle prévient qu'un membre de l'équipe prendra le relais pour cette demande précise."
        : "You can train the AI with all your specificities (menus, allergens, placement). If a request falls outside its field of competence, it warns that a team member will take over for this specific request.",
    },
    {
      question: language === "fr" ? "Est-ce compliqué à installer avec mon système de réservation actuel ?" : "Is it complicated to install with my current reservation system?",
      answer: language === "fr"
        ? "Pas du tout ! Nous pouvons connecter l'IA à la plupart des outils de réservation du marché (TheFork, Zenchef, etc.) ou simplement lui faire utiliser un Google Calendar. Tout est prêt en 7 jours."
        : "Not at all! We can connect the AI to most reservation tools on the market (TheFork, Zenchef, etc.) or simply have it use a Google Calendar. Everything is ready in 7 days.",
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <main className="pt-20">
        <SegmentHero
          segment={language === "fr" ? "Restaurants" : "Restaurants"}
          title={language === "fr" ? "Ne laissez plus une table vide à cause d'un message non lu" : "Don't leave a table empty anymore because of an unread message"}
          subtitle={language === "fr"
            ? "Automatisez vos réservations WhatsApp et concentrez-vous sur ce qui compte vraiment : l'expérience de vos clients en salle."
            : "Automate your WhatsApp reservations and focus on what really matters: your customers' dining experience."}
          before={beforeData}
          bridge={bridgeData}
          after={afterData}
        />
        <ObjectionHandling objections={restaurantObjections} />
        <AnimatedCTASection />
      </main>
      <Footer />
    </div>
  )
}
