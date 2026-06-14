import { Metadata } from "next"
import RestaurantSegmentClient from "./RestaurantSegmentClient"

export const metadata: Metadata = {
  title: "KAMTECH IA pour Restaurants | Plus de réservations, moins d'attente",
  description: "Automatisez vos réservations WhatsApp. Ne perdez plus aucune table parce que vous étiez trop occupé pour répondre.",
}

export default function RestaurantSegment() {
  return <RestaurantSegmentClient />
}
