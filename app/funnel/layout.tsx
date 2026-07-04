import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Diagnostic IA Gratuit | KAMTECH — Trouvez votre solution IA",
  description:
    "Répondez à 4 questions et recevez un plan personnalisé pour automatiser votre activité avec l'IA. Diagnostic gratuit — sans engagement.",
  openGraph: {
    title: "Diagnostic IA Gratuit | KAMTECH",
    description: "Trouvez la solution IA qui correspond à votre activité en 2 minutes. Plan personnalisé offert.",
    type: "website",
    url: "https://kamtech.online/funnel",
  },
  alternates: {
    canonical: "https://kamtech.online/funnel",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
