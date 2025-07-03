# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

SmartHR TUI クライアント。ターミナル上で動作するSmartHRのCLIクライアントアプリケーション。

## 共通コマンド

```bash
# 開発
pnpm dev          # tsx で開発環境を起動

# 依存関係
pnpm install      # 全依存関係をインストール

# 未使用コード検出
pnpm knip         # デッドコード検出
```

## 技術スタック

| カテゴリ               | ツール/ライブラリ  | 用途・備考                           |
| ---------------------- | ------------------ | ------------------------------------ |
| ランタイム             | Node.js            | TypeScript 実行環境                  |
| UIフレームワーク       | Ink                | React ベースの TUI フレームワーク    |
| UIコンポーネント       | @inkjs/ui          | Ink 用 UI コンポーネント             |
| フォーム               | ink-form           | TUI 用フォームコンポーネント         |
| 状態管理               | Jotai              | アトミックな状態管理                 |
| データフェッチング     | SWR                | データ取得とキャッシュ管理           |
| バリデーション         | Valibot            | 軽量なスキーマバリデーション         |
| 開発ツール             | tsx                | TypeScript の直接実行                |
| 未使用コード検出       | Knip               | デッドコード削除                     |
| パッケージマネージャー | pnpm               | 高速・効率的な依存関係管理           |

## 設計方針

### ファイル構造
- **ファイル名**: kebab-case（例: account-select.tsx）
- **コロケーション**: 関連ファイルは同じディレクトリに配置

### ディレクトリ構造
```
apps/tui/
├── src/
│   ├── display/          # 表示系コンポーネント
│   ├── types/            # 型定義
│   ├── *.tsx            # 各種コンポーネント
│   ├── use-*.ts         # カスタムフック
│   ├── smart-hr-*.ts    # SmartHR APIクライアント
│   └── main.tsx         # エントリーポイント
├── package.json
└── tsconfig.json
```

### コンポーネント設計
- Ink（React for CLI）を使用したコンポーネントベースの実装
- Jotaiによるアトミックな状態管理
- SWRによる効率的なデータフェッチング

## 機能詳細

### 現在実装済み
- 複数アカウント管理
- アカウント追加・選択
- API選択（GraphQL/REST）
- 従業員（crew）一覧表示

### 実装予定
- 従業員検索・詳細表示
- ユーザー検索・一覧・詳細表示
- 部署検索・一覧・詳細表示

### 6. データ連携

- 売上データマートとの連携
- VMD 変更と売上相関の可視化

## 開発フローと品質管理

### 開発順序

2. **コンポーネントテストの作成** - クライアントコンポーネントのみ
3. **Medium テスト** - Server Actions、Route Handlers（e2e でカバーできない部分）
4. **Small テスト** - util 関数、hooks（高カバレッジ目標）
5. **実装コーディング**
6. **フォーマット実行**（Prettier）
7. **Lint チェック**（ESLint）

### 完了条件（必須）

- `pnpm lint` が成功する
- 型チェックが成功する
- すべてのテストが成功する
- CLS が発生しないことを確認

## テスト戦略詳細

内部実装ではなく振る舞いをテストする

### E2E（Playwright）

- 主要なユーザーフロー
- クリティカルパスのみ
- 例: VMD 登録 → 一覧表示 → 詳細確認

### Component（Testing Library）

- クライアントコンポーネントの振る舞い
- ユーザーインタラクション
- e2e でカバーされない細かい動作

### Integration/Medium（Vitest）

- Server Actions
- Route Handlers
- 外部 API 連携

### Unit/Small（Vitest）

- ユーティリティ関数
- カスタムフック
- ビジネスロジック
