# ReplyFrame

Claude Code の返答を、角の丸い色付きの枠で囲む mod（関数フックのプラグイン）です。
ターミナル・VS Code 拡張・デスクトップアプリ・モバイルのどれで開いても同じように効きます。

Anthropic とは関係のない、個人が作った非公式の mod です。

## 何が変わるか

- Claude の返答の本文（文章の部分）が、オレンジ色（`#d97757`）の角丸の枠に入ります
- ツールの実行行・自分の発言など、ほかの表示はそのままです
- 10,000 字を超える長い返答は、枠を付けずにいつもの表示のままにします（描画部品の上限のため）

## 動作環境

- Claude Code 2.1.287 で作成・確認
- 関数フック（プラグイン API）は早期アクセスの機能です。版によっては環境変数 `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1` が要ります。API は版の間で変わることがあり、新しい版で動かなくなる可能性があります

## 使い方

1. このリポジトリを好きな場所に clone します

   ```
   git clone https://github.com/takosasi-dev/reply-frame.git
   ```

2. 読み込ませ方は次のどちらかです
   - ターミナルの場合: `claude --plugin-dir <clone したフォルダ>` で起動する
   - VS Code 拡張・デスクトップアプリなど起動オプションを付けられない場合: `~/.claude/settings.json` の `env` に `CLAUDE_CODE_PLUGIN_DIRS` を足し、clone したフォルダの絶対パスを書く

   ```json
   {
     "env": {
       "CLAUDE_CODE_PLUGIN_DIRS": "D:/tools/reply-frame"
     }
   }
   ```

3. 新しいセッションを始めると読み込まれます

## 色を変える

[hooks/register.tsx](hooks/register.tsx) 先頭の `FRAME_COLOR` を書き換えます。`--plugin-dir` などで読み込んでいるセッションでは、保存するとその場で読み直されます。

## テスト

```
CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1 claude plugin test .
claude plugin validate .
```

テストでは、4 種類の画面（ターミナル・デスクトップ・VS Code・モバイル）すべてで返答が枠付きで描かれることと、長すぎる返答が標準の描画に戻ることを確かめています。

## 開発状況

- `claude plugin validate` とテスト 2 本は通っています
- 実際の画面での見た目はまだ確認していません（テストで確かめているのは描く内容までです）

## ライセンス

[MIT](LICENSE)
