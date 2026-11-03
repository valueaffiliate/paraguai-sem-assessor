import type { MetadataRoute } from "next";
import { brand } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${brand.siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${brand.siteUrl}/cidades`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
