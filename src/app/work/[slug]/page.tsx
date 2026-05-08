import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getWorkBySlug, getAllWorkSlugs } from "@/lib/work";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkImageGrid } from "@/components/work/detail/WorkImageGrid";
import { MetricCallout } from "@/components/work/detail/MetricCallout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: work.name,
    description: work.summary,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-32">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex flex-col gap-3">
            <SectionLabel>WORK</SectionLabel>
            {work.status === "anonymized" && (
              <p className="text-xs text-[var(--color-text-subtle)]">
                このプロジェクトは守秘義務に配慮し、公開可能な範囲で内容を再構成しています。
              </p>
            )}
          </div>

          <h1 className="mb-4 text-2xl font-light tracking-wide text-[var(--color-text)] md:text-3xl">
            {work.name}
          </h1>

          <p className="mb-6 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
            {work.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {work.role.map((r) => (
              <span
                key={r}
                className="border border-[var(--color-line-strong)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]"
              >
                {r}
              </span>
            ))}
            {work.stack.map((s) => (
              <span
                key={s}
                className="border border-[var(--color-line)] px-2 py-0.5 text-xs text-[var(--color-text-subtle)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Image grid */}
        {work.detailImages && work.detailImages.length > 0 && (
          <WorkImageGrid images={work.detailImages} />
        )}

        {/* Content sections */}
        <dl className="flex flex-col gap-12">
          {work.context && (
            <div>
              <dt className="mb-3 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
                The Challenge
              </dt>
              <dd className="text-sm leading-7 text-[var(--color-text-muted)]">
                {work.context.split("\n\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {para}
                  </p>
                ))}
              </dd>
            </div>
          )}

          {work.whatIBuilt && (
            <div>
              <dt className="mb-3 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
                What I Built
              </dt>
              <dd className="text-sm leading-7 text-[var(--color-text-muted)]">
                {work.whatIBuilt.split("\n\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {para}
                  </p>
                ))}
              </dd>
            </div>
          )}

          {(work.metrics || work.result) && (
            <div>
              <dt className="mb-3 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
                Impact
              </dt>
              <dd>
                {work.metrics && work.metrics.length > 0 && (
                  <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {work.metrics.map((m, i) => (
                      <MetricCallout key={i} {...m} />
                    ))}
                  </div>
                )}
                {work.result && (
                  <div className="text-sm leading-7 text-[var(--color-text-muted)]">
                    {work.result.split("\n\n").map((para, i) => (
                      <p key={i} className={i > 0 ? "mt-4" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </dd>
            </div>
          )}

          {(work.githubUrl || work.demoUrl) && (
            <div>
              <dt className="mb-3 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
                Links
              </dt>
              <dd className="flex gap-4">
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-muted)] underline-offset-2 hover:text-[var(--color-text)] hover:underline"
                  >
                    GitHub →
                  </a>
                )}
                {work.demoUrl && (
                  <a
                    href={work.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-muted)] underline-offset-2 hover:text-[var(--color-text)] hover:underline"
                  >
                    Demo →
                  </a>
                )}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-16">
          <Link
            href="/#work"
            className="text-xs text-[var(--color-text-subtle)] underline-offset-2 hover:text-[var(--color-text-muted)] hover:underline"
          >
            ← Back to Work
          </Link>
        </div>
      </Container>
    </main>
  );
}
