import type { Metadata, Viewport } from "next";
import { Caveat, Geist } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { JsonLd, absoluteUrl, organizationSchema, professionalServiceSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Creative Design Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    "creative design agency",
    "branding agency Madurai",
    "brand identity design",
    "UI UX design agency",
    "web development India",
    "logo design",
    "packaging design",
    "digital marketing agency",
    site.name,
  ],
  category: "Design",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/logo-mark.webp" }],
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f4f3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${caveat.variable}`}>
      <head>
        <JsonLd data={[organizationSchema(), websiteSchema(), professionalServiceSchema()]} />
      </head>
      <body className="overflow-x-hidden">
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-midnight focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Navigation />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


//sample