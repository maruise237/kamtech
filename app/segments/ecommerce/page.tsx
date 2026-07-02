import { Metadata } from "next"
import EcommerceSegmentClient from "./EcommerceSegmentClient"

export const metadata: Metadata = {
  title: "KAMTECH IA pour E-commerce | Récupérez 35% de paniers",
  description: "Récupérez les paniers abandonnés sur WhatsApp. Votre boutique ouverte H24 avec un agent de vente IA."
}

export default function EcommerceSegment() {
  return <EcommerceSegmentClient />
}
