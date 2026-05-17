<div align="center">

# Jullien Lab — Portfolio

**AI / AIエージェント / 業務効率化AI / AI組み込みWebアプリ を専門とする Jullien のポートフォリオサイト。**

実案件のケーススタディと、設計判断を読み取れる個人プロジェクトを Work 単位で公開しています。

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2-000000?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-r184-000000?logo=three.js&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-12-0055FF?logo=framer&logoColor=white">
</p>

<sub>Status: 開発中 / 公開 URL はデプロイ完了後に追記</sub>

</div>

---

## Table of Contents

- [About This Site](#about-this-site)
- [Who This Site Is For](#who-this-site-is-for)
- [Featured Works](#featured-works)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Contact](#contact)
- [License](#license)

---

## About This Site

「Jullien Lab」は、Jullien（19歳・Human+ Founder）の AI・AIエージェント・業務効率化AI・AI組み込みWebアプリの実績と設計判断を、第三者が短時間で評価できる形にまとめたポートフォリオサイトです。

サイトのコアは以下の3つです:

- **Works** — 実案件・個人プロジェクトを、課題 / 設計判断 / 成果 / 数値の構成で記述したケーススタディ。
- **Skills** — レーダーチャート形式で得意領域と強度を可視化。
- **Terminal UI** — トップページのターミナル風 UI から、スキル・実績・連絡先などをコマンド形式で照会できる。

実装の真実の情報源は `src/content/` 配下に集約しており、コンテンツ更新は単一ファイルの編集で完結する設計にしています。

---

## Who This Site Is For

- **採用ご担当者の方** — 各 Work の `summary` / `result` / `metrics` を見ていただければ、案件のインパクトと担当範囲が60秒で把握できる構成にしています。
- **技術評価をする方** — 各 Work の `whatIBuilt`（実装内容・設計判断）と、リポジトリ内コードを直接参照できます。ケーススタディは「何を作ったか」より「何をどう判断したか」を重視して書いています。
- **コラボレーションご検討の方** — メールでお気軽にご連絡ください（[Contact](#contact)）。

---

## Featured Works

サイトに掲載中の代表的なプロジェクト:

| Work | Type | 概要 |
|---|---|---|
| **History Soul Matcher** | 個人プロジェクト（公開） | 顔写真から最も似た歴史上の人物を提示する Web アプリ。Claude Vision + Tool Use + 決定論的スコアリングの3段パイプラインでハルシネーションを構造的に抑える設計。[GitHub](https://github.com/Ink6x/history-soul-matcher) |
| **コーチング事業向けAI導入** | 受託案件（匿名化） | 週150分のレポート業務をゼロにし、1コーチ依存を複数コーチ体制に拡張可能にした実行基盤。階層型集約で月次トークン消費89.8%削減、解約率30%低下。要件定義から本番運用まで単独担当。継続稼働中。 |

各 Work の詳細は サイト上の `/works/<slug>` または `src/content/works.ts` を参照してください。

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2（App Router） |
| UI | React 19.2 / Tailwind CSS 4 |
| Language | TypeScript 5（strict） |
| 3D / Animation | Three.js (`@react-three/fiber` / `@react-three/drei`) / Framer Motion |
| AI（一部機能） | Anthropic Claude（`@anthropic-ai/sdk`） |
| Utilities | `clsx` / `tailwind-merge` |
| Deployment | Vercel |

詳細な開発規約・コンテンツ追加方法は `CLAUDE.md` を参照してください。

---

## Getting Started

### Prerequisites

- Node.js 20 以上
- npm（または pnpm / yarn）

### Installation

```bash
git clone <repository-url>
cd portfolio-site
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

`src/app/page.tsx` を編集するとホットリロードで反映されます。

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | 開発サーバー起動（http://localhost:3000） |
| `npm run build` | プロダクションビルド |
| `npm run start` | ビルド済アプリのローカル起動 |
| `npm run lint` | ESLint（`eslint-config-next`） |

---

## Project Structure

```
portfolio-site/
├─ src/
│  ├─ app/                    # App Router（ページ・レイアウト・API）
│  ├─ components/             # UI コンポーネント
│  │  └─ sections/            # トップページのセクション単位
│  ├─ content/                # コンテンツの真実の情報源
│  │  ├─ site.ts              # サイト名・オーナー情報
│  │  ├─ works.ts             # Work 一覧
│  │  ├─ skills.ts            # スキル（レーダーチャート）
│  │  ├─ terminal-knowledge.ts # ターミナル UI のコマンド応答
│  │  └─ links.ts             # 連絡先リンク
│  ├─ lib/                    # ヘルパー（Work 取得など）
│  └─ types/                  # 型定義
├─ public/
│  └─ images/work/<slug>/     # Work ごとのスクリーンショット
└─ CLAUDE.md                   # 開発規約・コンテンツ運用ルール
```

---

## Contact

お問い合わせ・ご相談はメールでお気軽にどうぞ。

- Email: humanxxplus@gmail.com

---

## License

All Rights Reserved.

本リポジトリは閲覧目的で公開しています。コード・コンテンツの再利用や再配布は許可していません。
