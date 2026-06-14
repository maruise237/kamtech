import { Metadata } from "next"
import ServicesSegmentClient from "./ServicesSegmentClient"

export const metadata: Metadata = {
  title: "KAMTECH IA pour Services | Gagnez 10h/semaine",
  description: "Divisez par 4 le temps passé sur le support client grâce à l'automatisation IA."
}

export default function ServicesSegment() {
  return <ServicesSegmentClient />
}
