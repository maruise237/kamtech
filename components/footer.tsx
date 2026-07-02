"use client"

import { useCallback } from "react"
import { LeLoLogo } from "./lelo-logo"
import { Button } from "./ui/button"
import { openWhatsAppChat } from "@/lib/whatsapp"
import { useTranslation } from "@/lib/i18n-context"

export function Footer() {
  const { t, language } = useTranslation()
  const handleContactClick = useCallback(() => {
    openWhatsAppChat("contactDirect", language)
  }, [language])

  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="sm:col-span-1 lg:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">KAMTECH IA</div>
            <p className="text-white/70 mb-4 max-w-md text-sm sm:text-base">
              {t.footer.desc}
            </p>
            <p className="text-xs sm:text-sm text-white/50 italic mb-4">{t.footer.highlight}</p>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm w-full sm:w-auto"
            >
              <a href="#contact">{t.footer.cta}</a>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">{t.footer.services}</h3>
            <ul className="space-y-2 text-white/70 text-xs sm:text-sm">
              <li>
                <a href="#features" className="hover:text-white transition-colors inline-block">
                  {t.footer.service1}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors inline-block">
                  {t.footer.service2}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors inline-block">
                  {t.footer.service3}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors inline-block">
                  {t.footer.service4}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">{t.footer.sectors}</h3>
            <ul className="space-y-2 text-white/70 text-xs sm:text-sm">
              <li>
                <a href="/segments/restaurants" className="hover:text-white transition-colors inline-block">
                  {t.footer.sector1}
                </a>
              </li>
              <li>
                <a href="/segments/ecommerce" className="hover:text-white transition-colors inline-block">
                  {t.footer.sector2}
                </a>
              </li>
              <li>
                <a href="/segments/services" className="hover:text-white transition-colors inline-block">
                  {t.footer.sector3}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">{t.footer.contact}</h3>
            <ul className="space-y-2 text-white/70 text-xs sm:text-sm">
              <li>
                <a href="https://wa.me/237658992588" className="hover:text-white transition-colors inline-block">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block">
                  Email
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
          <p className="text-xs sm:text-sm">&copy; 2026 KAMTECH IA. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
