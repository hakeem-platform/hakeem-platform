import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: works } = await supabase
    .from("works")
    .select("id, updated_at")
    .order("created_at", { ascending: false });

  const workUrls: MetadataRoute.Sitemap = (works || []).map((work) => ({
    url: `https://hakeemplatform.com/portfolio/${work.id}`,
    lastModified: new Date(work.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://hakeemplatform.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://hakeemplatform.com/portfolio",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...workUrls,
  ];
}
