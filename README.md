# CustomCard Simulator Sample

カスタムクレカのシミュレーションUIを確認するための簡易版Reactアプリケーションです。

## 開発メモ

### ビルド方法

```bash
npm run build
```

### ローカルサーバーで確認（オプション）

開発中にローカルサーバーを起動し、変更を即時反映させるには以下を使用：

```bash
npm run dev -- --host
```

```bash
npm install -g serve
serve dist
```

## GitHub Pages での公開

このアプリは GitHub Pages にて以下の URL で公開されています：

https://t2-takashima.github.io/customcard-simulator-sample/

デプロイ方法：

```bash
npm run deploy
```

## シミュレーターの追加方法とアクセス

シミュレーターの種類を増やす場合は、`src/config/brands.ts` に設定を追加してください。

追加した設定のキー名（例：`necorepublic`, `kidogs`）を使って、以下のようなURLでシミュレーターにアクセスできます：

```
https://t2-takashima.github.io/customcard-simulator-sample/キー名
```

例：
- https://t2-takashima.github.io/customcard-simulator-sample/necorepublic
- https://t2-takashima.github.io/customcard-simulator-sample/kidogs
