# Specification

This document describes the initial project scope for Progress Todo.

- Frontend-only application
- React + TypeScript + Vite
- PWA support
- LocalStorage persistence
- No AI features

# Progress Todo 仕様書

## コンセプト

進捗が一目で分かる、シンプルなTodoアプリです。

通常のTodoアプリではなく、プロジェクトごとにTodoを管理し、完了状況を円グラフで確認できる構成とします。

## 優先する価値

- 無料
- シンプル
- 直感的
- 一目で進捗が分かる
- オーバースペックにしない

## 使用技術

- React
- TypeScript
- Vite
- PWA
- LocalStorage

## Ver.1 で実装する機能

### プロジェクト

- プロジェクトを追加できる
- プロジェクト名を編集できる
- プロジェクトを削除できる
- プロジェクトをタブで切り替えできる
- タブは横スクロール可能にする

### Todo

- Todoを追加できる
- Todo名を編集できる
- Todoを削除できる
- Todoにチェックを付けられる
- チェックを外せる
- Ver.1では並び替えを実装しない
- 表示は追加順で管理する

### 進捗表示

- Todoの完了数から進捗率を自動計算する
- 例：5個中2個完了なら40%
- 円グラフで大きく表示する
- 円グラフ中央にパーセントを表示する
- 未完了部分は薄いグレー
- 完了部分はTodoカラーを反映する

### Todoカラー

- Todo作成時に自動で色を割り当てる
- 色はあらかじめ定義したカラーパレットから順番に割り当てる
- Todoごとに固定カラーとする
- 並び替えや完了チェックをしても色は変えない
- Ver.1ではユーザーによる色変更は実装しない

### 保存

- LocalStorageに保存する
- ログイン不要
- サーバー不要
- ブラウザを閉じてもデータが残る

### PWA

- PWA対応とし、インストール可能な構成にする
- スマホ・PCの両方で利用できるようにする

## Ver.1 では実装しない機能

### Todo並び替え

- Ver.1では実装しない
- 将来的な機能として docs/ideas.md に残す

### 完了音

- Ver.1では実装しない
- 将来的な機能として docs/ideas.md に残す

### 広告

- Ver.1では広告表示も広告エリアも実装しない
- ただし将来追加しやすいように、画面下部に差し込める余地をコンポーネント設計で残す

## 設計方針

- UI層、状態管理層、保存層を分ける
- LocalStorage処理は services に分離する
- 型定義は types に分離する
- 将来クラウド同期へ移行しやすい構造にする
- 保存処理は抽象化し、将来 LocalStorage 以外の保存先へ置き換えやすい構成にする

## 画面構成

### ホーム画面

- 上部：プロジェクトタブ
- 中央：進捗円グラフ
- 下部：Todoリスト
- Todo追加ボタン

## Ver.1 の完成条件

- プロジェクト追加・編集・削除
- プロジェクトタブ切り替え
- Todo追加・編集・削除
- TodoチェックON/OFF
- 進捗率自動計算
- 円グラフ表示
- LocalStorage保存
- スマホ・PC対応
- PWA対応

## データ構造

```ts
type Project = {
  id: string
  name: string
  order: number
  createdAt: string
  todos: Todo[]
}

type Todo = {
  id: string
  title: string
  completed: boolean
  color: string
  order: number
}
```

