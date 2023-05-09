// 必要なライブラリとコンポーネントをインポート
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";

// _appコンポーネントを定義
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // セッション情報を提供するSessionProviderコンポーネントで全体をラップ
    <SessionProvider session={session}>
      {/* ページに対応するコンポーネントをレンダリング */}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

// TRPCのwithTRPC関数を用いてAppコンポーネントをラップしてエクスポート
export default trpc.withTRPC(MyApp);


// Next.js のカスタム _app.tsx ファイルを定義しています。
// _app.tsx は全ページで共有するレイアウトや状態を持つ場合、または全ページで CSS ファイルをインポートする場合などに使用します。
// このコードでは、SessionProvider コンポーネントを用いて、全ページでセッション情報を利用可能にしています。
// また、TRPC を用いてアプリケーションのデータフェッチを行うため、
// trpc.withTRPC 関数で _app.tsx をラップしてエクスポートしています。