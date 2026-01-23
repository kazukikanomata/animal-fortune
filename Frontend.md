### 1. Node.js バージョン管理ツールのインストール

`nvm`を利用して Node.js を利用します。以下のリンクからインストール方法を確認し利用する
[nvm 公式ドキュメント](https://github.com/nvm-sh/nvm)

### 2. Node.js バージョン指定と切り替え

プロジェクトのルートにある`.nvmrc`ファイルで指定されたバージョンを使用

#### 1. 必要なバージョンをインストール

```bash
nvm install
```

#### 2. インストールしたバージョンを有効にする

```bash
nvm use
```

#### 3. パッケージのインストール

必要な依存関係をインストールします:

```bash
npm ci
```

## コマンド

#### 開発サーバーを起動（Next.js）

```bash
npm run dev
```

#### Lint を実行

```bash
npm run check
```

#### Lint の自動修正を実行

```bash
npm run fix
```

#### Test を実行

```bash
npm run test
```

#### Storybook を起動

```bash
npm run storybook
```

#### OpenApi 仕様書から marianne-api の型定義ファイルを生成

```bash
npm run regenerate-api-types
```
