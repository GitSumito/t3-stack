// 必要なモジュールをインポート
import { t } from "../trpc";
import { todoRouter } from "./todo"

// 全体のルータを作成。ここではtodoRouterを持つルータを定義しています。
export const appRouter = t.router({
    todo: todoRouter,
});

// 全体のルータの型定義をエクスポート
export type AppRouter = typeof appRouter;
