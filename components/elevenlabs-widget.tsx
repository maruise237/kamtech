"use client"

import React, { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n-context"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { "agent-id": string }, HTMLElement>
    }
  }
}

export function ElevenLabsWidget() {
  const { language } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Different agent IDs or the same one if it handles both languages.
  // Assuming we use different ones or the same for now.
  // Instruction said "totally integral", if there's an English bot we should use it.
  // For now I'll keep the same but I've added the hook for future use.
  const agentId = language === "fr"
    ? "agent_9501knvjd16wesybzww347yhqb30"
    : "agent_9501knvjd16wesybzww347yhqb30" // Replace with EN agent ID if available

  return (
    <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
  )
}
