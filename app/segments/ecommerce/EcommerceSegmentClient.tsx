"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SegmentHero } from "@/components/segments/segment-hero"
import { ObjectionHandling } from "@/components/segments/objection-handling"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { useTranslation } from "@/lib/i18n-context"

export default function EcommerceSegmentClient() {
  const { t, language } = useTranslation()

  const beforeData = {
    title: language === "fr" ? "Panier abandonné" : "Abandoned Cart",
    description: language === "fr"
      ? "Votre prospect met un article au panier, hésite sur la livraison ou la taille, et quitte le site sans rien acheter. C'est de l'argent perdu."
      : "Your prospect adds an item to the cart, hesitates about shipping or size, and leaves the site without buying anything. That's lost money.",
  }

  const bridgeData = {
    title: language === "fr" ? "Chatbot engage avec offres" : "Chatbot engages with offers",
    description: language === "fr"
      ? "Le bot Kamtech envoie un message WhatsApp avec un code promo, répond à ses doutes (taille, livraison, etc.) de manière personnalisée."
      : "The Kamtech bot sends a WhatsApp message with a promo code, answers their doubts (size, shipping, etc.) in a personalized way.",
  }

  const afterData = {
    title: language === "fr" ? "Récupérez 35% paniers" : "Recover 35% of carts",
    description: language === "fr"
      ? "Le client est rassuré et achète. Votre chiffre d'affaires augmente automatiquement, sans aucun effort de votre équipe marketing."
      : "The customer is reassured and buys. Your revenue increases automatically, without any effort from your marketing team.",
  }

  const ecommerceObjections = [
    {
      question: language === "fr" ? "WhatsApp n'est-il pas trop intrusif pour relancer un client ?" : "Isn't WhatsApp too intrusive to follow up with a customer?",
      answer: language === "fr"
        ? "Tout dépend de la manière dont c'est fait. Avec un opt-in clair sur votre site et un message apportant de la valeur (comme une offre ou une aide), le taux de conversion sur WhatsApp est jusqu'à 3x supérieur à l'email, avec un taux d'ouverture de 98%."
        : "It all depends on how it's done. With a clear opt-in on your site and a value-adding message (like an offer or help), the conversion rate on WhatsApp is up to 3x higher than email, with an open rate of 98%.",
    },
    {
      question: language === "fr" ? "Mon catalogue a 5 000 produits. Le bot peut-il tout mémoriser ?" : "My catalog has 5,000 products. Can the bot memorize everything?",
      answer: language === "fr"
        ? "Absolument. Nous connectons l'IA à votre base de données produits (via API ou fichier CSV). Le bot peut conseiller un client sur n'importe quel produit de votre catalogue instantanément."
        : "Absolutely. We connect AI to your product database (via API or CSV file). The bot can advise a customer on any product in your catalog instantly.",
    },
    {
      question: language === "fr" ? "Comment gérer les retours ou les suivis de commande ?" : "How to handle returns or order tracking?",
      answer: language === "fr"
        ? "Le bot s'intègre avec votre CMS (Shopify, WooCommerce, etc.) pour donner le statut de livraison en temps réel et guider le client dans la procédure de retour si nécessaire, réduisant de moitié les tickets support."
        : "The bot integrates with your CMS (Shopify, WooCommerce, etc.) to give real-time delivery status and guide the customer through the return procedure if necessary, cutting support tickets in half."
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <main className="pt-20">
        <SegmentHero
          segment="E-commerce"
          title={language === "fr" ? "Transformez les hésitations en ventes avec un vendeur IA 24/7" : "Transform hesitations into sales with a 24/7 AI salesperson"}
          subtitle={language === "fr"
            ? "Ne perdez plus 70% de vos visiteurs. Un chatbot WhatsApp engage vos prospects, répond à leurs doutes et sauve vos paniers abandonnés."
            : "Don't lose 70% of your visitors anymore. A WhatsApp chatbot engages your prospects, answers their doubts, and saves your abandoned carts."}
          before={beforeData}
          bridge={bridgeData}
          after={afterData}
        />
        <ObjectionHandling objections={ecommerceObjections} />
        <AnimatedCTASection />
      </main>
      <Footer />
    </div>
  )
}
