import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://kamtech.online"),
  title: "KAMTECH IA | Agence IA & Automatisation Sur Mesure pour PME",
  description: "KAMTECH IA est votre partenaire en solutions IA personnalisées pour PME — où que vous soyez. Chatbot WhatsApp, automatisation, site web, agents IA. On écoute votre problème — on construit votre solution. Audit gratuit.",
  generator: "v0.app",
  keywords: ["KAMTECH IA", "agence IA", "automatisation sur mesure PME", "chatbot WhatsApp", "solution IA personnalisée", "agent IA PME", "automatisation n8n", "IA sans frontières", "conseil IA pour PME"],
  openGraph: {
    title: "KAMTECH IA — Votre Partenaire IA Sur Mesure",
    description: "On écoute votre problème. On construit votre solution. Chatbot, automatisation, site, agents IA — pour les PME du monde entier.",
    type: "website",
    url: "https://kamtech.online",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KAMTECH IA",
    url: "https://kamtech.online",
    logo: "https://kamtech.online/icon.png",
    description: "Agence IA sur mesure — solutions personnalisées pour PME partout dans le monde / Custom AI solutions for SMEs worldwide",
  }

  return (
    <html lang="fr" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            body, html {
              background-color: #000000 !important;
              color: #ffffff;
              margin: 0;
              padding: 0;
            }
            #loader-kamtech {
              position: fixed;
              top: 0; left: 0; width: 100vw; height: 100vh;
              background-color: #000000;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
              transition: opacity 0.3s ease-out;
            }
            .loader-hidden {
              opacity: 0;
              pointer-events: none;
              visibility: hidden;
            }
          `
        }} />
      </head>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} bg-black text-white antialiased`} suppressHydrationWarning>
        <ClientLayout>
          <Script
            src="https://unpkg.com/@elevenlabs/convai-widget-embed"
            async
            strategy="afterInteractive"
          />
          <Script
            defer
            src="https://umami.kamtech.online/script.js"
            data-website-id="ffe15763-97ed-4db8-88e3-7f3923a42ce2"
            strategy="afterInteractive"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
