"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getCalApi } from "@calcom/embed-react"
import { Toaster } from "sonner"
import Loader from "@/components/ui/loader"
import { StickyMobileCTA } from "@/components/sticky-mobile-cta"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { NoSSRWrapper } from "@/components/no-ssr-wrapper"
import { ElevenLabsWidget } from "@/components/elevenlabs-widget"
import { LanguageProvider } from "@/lib/i18n-context"

function ClientLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showLoader, setShowLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname()

  // Hide popups/widgets on quiz & funnel pages
  const isQuizPage = pathname?.startsWith("/accompagnement") || pathname?.startsWith("/diagnostic")

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    
    if (document.readyState === "complete") {
      setIsReady(true);
      return;
    }

    let hasLoaded = false;
    const handleLoad = () => {
      hasLoaded = true;
      setIsReady(true);
      setShowLoader(false);
    };

    window.addEventListener("load", handleLoad);

    const timer = setTimeout(() => {
      if (!hasLoaded) {
        setShowLoader(true);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <LanguageProvider>
      <NoSSRWrapper>
        <div
          id="loader-kamtech"
          className={(!showLoader || isReady) ? "loader-hidden" : ""}
          aria-hidden={!showLoader || isReady}
        >
          {showLoader && !isReady && <Loader />}
        </div>
      </NoSSRWrapper>

      <div>
        {children}
        <NoSSRWrapper>
          {!isQuizPage && (
            <>
              <StickyMobileCTA />
              <ExitIntentPopup />
              <ElevenLabsWidget />
            </>
          )}
        </NoSSRWrapper>
        <Toaster richColors position="top-right" />
      </div>
    </LanguageProvider>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={null}>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Suspense>
  )
}
