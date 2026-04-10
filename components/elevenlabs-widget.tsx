"use client"

import React, { useEffect, useState } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { "agent-id": string }, HTMLElement>
    }
  }
}

export function ElevenLabsWidget() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <elevenlabs-convai agent-id="agent_9501knvjd16wesybzww347yhqb30"></elevenlabs-convai>
  )
}
