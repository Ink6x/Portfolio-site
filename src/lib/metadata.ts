import type { Metadata } from "next";
import { SITE_CONFIG } from "@/content/site";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: `AI systems, agents, and web apps by ${SITE_CONFIG.owner}, ${SITE_CONFIG.organization}.`,
    ...overrides,
  };
}
