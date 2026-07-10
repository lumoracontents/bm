import type { MetadataRoute } from "next";
import { blogPosts, products, remixAuditService, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const publicRoutes = ["", "/consulting", "/faq", "/blog"];
  const productRoutes = products.map((product) => `/products/${product.slug}`);
  const serviceRoutes = [`/services/${remixAuditService.slug}`];
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

  return [...publicRoutes, ...productRoutes, ...serviceRoutes, ...blogRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
