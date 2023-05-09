// 必要なライブラリとコンポーネントをインポート
import { type NextPage } from "next";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ArrowLeftOnRectangleIcon} from "@heroicons/react/24/solid";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

// ホームページのコンポーネントを定義
const Home: NextPage = () => {
  // 現在のセッションデータを取得
  const { data: session } = useSession();

  // セッションが存在しない場合はログイン画面を表示
  if (!session){
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    )
  }

  // セッションが存在する場合はToDoリストアプリを表示
  return (
    <Layout title="Todo App">
      {/* ログアウトアイコンを表示。クリックするとログアウトする */}
      <ArrowLeftOnRectangleIcon
        className="h-6 w-6 cursor-pointer text-blue-600"
        onClick={() => signOut()} />
      {/* ログインユーザーの名前を表示 */}
      <p className="my-3 text-xl text-blue-600">
        {session?.user?.name}</p>
      {/* タスクフォームコンポーネントを表示 */}
      <TaskForm />
      {/* タスクリストコンポーネントを表示 */}
      <TaskList />
    </Layout>
  );
};

// ホームページのコンポーネントをエクスポート
export default Home;
