export type WorkStatus = "public" | "anonymized" | "private-demo";

export interface WorkObjectAsset {
  glb?: string;
  fallbackImage?: string;
  alt: string;
}

export interface Work {
  slug: string;
  name: string;
  summary: string;
  role: string[];
  stack: string[];
  status: WorkStatus;
  detailPage: boolean;
  githubUrl?: string;
  demoUrl?: string;
  objectAsset: WorkObjectAsset;
  context?: string;
  whatIBuilt?: string;
  result?: string;
}
