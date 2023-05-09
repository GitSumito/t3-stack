import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";
import superjson from "superjson";
import { ZodError } from "zod";


// tRPCの初期化とコンテキストの設定
export const t = initTRPC.context<Context>().create({
  // superjsonを使用してデータのシリアライズとデシリアライズを行います。
  // 日付や正規表現などのJavaScriptの特殊な型を扱うことができます。
  transformer: superjson,
  // エラーが発生した際のフォーマッター
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      // Zodのバリデーションエラーの詳細情報を追加
      data:{
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' &&
          error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

// tRPCのルーターをエクスポート
export const router = t.router;

// 認証が必要なプロシージャのためのミドルウェアを作成
export const authedProcedure = t.procedure.use(({ ctx, next }) => {
  // セッションがないか、ユーザー情報がない場合は認証エラーを投げる
  if (!ctx.session || !ctx.session.user){
    throw new TRPCError({ code: "UNAUTHORIZED"});
  }
  // セッションとユーザー情報を含む新しいコンテキストを作成して次のミドルウェアに渡す
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    }
  })
});