# Portfolio Website

## 🚀 機能

- 📝 ブログ機能
- 👤 プロフィールページ
- 📊 ダッシュボード

## 📋 セットアップ要件
- Node.js: v24.9.0
- npm: v11.6.0
- Cloudflare Wrangler CLI: v4.42.0

## 🛠️ セットアップ手順

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. データベースを初期化:
   ```bash
   npx wrangler d1 execute lifelog --local --file=./schema.sql
   ```

3. 開発用データベースにシードデータを投入:
   ```bash
   npm run dev-db:seed
   ```
