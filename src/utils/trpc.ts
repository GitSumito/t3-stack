// 必要なモジュールをインポート
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

// AppRouter の型をインポート
import { type AppRouter } from "../server/trpc/router/_app";

// ベース URL を取得する関数
const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // ブラウザは相対 URL を使用
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR は Vercel URL を使用
  return `http://localhost:${process.env.PORT ?? 3000}`; // 開発環境の SSR は localhost を使用
};

// tRPC を設定し、クライアント用にエクスポート
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson, // SuperJSON でシリアライズとデシリアライズを行う
      queryClientConfig: {
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
        },
      },
      links: [
        // loggerLink を設定
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        // httpBatchLink を設定
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false, // SSR を無効化
});

// 入力型の推論ヘルパー
// 例: type HelloInput = RouterInputs['example']['hello']
export type RouterInputs = inferRouterInputs<AppRouter>;

// 出力型の推論ヘルパー
// 例: type HelloOutput = RouterOutputs['example']['hello']
export type RouterOutputs = inferRouterOutputs<AppRouter>;
