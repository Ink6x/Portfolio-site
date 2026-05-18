import type { Work } from "@/types/work";

export const WORKS: Work[] = [
  {
    slug: "history-soul-matcher",
    name: "History Soul Matcher",
    summary:
      "顔写真を送るだけで、あなたに最も「魂が近い」歴史上の人物がわかるWebアプリ。AIが顔の特徴を自動分析し、200名の歴史人物データベースから最も相性のよい1名を判定して、その理由・歴史エピソード・名言を生成する。",
    role: ["Product", "Fullstack", "AI Engineer"],
    stack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Claude API",
      "Tool Use",
      "Prompt Caching",
      "Tailwind CSS",
      "Zod",
      "Upstash Redis",
      "Vercel",
    ],
    status: "public",
    detailPage: true,
    heroImage: "/images/work/history-soul-matcher/banner.png",
    inlineImages: true,
    githubUrl: "https://github.com/Ink6x/history-soul-matcher",
    demoUrl: "https://history-soul-matcher.vercel.app/",
    objectAsset: {
      fallbackImage: "/images/work/history-soul-matcher/banner.png",
      alt: "History Soul Matcher のビジュアル表現",
    },
    detailImages: [
      {
        src: "/images/work/history-soul-matcher/upload.png",
        alt: "画像アップロード画面",
      },
      {
        src: "/images/work/history-soul-matcher/loading.png",
        alt: "解析中の画面",
      },
      {
        src: "/images/work/history-soul-matcher/result.png",
        alt: "診断結果画面",
      },
    ],
    context:
      "「顔から似た歴史上の人物を見つける」というSNSで話題化しやすい体験を入口に、Vision + Tool Use + 決定論的スコアリングの組み合わせが、LLMアプリで起きがちな『同じ人物に偏る』『リスト外の架空人物が出る』『判断根拠が再現性なくブレる』を構造的にどこまで抑え込めるかを検証するために立ち上げた個人プロジェクト。",
    whatIBuilt:
      "判定と物語生成を分離する3段パイプラインを設計・実装した。Stage 1はClaude APIのVision機能とTool Useを組み合わせ、顔特徴をfaceShape・jawline・eyeShape・eyeSpacing・noseShape・browShape・lipFullness・cheekbonesの8軸と印象タグに構造化抽出する。tool_choiceで特定ツールへの呼び出しを強制し、各軸を閉じたenumに制約することでスキーマ違反を表現不可能にした。また各軸に強度スコア（1〜10）を同時抽出し、マッチ表示の視覚的拡散に活用している。\n\nStage 2は抽出した特徴プロフィールと200名の人物データセットに対して重み付き距離計算を純関数で実装。LLMは介在せず、同一入力は常に同一人物を返す決定論的な設計で、人物選定に起因するハルシネーションを構造的に排除した。Stage 3では上位3特徴の根拠を明示したうえで、理由・歴史エピソード・名言のナラティブ生成のみをClaudeに委ねる。抽出はtemperature: 0（再現性最大化）、ナラティブはtemperature: 0.7（表現の豊かさ）と意図的に使い分けた。\n\n固定systemプロンプトはPrompt CachingでephemeralキャッシュしAPI費用を抑制。画像はFormDataでサーバー送信しメモリ上でのみ処理する（サーバー保存なし）。Upstash RedisのスライディングウィンドウでIPごとに10 req/hのレート制限を設定。結果ページは@vercel/ogで動的OGP対応とし、SNSシェア体験まで含めて設計した。要件定義・データセット構築・実装・運用設計すべてソロ。",
    result:
      "GitHubでソースを公開済み。Vercel上でのエンドツーエンド動作（画像アップロード→特徴抽出→スコアリング→ナラティブ生成→OGP付きシェア）まで動作確認済み。",
    metrics: [
      { after: "200", label: "登録歴史人物数（8カテゴリ）" },
      { after: "3段", label: "判定と物語生成を分離したパイプライン構成" },
      { after: "8軸", label: "Vision + Tool Useで構造化抽出する顔特徴" },
      { after: "0件", label: "サーバーに保存される画像データ" },
    ],
  },
  {
    slug: "career-keikakun",
    name: "キャリアけいかくん",
    summary:
      "職務経歴と求人票を読み込んで、マッチスコア・12週間の準備計画・証拠素材ボードを返す日本語ファーストのキャリア準備アプリ。現在開発中のため、一部機能は未実装です。LLM・APIを活用した評価ロジックについては実装を進めており、今後順次追加予定です。",
    role: ["Product", "Fullstack", "AI Engineer"],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "Prisma",
      "Vitest",
      "Playwright",
    ],
    status: "public",
    detailPage: true,
    heroImage: "/images/work/career-keikakun/banner.png",
    githubUrl: "https://github.com/Ink6x/career-keikakun",
    objectAsset: {
      fallbackImage: "/images/work/career-keikakun/banner.png",
      alt: "キャリアけいかくんのビジュアル表現",
    },
    context:
      "受託案件では実コードを公開できないため、ポートフォリオ上での実装力の証明が難しくなる。これまで業務で設計・構築してきたAIを組み込んだシステム——構造化出力・スコアリング・週次レビュー・監査ログ——を、公開可能な形で一から再構築するために立ち上げたプロジェクト。テーマは採用担当者にも直感的に伝わる「キャリア準備」に絞り、AI統合システムの設計力を実動するコードで示すことを目的としている。",
    whatIBuilt:
      "OpenAI / Anthropic の API を統合し、職務経歴や求人票を読み込んで構造化するパイプラインを設計・実装した。AIが返す出力は Zod を使ってスキーマ検証し、想定外のフォーマットが来た場合は自動で再試行・フォールバックする仕組みを組み込んでいる。これにより、AIの出力ブレに左右されない安定した動作を実現している。\n\nAIに任せる部分とコードで厳密に処理する部分を明確に分けた設計になっている。スキルマッチのスコア計算や状態遷移は決定論的なロジックで処理し、同じ入力には常に同じ結果が返る。AIは職務経歴の読み解きと計画文の生成に専念させ、評価の根拠をブラックボックスにしない設計にした。分析→計画→週次レビュー→証拠ボード→プロセス確認の5画面フルフローを実装済みで、現在LLMを活用した評価ロジックの精度向上を開発中。",
    result:
      "OpenAI・Anthropic の両 API に対応したプロバイダアダプタを設計し、利用するLLMをコードの変更なしに切り替えられる構成にした。分析パイプライン・スコアリング・週次レビュー・証拠ボードの主要実装は完了しており、現在はLLMを活用した評価ロジックの精度向上を継続開発中。GitHubにソースを公開済み。",
    metrics: [
      {
        after: "OpenAI / Anthropic",
        label: "実APIを統合したデュアルプロバイダ対応設計",
      },
      {
        after: "LLM × 決定論的分離",
        label: "AI生成とスコア計算の役割を明確に設計",
      },
      {
        after: "Zod スキーマ検証",
        label: "AI出力の形式を検証し、崩れたら自動修正",
      },
      {
        after: "5段パイプライン",
        label: "分析→計画→レビュー→証拠→監査の一気通貫フロー",
      },
    ],
  },
  {
    slug: "coaching-ai-implementation",
    name: "じぶんビジョン AI実行基盤（アイアンド株式会社）",
    summary:
      "アイアンド株式会社が運営する子ども向け1on1コーチングサービス「じぶんビジョン」のAI実行基盤と管理ダッシュボードを設計・実装。週150分のレポート業務をゼロにし、1コーチ依存の運営を複数コーチ体制へ拡張可能にした。Human+として要件整理から本番運用までを単独担当し、2026年3月から同社のCTOとして継続運用を担当している。",
    role: ["CTO", "AI Engineer", "Fullstack"],
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
    status: "public",
    detailPage: true,
    githubUrl: "https://github.com/Ink6x/coaching-ai-workflow",
    demoUrl: "https://jibun-vision.com",
    objectAsset: {
      fallbackImage: "/images/work/coaching-ai-implementation/card.png",
      alt: "じぶんビジョン AI実行基盤のビジュアル表現",
    },
    context:
      "アイアンド株式会社が運営する「じぶんビジョン」は、約50名の生徒を抱える子ども向け1on1コーチングサービスで、実質1人のコーチが運営していた。面談後の週次レポート作成、保護者への月次送信、提出状況の確認——積み重なると週150分以上がルーティンに消え、支援を改善する余裕も複数コーチ化の余白も生まれない状態だった。過去に複数コーチ体制を試みたが、情報共有と管理が機能せず数か月で崩壊した経緯もある。課題は工数削減ではなく、記録・整理・送信・参照が分散した運営構造そのものにあった。",
    whatIBuilt:
      "日次の振り返りを週次レポートへ、週次レポートを月次レポートへと自動集約する階層型の実行基盤を構築した。全会話履歴を毎回処理する代わりに上位レポートへ段階的に圧縮する設計にしたことで、月次工程のトークン消費を89.8%削減できた。保護者向けレポートはAI生成後にコーチが確認・承認する多層フローとし、自動化しながらも誤送信リスクを複数層で制御している。管理ダッシュボードには過去の指導記録を意味検索で引き出せるRAGも統合し、コーチの面談前準備コストも削減した。Human+として要件整理からデプロイ・保守まで単独で一貫して担当し、本番移行まで約1.5か月。2026年3月から同社のCTOとして技術運用全般を継続担当している。",
    result:
      "コーチの手が業務整理から支援そのものへ戻り、新たに4名のコーチを採用可能になった。導入1か月で生徒数が30名増加、解約率が30%低下した。本件をきっかけに、2026年3月からアイアンド株式会社のCTOに就任。",
    metrics: [
      { before: "150分/週", after: "0分", label: "週次レポート作成" },
      { before: "5分/件", after: "30秒", label: "月次レポート送信" },
      { after: "89.8%削減", label: "月次トークン消費" },
      { after: "30%低下", label: "解約率（導入1か月）" },
    ],
  },
  {
    slug: "business-automation-agent",
    name: "業務効率化AIエージェント",
    summary:
      "対外オペレーション業務を、Slackから自然言語で制御できる実行基盤に再設計した匿名化受託案件。AIが実行計画を生成するが、外部副作用はPolicy Gateの機械的検証と人間の承認を通過するまで実行されない設計。担当者1人あたり月15〜20時間の工数削減を実現した。",
    role: ["AI Engineer", "Backend", "System Design"],
    stack: [
      "Python",
      "Slack API",
      "Action DSL",
      "Policy Gate",
      "Command Registry",
      "Playwright",
      "Docker",
      "AWS",
      "Notion API",
      "Audit Logging",
    ],
    status: "anonymized",
    detailPage: true,
    objectAsset: {
      fallbackImage: "/images/work/business-automation-agent/card.png",
      alt: "業務効率化AIエージェントのビジュアル表現",
    },
    context:
      "対外オペレーション業務の担当者は、プラットフォームごとに CLI を操作し、対応状況を Slack・CLI・Notion に分散して管理していた。条件変更のたびに手作業が発生し、確認コストと抜け漏れリスクが積み上がる構造だった。チーム全体で月60時間規模の工数がルーティンに消えており、オペレーション品質の改善に使える余力もなかった。",
    whatIBuilt:
      "設計の核心は「AIを実行主体にしない」という判断だった。Openclaw（AI）が実行計画を生成するが、Policy Gateが権限・テナント確認・Command Registry照合・引数スキーマ検証・影響範囲判定・dry-run完了・承認確認・冪等キー重複の8項目を機械的に検証するまで、いかなる外部副作用も発生しない。agent-with-toolsは採用せず、型付きAction DSLのCommand Registryに登録された操作のみを受け付ける構成にした。\n\nControl Plane（受付・状態管理・承認）、Job Queue（非同期実行・冪等性制御・レート制限）、Sandbox Worker（コンテナ隔離環境）、State Store（実行状態の正）、Outbox/Reconciliation（Notion反映と状態照合の二重保全）、Audit/Observability（構造化ログ・append-only監査証跡）の各レイヤーを実装した。冪等キーはhash(action_id + target_set + selector + business_period)で構成し、Slackのネットワーク再送による二重実行を設計で防止した。Notionの eventual consistency とAPI rate limitに依存しない設計とするため、State Storeを正として扱いNotionを投影先に位置づけた。",
    result:
      "担当者1人あたり月15〜20時間の工数削減。コマンド更新時間を約4分の1に圧縮。状況確認を10分から1分台に短縮。GitHubに設計ドキュメント（アーキテクチャ・セキュリティ設計・オペレーション）を公開済み。",
    metrics: [
      { after: "月15〜20時間削減", label: "担当者1人あたりの工数削減" },
      { before: "10分", after: "1分台", label: "状況確認にかかる時間" },
      { after: "約1/4", label: "コマンド更新時間の圧縮率" },
      { after: "8項目", label: "Policy Gateの検証チェック数" },
    ],
  },
  {
    slug: "ai-development-research",
    name: "脳波解析・機械学習研究",
    summary: "Coming Soon",
    role: ["Research", "AI Engineer"],
    stack: [
      "Python",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "PyTorch",
      "MNE-Python",
      "SciPy",
      "Matplotlib",
    ],
    status: "public",
    detailPage: true,
    comingSoon: true,
    objectAsset: {
      alt: "脳波解析・機械学習研究のビジュアル表現",
    },
  },
];
