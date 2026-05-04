import type { Metadata } from "next";

import { HomeClient } from "@/components/home-client";
import {
  getCanonicalUrl,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LANGUAGE,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  alternates: {
    canonical: getCanonicalUrl(),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${getCanonicalUrl()}#website`,
      name: SITE_NAME,
      url: getCanonicalUrl(),
      description: SITE_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
    },
    {
      "@type": "WebApplication",
      "@id": `${getCanonicalUrl()}#webapp`,
      name: SITE_NAME,
      url: getCanonicalUrl(),
      description: SITE_DESCRIPTION,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "JavaScript required",
      isAccessibleForFree: true,
      inLanguage: SITE_LANGUAGE,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KRW",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <HomeClient />
    </>
  );
}
