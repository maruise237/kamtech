import type { Metadata } from "next"
import DiagnosticQuiz from "./DiagnosticQuiz"

export const metadata: Metadata = {
  title: "Diagnostic IA Gratuit | KAMTECH — Trouvez la solution IA pour votre activité",
  description:
    "Répondez à 4 questions et recevez un plan personnalisé pour automatiser votre activité avec l'IA. Diagnostic gratuit — sans engagement.",
  openGraph: {
    title: "Diagnostic IA Gratuit | KAMTECH",
    description:
      "Trouvez la solution IA qui correspond à votre activité en 2 minutes. Plan personnalisé offert.",
    type: "website",
    url: "https://kamtech.online/accompagnement",
  },
  alternates: {
    canonical: "https://kamtech.online/accompagnement",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AccompagnementPage() {
  return <DiagnosticQuiz />
}
