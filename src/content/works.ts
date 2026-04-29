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
      "子どもの目標達成を支援する1on1コーチング事業向けに、Discord Bot と管理ダッシュボードを中心とした AI 実行基盤を設計・実装した受託案件。要件整理から本番運用まで単独で担当し、現在も継続稼働中。",
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
    context:
      "クライアントは、週1回の面談と日々の振り返り記録を組み合わせて子どもの目標達成を支援するコーチング事業を運営していた。生徒数は約50名。運営は実質1人のコーチに依存しており、面談後の週次レポート作成（週約150分）、保護者向け月次レポートの作成と送信（1人あたり約5分）、提出状況の確認、面談前の情報整理が個別に積み重なっていた。\n\nこの状態では、支援そのものを改善したり、複数コーチ体制へ移行したりする余裕が生まれない。過去に複数コーチ体制を試みたこともあったが、情報共有と運営管理が機能せず数か月で1人体制に戻った経緯もあった。課題は単純な工数削減ではなく、記録・整理・送信・参照が分散していた運営構造そのものにあった。",
    whatIBuilt:
      "日々の振り返りから週次レポート・月次レポートへと情報が流れる階層型の運用基盤を構築した。生徒は Discord のプライベートチャンネルで AI コーチと毎日対話し、その記録をもとに週次レポートが自動生成される。月次レポートはその週次レポート群から生成されるため、毎回すべての会話履歴を処理するよりも入力トークンを大幅に削減できる構成にした。\n\n保護者向けの月次レポートは自動生成後にコーチが確認・編集・承認する承認付き送信フローとし、誤送信を防ぐ制御を複数層で実装した。コーチ向けには管理ダッシュボードを別途開発し、生徒ごとの提出状況・点数推移・レポート履歴・送信状況を一元参照できる構成にした。過去の指導記録を意味検索で引き出せる検索基盤（RAG）も組み込み、類似ケースを面談準備に活用できる。\n\n要件整理・仕様策定・データ設計・Bot 実装・管理画面実装・既存データ移行・デプロイ・導入後保守まで一貫して担当した。方向性確定後の本開発は約1.5か月。",
    result:
      "面談後の週次レポート作成時間を週約150分から実質0分へ削減。保護者向け月次レポートは1人あたり約5分かかっていた作成・送信の工程が約30秒での確認・承認に変わった。月次レポートの生成方式を改善した結果、月次工程の入力トークンを約89.8%削減（システム全体では約28.2%削減）。\n\n管理基盤の整備により複数コーチで運営できる体制が整い、新たに4名のコーチを採用可能になった。導入1か月で生徒数が30名増加。導入前後の月次比較で解約率が30%低下した。コーチの手が業務整理から支援そのものに戻った結果が、体制拡張と事業成長に直接つながった。",
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
