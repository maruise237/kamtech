import { notFound } from "next/navigation";
import { seoPagesData } from "@/lib/seo-data";
import SEOPageClient from "./SEOPageClient";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = seoPagesData.find((p) => p.slug === params.slug);

  if (!pageData) {
    return {
      title: "Page introuvable | KAMTECH",
    };
  }

  return {
    title: pageData.title,
    description: pageData.description,
  };
}

export default function SEOPage({ params }: Props) {
  return <SEOPageClient slug={params.slug} />;
}
