import type { MetadataRoute } from "next";
import { brand } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${brand.siteUrl}/sitemap.xml` };
}
