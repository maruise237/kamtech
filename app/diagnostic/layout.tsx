import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Diagnostic IA Gratuit | KAMTECH — Trouvez votre solution IA en 90 secondes",
  description:
    "6 questions pour identifier la solution IA adaptée à votre business. Chatbot WhatsApp, site web IA, automatisation, agent IA ou audit. Résultat personnalisé immédiat.",
  openGraph: {
    title: "Diagnostic IA Gratuit | KAMTECH",
    description: "Trouvez la solution IA qui correspond à votre business en 90 secondes.",
    type: "website",
    url: "https://kamtech.online/diagnostic",
  },
  alternates: {
    canonical: "https://kamtech.online/diagnostic",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
