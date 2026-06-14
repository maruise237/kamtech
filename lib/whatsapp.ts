export const WHATSAPP_PHONE = "237658992588"

export const whatsappMessages = {
  fr: {
    auditGratuit: "Bonjour Kamtech IA, j'aimerais réserver mon audit gratuit pour automatiser mon WhatsApp.",
    parlerExpert: "Bonjour, je souhaite parler à un expert KAMTECH IA.",
    contactDirect: "Bonjour, j'ai une question sur vos solutions d'automatisation IA.",
  },
  en: {
    auditGratuit: "Hello Kamtech IA, I would like to book my free audit to automate my WhatsApp.",
    parlerExpert: "Hello, I wish to speak with a KAMTECH IA expert.",
    contactDirect: "Hello, I have a question about your IA automation solutions.",
  }
}

export const getWhatsAppLink = (messageKey: keyof typeof whatsappMessages.fr, language: string = "fr") => {
  const lang = language === "en" ? "en" : "fr"
  const message = whatsappMessages[lang][messageKey] || whatsappMessages[lang].contactDirect
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}

export const openWhatsAppChat = (messageKey: keyof typeof whatsappMessages.fr, language: string = "fr") => {
  if (typeof window !== "undefined") {
    const link = getWhatsAppLink(messageKey, language)
    window.open(link, "_blank", "noopener,noreferrer")
  }
}
