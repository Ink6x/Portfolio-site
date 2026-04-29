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
                alt="Jullien"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-[var(--color-text)]" id="about-heading">
                Jullien
              </p>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Founder of Human+
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="flex max-w-xl flex-col gap-5">
            <p
              className="leading-8 text-[var(--color-text-muted)]"
              style={{ fontSize: "0.9375rem" }}
            >
              中学2年生のときに観た『マトリックス』をきっかけに、情報の世界にのめりこむ。独学でAI開発からスタートし、Linux、インフラ、Web開発と、必要に応じて領域を広げてきました。
            </p>
            <p
              className="leading-8 text-[var(--color-text-muted)]"
              style={{ fontSize: "0.9375rem" }}
            >
              大学では情報科学を専攻し、脳情報解析の研究室に所属。人間の認知と機械学習の両面から「知能」に触れた経験が、現在の土台になっています。
            </p>
            <p
              className="leading-8 text-[var(--color-text-muted)]"
              style={{ fontSize: "0.9375rem" }}
            >
              現在は独立し、AIプロダクトの開発、企業のAI導入における技術支援、業務改善のための社内ツール開発に携わっています。LLMを活用した業務ツールの設計・実装から、AWS上での運用、フロントエンドの構築まで、要件定義から本番運用までを一貫して担当することが多いです。
            </p>

          </div>
        </div>
      </Container>
    </section>
  );
}
