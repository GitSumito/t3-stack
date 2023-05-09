// NextAuth.js を使用して認証を設定するためのものです。
// NextAuth.js は Node.js のためのセッションベースの認証システムで、
// Next.jsと組み合わせて使用することを想定しています。

// NextAuth と GitHubProvider をインポート
import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// Prisma との連携を可能にする NextAuth のアダプターをインポート
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// 環境変数と Prisma クライアントをインポート
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

// 認証の設定オプションを定義
export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    // セッションのコールバックで、user の id を session に含める設定
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // 認証プロバイダーとして Prisma を設定
  adapter: PrismaAdapter(prisma),
  providers: [
    // GitHub を認証プロバイダーとして追加
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // 必要に応じて他のプロバイダーを追加
  ],
};

// NextAuth のデフォルトエクスポートを設定
export default NextAuth(authOptions);
