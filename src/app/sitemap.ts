import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { getCanonicalUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getCanonicalUrl(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
