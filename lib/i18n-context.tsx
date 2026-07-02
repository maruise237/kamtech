"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fr } from "./translations/fr";
import { en } from "./translations/en";

type Language = "fr" | "en";
type Translations = typeof fr;

interface I18nContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLangState] = useState<Language>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    let detectedLang: Language = "fr";

    if (savedLang && (savedLang === "fr" || savedLang === "en")) {
      detectedLang = savedLang;
    } else {
      const browserLang = navigator.language.toLowerCase();
      detectedLang = browserLang.startsWith("fr") ? "fr" : "en";
    }

    setLangState(detectedLang);
    document.documentElement.lang = detectedLang;
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = language === "fr" ? fr : en;

  return (
    <I18nContext.Provider value={{ language, t, setLanguage }}>
      {/* Masquer le contenu le temps de détecter la langue → évite le flash fr→en */}
      <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.15s ease-in" }}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
