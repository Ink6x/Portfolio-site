import { WORKS } from "@/content/works";
import type { Work } from "@/types/work";

export function getWorkBySlug(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export function getAllWorkSlugs(): string[] {
  return WORKS.filter((w) => w.detailPage).map((w) => w.slug);
}
