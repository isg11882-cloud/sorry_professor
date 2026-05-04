import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { getCanonicalUrl, getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: getCanonicalUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
