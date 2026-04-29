import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getWorkBySlug, getAllWorkSlugs } from "@/lib/work";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

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
      <Container className="max-w-3xl">
        <div className="mb-8 flex flex-col gap-3">
          <SectionLabel>WORK</SectionLabel>
          {work.status === "anonymized" && (
            <p className="text-xs text-[var(--color-text-subtle)]">
              このプロジェクトは守秘義務に配慮し、公開可能な範囲で内容を再構成しています。
            </p>
          )}
        </div>

        <h1 className="mb-10 text-2xl font-light tracking-wide text-[var(--color-text)] md:text-3xl">
          {work.name}
        </h1>

        <dl className="flex flex-col gap-8">
          <div>
            <dt className="mb-2 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
              Summary
            </dt>
            <dd className="text-sm leading-7 text-[var(--color-text-muted)]">
              {work.summary}
            </dd>
          </div>

          <div>
            <dt className="mb-2 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
              Role
            </dt>
            <dd className="flex flex-wrap gap-2">
              {work.role.map((r) => (
                <span
                  key={r}
                  className="border border-[var(--color-line)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]"
                >
                  {r}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="mb-2 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
              Context
            </dt>
            <dd className="text-sm leading-7 text-[var(--color-text-muted)]">
              {work.context ? (
                work.context.split("\n\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {para}
                  </p>
                ))
              ) : (
                <span className="text-[var(--color-text-subtle)]">
                  準備中
                </span>
              )}
            </dd>
          </div>

          <div>
            <dt className="mb-2 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
              What I Built
            </dt>
            <dd className="text-sm leading-7 text-[var(--color-text-muted)]">
              {work.whatIBuilt ? (
                work.whatIBuilt.split("\n\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {para}
                  </p>
                ))
              ) : (
                <span className="text-[var(--color-text-subtle)]">
                  準備中
                </span>
              )}
            </dd>
          </div>

          <div>
            <dt className="mb-2 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
              Technical Stack
            </dt>
            <dd className="flex flex-wrap gap-2">
              {work.stack.map((s) => (
                <span
                  key={s}
                  className="border border-[var(--color-line)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="mb-2 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
              Result / Output
            </dt>
            <dd className="text-sm leading-7 text-[var(--color-text-muted)]">
              {work.result ? (
                work.result.split("\n\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {para}
                  </p>
                ))
              ) : (
                <span className="text-[var(--color-text-subtle)]">
                  準備中
                </span>
              )}
            </dd>
          </div>

          {(work.githubUrl || work.demoUrl) && (
            <div>
              <dt className="mb-2 text-xs tracking-widest text-[var(--color-text-subtle)] uppercase">
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
