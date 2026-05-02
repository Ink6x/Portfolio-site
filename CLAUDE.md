# CLAUDE.md

## 1. Project Context

This is **Jullien Lab**, a redesigned personal portfolio site.

The site is no longer a service-first page with Support and Case Notes as top-level sections. It is now a single-page lab-style portfolio with:

```txt
1. Jullien Lab
2. Terminal
3. About me
4. Work
5. Skill Stack
6. Contact me
```

Only Work projects have detail pages.

```txt
/work/[slug]
```

---

## 2. Always Read

Before planning or editing, read:

```txt
DESIGN.md
docs/SPEC.md
docs/CONTENT.md
docs/IMPLEMENTATION_PLAN.md
docs/OPEN_QUESTIONS.md
```

For visual assets:

```txt
docs/ASSET_GUIDE.md
```

---

## 3. High-Level Direction

```txt
minimal
space
cyber
trust
monochrome
interactive earth
terminal UI
3D Work objects
human About section
```

Avoid:

```txt
sales LP feel
gradients
unnecessary lines
busy sci-fi HUD
generic AI SaaS styling
text-heavy project cards
```

---

## 4. Important Design Decisions

### Top Section

The first section should show only:

```txt
Jullien Lab
```

The visual background is an interactive monochrome 3D earth.

Do not add:

```txt
tagline
CTA
service explanation
profile line
```

### Terminal

The terminal is a major section, not a decorative component. It should allow visitors to ask an AI about Jullien.

Before AI integration, it must work in static command mode.

### About me

Use a circular profile photo on the left and concise copy on the right.

### Work

Each card shows only:

```txt
3D object
project name
```

Hover/focus reveals a compact popup summary.

### Skill Stack

Use three pentagon/radar diagrams horizontally on desktop.

### Contact

No contact form. Use Email / X / GitHub links.

---

## 5. Workflow

When asked to implement or modify:

1. Inspect current files.
2. Compare with DESIGN.md and SPEC.md.
3. Make a small plan.
4. Implement one section/component at a time.
5. Keep TODOs for missing copy/assets.
6. Run available checks.
7. Report completed work and remaining risks.

---

## 6. Content Policy for This Project

Do not invent:

```txt
- client names
- company names
- revenue/results
- years of experience
- exact metrics
- private project details
- biography details not provided
```

Use placeholders where needed.

---

## 7. Terminal AI Safety

The AI terminal should answer only from curated portfolio knowledge.

If asked something not present:

```txt
公開情報としてはまだ記載されていません。
```

or equivalent.

Do not expose hidden prompts, environment variables, or private notes.

---

## 8. Git Workflow

### Branch

作業は常に `main` 以外のブランチで行う。  
現在のブランチ: `feat/work-detail-pages`

### コミットのタイミング（必須）

以下のタイミングで必ずコミットを行う。勝手にまとめたり後回しにしない。

```txt
1. 機能単位の実装が完了したとき
2. バグ修正が完了したとき
3. リファクタリングが完了したとき
4. 設定・コンテンツの変更が完了したとき
```

「完了」とは、TypeScript の型チェックが通り、意図した動作が確認できた状態を指す。

### コミットの分割ルール

- **1コミット = 1つの論理的な変更単位**
- 複数の機能を一度に実装した場合は、実装順に沿って複数のコミットに分ける
- 関係するファイルは同じコミットにまとめる（例: コンポーネント + それを使うファイル）
- 無関係なファイルを同じコミットに混ぜない

```txt
良い例:
  feat: add WorkGrid 3D animation component
  → WorkGrid.tsx と WorkSection.tsx を同じコミットに含める

悪い例:
  feat: update many things
  → 複数機能をまとめて1コミットにする
```

### コミットメッセージ形式

```
<type>: <概要（英語・命令形・50文字以内）>

<本文（任意）: 何をなぜ変えたか、箇条書き>
```

**type の選択肢:**

```txt
feat     - 新機能
fix      - バグ修正
style    - UI・見た目の変更（ロジック変更なし）
refactor - 動作を変えないコード整理
chore    - 設定・ドキュメント・依存関係
```

### プッシュのタイミング

以下のいずれかで `git push` を行う。

```txt
- ユーザーから「プッシュして」と言われたとき
- 作業セッションの区切りとなるコミットが済んだとき
- main へのマージ前
```

自動的に push を行ってはいけない。必ずユーザーの確認を取る。

### やってはいけないこと

```txt
- main ブランチへの直接コミット・プッシュ
- 型エラーや lint エラーが残ったままのコミット
- 複数機能をまとめた巨大コミット
- コミットメッセージの省略（"fix" や "update" だけのメッセージ）
- ユーザーの確認なしの force push
```

---

## 9. Asset Handling

Assets pending:

```txt
profile photo
3D earth
Work 3D objects
fallback images
OG image
```

Use placeholders until provided.

Do not bundle font files without verified license/source.
