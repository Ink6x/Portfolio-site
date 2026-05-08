export type WorkStatus = "public" | "anonymized" | "private-demo";

export interface WorkObjectAsset {
  glb?: string;
  fallbackImage?: string;
  alt: string;
}

export interface WorkDetailImage {
  src: string;
  alt: string;
}

export interface WorkMetric {
  before?: string;
  after: string;
  label: string;
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
  detailImages?: WorkDetailImage[];
  metrics?: WorkMetric[];
}
