import type { Work } from "@/types/work";

export const WORKS: Work[] = [
  {
    slug: "business-automation-agent",
    name: "業務効率化AIエージェント",
    summary: "TODO: 業務フローを自動化するAIエージェントの構築。",
    role: ["AI Engineer", "Backend"],
    stack: ["Python", "LangGraph", "FastAPI", "PostgreSQL"],
    status: "anonymized",
    detailPage: true,
    objectAsset: {
      alt: "業務効率化AIエージェントのビジュアル表現",
    },
  },
  {
    slug: "coaching-ai-implementation",
    name: "コーチング事業向けAI導入",
    summary:
      "週150分のレポート業務をゼロにし、1コーチ依存の事業を複数コーチ体制へ拡張可能にした。子どもの目標達成を支援するコーチング事業向けに、Discord Bot・自動レポート生成・管理ダッシュボードを統合したAI実行基盤を設計・実装した受託案件。要件整理から本番運用まで単独で担当し、現在も継続稼働中。",
    role: ["AI Engineer", "Fullstack"],
    stack: [
      "Python",
      "Discord.py",
      "Next.js",
      "TypeScript",
      "Supabase",
      "LLM API",
      "LINE API",
      "RAG",
      "Docker",
      "Render",
    ],
    status: "anonymized",
    detailPage: true,
    objectAsset: {
      fallbackImage: "/images/work/coaching-ai-implementation.png",
      alt: "コーチングAI導入のビジュアル表現",
    },
    detailImages: [
      {
        src: "/images/work/coaching-ai-implementation/bot-conversation.jpg",
        alt: "AIコーチとの会話インターフェース（テストユーザー使用）",
      },
      {
        src: "/images/work/coaching-ai-implementation/dashboard-1.jpg",
        alt: "コーチ向け管理ダッシュボード：生徒一覧と提出状況",
      },
      {
        src: "/images/work/coaching-ai-implementation/dashboard-2.jpg",
        alt: "コーチ向け管理ダッシュボード：レポート確認・承認画面",
      },
    ],
    context:
      "クライアントは50名の生徒を抱えるコーチングスクールを、実質1人で運営していた。面談後の週次レポート作成、保護者への月次送信、提出状況の確認——積み重なると週150分以上がルーティンに消え、支援を改善する余裕も複数コーチ化の余白も生まれない状態だった。過去に複数コーチ体制を試みたが、情報共有と管理が機能せず数か月で崩壊した経緯もある。課題は工数削減ではなく、記録・整理・送信・参照が分散した運営構造そのものにあった。",
    whatIBuilt:
      "日次の振り返りを週次レポートへ、週次レポートを月次レポートへと自動集約する階層型の実行基盤を構築した。全会話履歴を毎回処理する代わりに上位レポートへ段階的に圧縮する設計にしたことで、月次工程のトークン消費を89.8%削減できた。保護者向けレポートはAI生成後にコーチが確認・承認する多層フローとし、自動化しながらも誤送信リスクを複数層で制御している。管理ダッシュボードには過去の指導記録を意味検索で引き出せるRAGも統合し、コーチの面談前準備コストも削減した。要件整理からデプロイ・保守まで単独で一貫して担当。本番移行まで約1.5か月。",
    result:
      "コーチの手が業務整理から支援そのものへ戻り、新たに4名のコーチを採用可能になった。導入1か月で生徒数が30名増加、解約率が30%低下した。",
    metrics: [
      { before: "150分/週", after: "0分", label: "週次レポート作成" },
      { before: "5分/件", after: "30秒", label: "月次レポート送信" },
      { after: "89.8%削減", label: "月次トークン消費" },
      { after: "30%低下", label: "解約率（導入1か月）" },
    ],
  },
  {
    slug: "ai-output-review-studio",
    name: "AI Output Review Studio",
    summary: "TODO: AIアウトプットのレビューと品質管理ツール。",
    role: ["Product", "AI Engineer"],
    stack: ["Next.js", "TypeScript", "Claude API"],
    status: "public",
    detailPage: true,
    objectAsset: {
      alt: "AI Output Review Studioのビジュアル表現",
    },
  },
  {
    slug: "ai-development-research",
    name: "AI開発の個人研究",
    summary: "TODO: AIエージェントとシステム設計の個人研究。",
    role: ["Research", "AI Engineer"],
    stack: ["Python", "LangChain", "RAG", "Claude API"],
    status: "public",
    detailPage: true,
    objectAsset: {
      alt: "AI個人研究のビジュアル表現",
    },
  },
];
