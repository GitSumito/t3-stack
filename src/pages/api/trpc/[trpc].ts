// tRPCのNext.jsアダプターを使ってAPIハンドラを作成しています。
// tRPCは、Next.jsのようなフレームワークにおけるエンドポイント間での型安全性を提供するライブラリです。
// tRPCのNext.jsアダプターからcreateNextApiHandler関数をインポート
import { createNextApiHandler } from "@trpc/server/adapters/next";

// 環境変数とtRPCのコンテキスト作成関数、ルーターをインポート
import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

// createNextApiHandler関数を用いてAPIハンドラをエクスポート
export default createNextApiHandler({
  // tRPCのアプリケーションルーターを指定
  router: appRouter,
  // tRPCのコンテキスト作成関数を指定
  createContext,
  // APIエラー発生時の挙動を設定。開発環境ではエラー情報をコンソールに出力
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
