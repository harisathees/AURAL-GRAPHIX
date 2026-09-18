import type { Metadata } from "next";
import { site } from "@/data/site";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/* ---------------- JSON-LD ---------------- */

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: absoluteUrl("/assets/logo-black.webp"),
  image: absoluteUrl("/opengraph-image"),
  description: site.description,
  email: site.email,
  telephone: site.phones[0],
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  },
  sameAs: site.socials.map((s) => s.href),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": absoluteUrl("/#organization") },
  inLanguage: "en",
});

export const professionalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": absoluteUrl("/#service"),
  name: site.name,
  url: site.url,
  image: absoluteUrl("/assets/logo-black.webp"),
  description: site.description,
  priceRange: "$$",
  telephone: site.phones[0],
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.countryCode,
  },
  areaServed: "Worldwide",
  serviceType: ["Branding & Identity", "UI/UX Design", "Web Development", "Digital Marketing"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "54", bestRating: "5" },
});

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqSchema = (faqs: ReadonlyArray<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Serialized from local, trusted content only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
