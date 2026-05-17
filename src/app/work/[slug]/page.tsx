import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
        {/* Banner strip — narrow, above the WORK label */}
        {work.heroImage && (
          <div className="mb-6 w-full">
            <Image
              src={work.heroImage}
              alt=""
              width={2172}
              height={724}
              className="h-auto w-full"
              priority
            />
          </div>
        )}

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

        {/* Links */}
        {(work.githubUrl || work.demoUrl) && (
          <div className="mb-8 flex items-center gap-5">
            {work.githubUrl && (
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            )}
            {work.demoUrl && (
              <a
                href={work.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-text-muted)] underline-offset-2 hover:text-[var(--color-text)] hover:underline"
              >
                {work.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")} →
              </a>
            )}
          </div>
        )}

        {/* Image grid — only for works that don't use inline images */}
        {!work.inlineImages && work.detailImages && work.detailImages.length > 0 && (
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
                  <Fragment key={i}>
                    <p className={i > 0 ? "mt-4" : ""}>{para}</p>
                    {work.inlineImages && work.detailImages?.[i] && (
                      <div className="mt-4">
                        <Image
                          src={work.detailImages[i].src}
                          alt={work.detailImages[i].alt}
                          width={600}
                          height={338}
                          style={{ maxWidth: "384px", width: "100%", height: "auto" }}
                          className="border border-[var(--color-line)]"
                        />
                      </div>
                    )}
                  </Fragment>
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
