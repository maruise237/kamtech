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
    if (savedLang && (savedLang === "fr" || savedLang === "en")) {
      setLangState(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (!browserLang.startsWith("fr")) {
        setLangState("en");
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = language === "fr" ? fr : en;

  // Prevent hydration mismatch by not rendering or rendering with default until mounted
  // Actually, for better UX we might want to just render with the default "fr" and then switch.
  // But to follow instructions strictly, we should detect and switch.

  return (
    <I18nContext.Provider value={{ language, t, setLanguage }}>
      {children}
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
