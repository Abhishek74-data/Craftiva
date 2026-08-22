import { Fraunces, Manrope } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE } from "@/lib/site";
import { getCategories } from "@/lib/data";
import { WishlistProvider } from "@/components/wishlist";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Custom Furniture, Factory-Direct from Kirti Nagar, Delhi`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "custom furniture Delhi",
    "factory direct furniture",
    "Kirti Nagar furniture",
    "solid wood sofa",
    "made to order furniture India",
    "modular sofa",
    "wardrobe Delhi",
    "Craftiva Furniture",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: `${SITE.name} — Custom Furniture, Factory-Direct`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Custom Furniture, Factory-Direct`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const categories = getCategories();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/#business`,
        name: SITE.name,
        description: SITE.description,
        url: SITE.url,
        telephone: SITE.whatsappDisplay,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          ...SITE.postalAddress,
        },
        openingHours: "Mo-Sa 10:00-19:30",
        priceRange: "₹₹",
        areaServed: SITE.serviceArea,
        knowsAbout: ["custom furniture", "solid wood furniture", "made to order sofas", "wardrobes", "dining sets"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <WishlistProvider>
          <Header categories={categories} />
          <main className="flex-1">{children}</main>
          <Footer categories={categories} />
          <WhatsAppFloat />
        </WishlistProvider>
      </body>
    </html>
  );
}