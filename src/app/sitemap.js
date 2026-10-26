import { site } from "@/data/site";

export default function sitemap() {
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}
