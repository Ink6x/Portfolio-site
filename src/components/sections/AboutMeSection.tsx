import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutMeSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="mb-10">
          <SectionLabel>ABOUT ME</SectionLabel>
        </div>

        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
          {/* Profile photo + name */}
          <div className="flex shrink-0 flex-col items-center gap-3">
            <div
              className="relative h-32 w-32 overflow-hidden rounded-full md:h-40 md:w-40"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Ink6x"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-[var(--color-text)]" id="about-heading">
                Ink6x
              </p>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Founder of Human+
              </p>
              <div className="mt-1 flex items-center gap-3">
                <a
                  href="https://github.com/Ink6x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/xInk6x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="X">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="flex max-w-xl flex-col gap-5">
            <p
              className="leading-8 text-[var(--color-text-muted)]"
              style={{ fontSize: "17px" }}
            >
              中学2年生のときに観た『マトリックス』をきっかけに、情報の世界にのめりこむ。独学でAI開発からスタートし、Linux、インフラ、Web開発と、必要に応じて領域を広げてきました。
            </p>
            <p
              className="leading-8 text-[var(--color-text-muted)]"
              style={{ fontSize: "17px" }}
            >
              大学では情報科学を専攻し、脳情報解析の研究室に所属。人間の認知と機械学習の両面から「知能」に触れた経験が、現在の土台になっています。
            </p>
            <p
              className="leading-8 text-[var(--color-text-muted)]"
              style={{ fontSize: "17px" }}
            >
              現在はAIの研究・開発、企業のAI導入における技術支援、AIプロダクトの開発に携わっています。AIを活用した業務ツールの要件定義から本番運用、AIモデルの開発などを担当することが多いです。
            </p>
            <p
              className="leading-8 text-[var(--color-text-muted)]"
              style={{ fontSize: "17px" }}
            >
              現在は <a
                href="https://jibun-vision.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] underline decoration-[var(--color-line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--color-text)]"
              >アイアンド株式会社</a> のCTOとして自社プロダクト「じぶんビジョン」の技術運用を担当する一方、<strong>Human+</strong> として個人で企業のAI導入支援を受託しています。
            </p>

          </div>
        </div>
      </Container>
    </section>
  );
}
