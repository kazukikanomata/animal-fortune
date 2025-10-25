やること

- ダークモード搭載

- アプリのトップ画面で良さげなものをチョイスする
  参考：https://qiita.com/sakes9/items/d8a94271f994ab3c26d1

- 遷移する時のボタンを progate のボタンにデザイン変更
  - done

## リファクタリング要件

1. メインページ（page.tsx）が肥大化
   174 行の巨大なコンポーネント
   複数の責務が混在（状態管理、API 呼び出し、UI 表示）
   ビジネスロジックと UI が密結合

2. 重複したロジック
   page.tsx と useQuizLogic.ts で似たような処理
   状態管理が分散している

3. 型定義の不統一
   同じような型が複数箇所で定義されている
   🚀 リファクタリング提案（優先順位順）

Phase 1: メインページの分離（最優先）
問題: page.tsx が 174 行で巨大すぎる
解決策: 以下のように分離

Phase 2: カスタムフックの統合
問題: useQuizLogic.ts が未使用で、page.tsx にロジックが散らばっている
解決策:
useQuizLogic.ts を活用してロジックを集約
状態管理を一元化

Phase 3: 型定義の統一
問題: 同じような型が複数箇所で定義
解決策:

Phase 4: コンポーネントの細分化
問題: 大きなコンポーネントが責務を持ちすぎている
解決策: 単一責務の原則に従って細分化

🎯 具体的な修正順序
1 番目: page.tsx の分離（最も影響が大きい）
2 番目: useQuizLogic.ts の活用
3 番目: 型定義の統一
4 番目: コンポーネントの細分化

## 作業ログ

完了）状態管理、状態管理更新ロジック、および関連するビジネスロジックをコンポーネントの外に移動するためにカスタムロジックを調べる。
https://zenn.dev/luvmini511/articles/df410f137d1e21

課題 1: UI ロジックの複雑さ

- 現在、Home コンポーネントには以下の大きな UI 塊が直接書かれています。
  ニックネームモーダル (if (showNicknameModal))
  結果表示画面 (if (result?.success))
  メインのアンケート画面 (return <MainScreen... />)

- 特に、モーダルや結果画面のマークアップ（HTML 要素と Tailwind CSS クラス）が page.tsx の中心にあり、UI の変更があるたびにこのファイルを修正する必要があります。

課題 2: MainScreen へのプロップス渡し

- Home コンポーネントの最後に、MainScreen に大量のプロップス（nickname, answers, handleAnswerChange, handleSubmit, isLoading, result）を渡しています。これは、**「Props Drilling (プロップス・ドリリング)」**の兆候であり、将来的に MainScreen 以下の階層にロジックが広がったときに保守性を低下させます。
