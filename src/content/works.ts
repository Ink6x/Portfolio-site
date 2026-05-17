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
    slug: "business-automation-agent",
    name: "業務効率化AIエージェント",
    summary: "TODO: 業務フローを自動化するAIエージェントの構築。",
    role: ["AI Engineer", "Backend"],
    stack: ["Python", "LangGraph", "FastAPI", "PostgreSQL"],
    status: "anonymized",
    detailPage: true,
    objectAsset: {
      fallbackImage: "/images/work/business-automation-agent/card.png",
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
      fallbackImage: "/images/work/coaching-ai-implementation/card.png",
      alt: "コーチングAI導入のビジュアル表現",
    },
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
    slug: "career-keikakun",
    name: "キャリアけいかくん",
    summary:
      "職務経歴と求人票を読み込んで、マッチスコア・12週間の準備計画・証拠素材ボードを返す日本語ファーストのキャリア準備デモアプリ。現在開発中のため、一部機能は未実装です。LLM・APIキーを活用した評価ロジックについては実装を進めており、今後順次追加予定です。",
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
      "受託案件では実コードを公開できないため、portfolio上での実装力の証明が弱くなる課題があった。history-soul-matcherのような直感的な体験と、受託案件で示したAI実行基盤の設計力——状態管理・スコアリング・週次レビュー・監査ログ——を、公開可能な合成データを使ってひとつの実動するデモとして接続する必要があった。",
    whatIBuilt:
      "分析・プラン・週次レビュー・証拠ボード・プロセス確認の5画面を実装した。技術的な核心はLLMとdeterministic logicの明確な分離にある。LLMは職務経歴の構造化抽出・求人票の要件抽出・90日計画の初期生成・週次レビューの要約のみを担い、マッチスコアの計算・状態遷移・入力検証・audit eventの記録はすべてコードで決定論的に処理する。\n\nZodによるprovider output契約検証とmock fallbackを組み合わせ、APIキーなしでもCI・デモの全導線が安定して動く設計にした。入力した職務経歴・求人票・週次レビューの本文はデフォルトで永続化せず、ハッシュ・要約・構造化結果のみを保存するプライバシーファーストなデータ設計も実装に含めた。",
    result:
      "GitHubにソースを公開済み。mock providerにより、APIキー不要で分析→計画生成→週次レビュー→証拠ボードのフルフローが体験できる。受託案件で語ってきた「AI実行基盤」「承認フロー」「監査ログ」「決定論的スコアリング」を、公開可能な形で再現した実装証拠として機能している。",
    metrics: [
      { after: "5画面", label: "分析・プラン・レビュー・証拠・プロセス確認" },
      { after: "12週間", label: "生成するキャリア準備計画の期間" },
      { after: "決定論的", label: "スコアリングと状態遷移の計算方式" },
      { after: "APIキー不要", label: "mock fallbackで全導線を体験可能" },
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
