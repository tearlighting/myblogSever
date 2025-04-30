# 🛠 MyBlogServer - Node.js + Express で構築したブログ用バックエンド

このリポジトリは、フロントエンドブログ [`MyBlog`](https://github.com/tearlighting/myblog) のために構築されたバックエンド API サーバーです。Node.js + Express を用い、Sequelize で MySQL と連携。ミドルウェア、JWT 認証、独自ルーティング、パラメータ検証など、フルスタック的な設計を取り入れています。

## ✨ 特徴

- **RESTful API 設計**：統一された URL 設計と責務分離。
- **JWT 認証の導入**：`cookie + session` 方式から `JWT + Token` 方式へ移行、現代的な認証方式。
- **カスタムミドルウェア**：
  - `corsMiddleware`：CORS 制御を自前で実装
  - `authMiddleware`：認証チェック
  - `errorMiddleware`：例外を統一してハンドリング
- **独自のルーティング構造**：クラスベースでルーティングを定義し、動的マッチング対応。
- **デコレータによるパラメータ検証**：サービス層でデコレータを用いて、バリデーションとビジネスロジックを分離（当時は Zod 未使用）。
- **ORM 操作**：Sequelize による DB アクセス、SQL を手書きせずに快適な開発体験を実現。
- **Markdown HTML の整形**：`<img>`などの非閉じタグをスタック構造で補完し、正しい HTML へ整形。

## 🧱 技術スタック

- Node.js + Express
- MySQL + Sequelize
- JWT, cookie-parser
- Markdown-it
- TypeScript（任意）

## 📦 セットアップ手順

```bash
git clone https://github.com/tearlighting/myblogSever.git
cd myblogSever
npm install
npm run
```

## 目录结构说明

```csharp
├── src
│   ├── config         # DBやアプリの設定
│   ├── hooks          # hooks
│   ├── routes         # ルーティング登録クラス
│   │    └── middleware  # 認証・CORS・エラーハンドリングなど
│   ├── service       # 業務ロジックとデコレータ検証
│   ├── dao            # ORMベースのDB操作
│   └── utils           # Markdown整形などのユーティリティ
```

## 📌 后续计划

- Zod による検証ロジックの置き換え
- React でバックエンド管理システム開発
